from __future__ import annotations

import argparse
import io
import json
import os
from pathlib import Path

import cv2
import numpy as np
from PIL import Image
from rembg import new_session, remove


ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "public" / "libronic-catalog" / "catalog.json"
OUTPUT_DIRECTORY = ROOT / "public" / "libronic-catalog" / "cutouts"
CURRENT_SOURCE_DIRECTORY = ROOT / "public" / "libronic-products"
CURRENT_OUTPUT_DIRECTORY = CURRENT_SOURCE_DIRECTORY / "cutouts-transparent"
CURRENT_MANIFEST_PATH = CURRENT_SOURCE_DIRECTORY / "cutouts.json"
MODEL_DIRECTORY = ROOT / ".tools" / "rembg-models"


def repair_mojibake(value: str) -> str:
    try:
        repaired = value.encode("latin-1").decode("utf-8")
    except (UnicodeEncodeError, UnicodeDecodeError):
        return value
    return repaired if repaired else value


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Create transparent Libronic product cutouts.")
    parser.add_argument("--limit", type=int, default=None, help="Process only the first N images.")
    parser.add_argument("--ids", help="Comma-separated product IDs to process.")
    parser.add_argument("--model", default="isnet-general-use", help="rembg model name.")
    parser.add_argument("--force-model", action="store_true", help="Skip the studio-background method.")
    parser.add_argument("--current", action="store_true", help="Process the existing project product images.")
    return parser.parse_args()


def alpha_metrics(image: Image.Image) -> dict[str, float | int]:
    alpha = image.getchannel("A")
    histogram = alpha.histogram()
    total = image.width * image.height
    transparent = histogram[0]
    opaque = histogram[255]
    partial = total - transparent - opaque
    bbox = alpha.getbbox()
    coverage = 0.0 if bbox is None else (sum(histogram[1:]) / total)
    return {
        "width": image.width,
        "height": image.height,
        "transparentPixels": transparent,
        "partialPixels": partial,
        "opaquePixels": opaque,
        "coverage": round(coverage, 4),
    }


def is_studio_background(source: Image.Image) -> bool:
    rgb = np.asarray(source.convert("RGB"))
    border_width = max(4, min(rgb.shape[:2]) // 100)
    border = np.concatenate(
        (
            rgb[:border_width].reshape(-1, 3),
            rgb[-border_width:].reshape(-1, 3),
            rgb[:, :border_width].reshape(-1, 3),
            rgb[:, -border_width:].reshape(-1, 3),
        ),
        axis=0,
    )
    neutral = border.max(axis=1) - border.min(axis=1) < 35
    bright = border.min(axis=1) > 210
    return float(np.mean(neutral & bright)) >= 0.55


def remove_studio_background(source: Image.Image) -> Image.Image:
    rgb = np.asarray(source.convert("RGB"))
    height, width = rgb.shape[:2]
    channel_min = rgb.min(axis=2)
    channel_max = rgb.max(axis=2)
    neutral = channel_max - channel_min < 42
    light_background = ((channel_min > 205) & neutral).astype(np.uint8)

    count, labels, stats, _ = cv2.connectedComponentsWithStats(light_background, 8)
    background = np.zeros((height, width), dtype=np.uint8)
    total = height * width
    for label in range(1, count):
        x, y, component_width, component_height, area = stats[label]
        touches_edge = x == 0 or y == 0 or x + component_width >= width or y + component_height >= height
        if touches_edge or area >= total * 0.2:
            background[labels == label] = 1

    foreground = (1 - background).astype(np.uint8)
    crop_margin = max(3, int(min(height, width) * 0.03))
    foreground[:crop_margin] = 0
    foreground[-crop_margin:] = 0
    foreground[:, :crop_margin] = 0
    foreground[:, -crop_margin:] = 0
    count, labels, stats, _ = cv2.connectedComponentsWithStats(foreground, 8)
    kept = np.zeros((height, width), dtype=np.uint8)
    minimum_area = max(24, int(total * 0.00018))

    for label in range(1, count):
        x, y, component_width, component_height, area = stats[label]
        if area < minimum_area:
            continue
        right = x + component_width
        bottom = y + component_height
        corner_badge = bottom < height * 0.25 and (right < width * 0.42 or x > width * 0.58)
        bottom_shadow = y > height * 0.72 and component_width > width * 0.5 and component_height < height * 0.18
        if corner_badge or bottom_shadow:
            continue
        kept[labels == label] = 255

    kernel = np.ones((3, 3), np.uint8)
    kept = cv2.morphologyEx(kept, cv2.MORPH_CLOSE, kernel)
    alpha = cv2.GaussianBlur(kept, (0, 0), 0.7)
    alpha[alpha < 10] = 0
    rgba = np.dstack((rgb, alpha)).astype(np.uint8)
    return Image.fromarray(rgba, mode="RGBA")


def clean_model_cutout(cutout: Image.Image) -> Image.Image:
    rgba = np.asarray(cutout.convert("RGBA")).copy()
    alpha = rgba[:, :, 3]
    height, width = alpha.shape
    binary = (alpha >= 20).astype(np.uint8)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(binary, 8)
    candidates: list[tuple[int, int]] = []

    for label in range(1, count):
        x, y, component_width, component_height, area = stats[label]
        right = x + component_width
        bottom = y + component_height
        corner_badge = bottom < height * 0.25 and (right < width * 0.42 or x > width * 0.58)
        bottom_banner = y > height * 0.68 and component_width > width * 0.42 and component_height < height * 0.28
        if area >= height * width * 0.0002 and not corner_badge and not bottom_banner:
            candidates.append((label, int(area)))

    if not candidates:
        return cutout

    main_label, main_area = max(candidates, key=lambda item: item[1])
    main_x, main_y, main_width, main_height, _ = stats[main_label]
    padding_x = int(width * 0.12)
    padding_y = int(height * 0.12)
    expanded = (
        max(0, main_x - padding_x),
        max(0, main_y - padding_y),
        min(width, main_x + main_width + padding_x),
        min(height, main_y + main_height + padding_y),
    )

    keep_labels = {main_label}
    for label, area in candidates:
        if label == main_label or area < main_area * 0.012:
            continue
        x, y, component_width, component_height, _ = stats[label]
        right = x + component_width
        bottom = y + component_height
        intersects = right >= expanded[0] and x <= expanded[2] and bottom >= expanded[1] and y <= expanded[3]
        if intersects:
            keep_labels.add(label)

    keep = np.isin(labels, list(keep_labels))
    rgba[:, :, 3] = np.where(keep, alpha, 0).astype(np.uint8)
    return Image.fromarray(rgba, mode="RGBA")


def main() -> None:
    args = parse_args()
    MODEL_DIRECTORY.mkdir(parents=True, exist_ok=True)
    output_directory = CURRENT_OUTPUT_DIRECTORY if args.current else OUTPUT_DIRECTORY
    output_directory.mkdir(parents=True, exist_ok=True)
    os.environ["U2NET_HOME"] = str(MODEL_DIRECTORY)

    if args.current:
        supported = {".jpg", ".jpeg", ".png", ".webp"}
        products = [
            {
                "id": path.stem,
                "name": path.stem.replace("-", " "),
                "original": f"/libronic-products/{path.name}",
            }
            for path in sorted(CURRENT_SOURCE_DIRECTORY.iterdir())
            if path.is_file() and path.suffix.lower() in supported
        ]
        catalog = {"source": "existing-project-images", "products": products}
    else:
        catalog = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
        for product in catalog["products"]:
            product["name"] = repair_mojibake(product.get("name", ""))
    products = [product for product in catalog["products"] if product.get("original")]
    if args.ids:
        if args.current:
            requested_ids = {value.strip() for value in args.ids.split(",") if value.strip()}
            products = [product for product in products if str(product["id"]) in requested_ids]
        else:
            requested_ids = {int(value.strip()) for value in args.ids.split(",") if value.strip()}
            products = [product for product in products if int(product["id"]) in requested_ids]
    if args.limit is not None:
        products = products[: args.limit]

    session = None
    results: list[dict[str, object]] = []

    for index, product in enumerate(products, start=1):
        input_path = ROOT / "public" / product["original"].lstrip("/")
        if args.current:
            output_name = f"{product['id']}.png"
        else:
            output_name = f"{product['id']:03d}-{input_path.stem.split('-', 1)[-1]}.png"
        output_path = output_directory / output_name

        with Image.open(input_path) as source:
            source = source.convert("RGBA")
            if is_studio_background(source) and not args.force_model:
                cutout = remove_studio_background(source)
                method = "studio-white"
            else:
                if session is None:
                    session = new_session(args.model)
                output_bytes = remove(
                    source,
                    session=session,
                    alpha_matting=False,
                    post_process_mask=False,
                )
                if isinstance(output_bytes, Image.Image):
                    cutout = output_bytes.convert("RGBA")
                else:
                    cutout = Image.open(io.BytesIO(output_bytes)).convert("RGBA")
                cutout = clean_model_cutout(cutout)
                method = f"{args.model}-clean"
            cutout.save(output_path, format="PNG", optimize=True)

        metrics = alpha_metrics(cutout)
        product["cutout"] = (
            f"/libronic-products/cutouts-transparent/{output_name}"
            if args.current
            else f"/libronic-catalog/cutouts/{output_name}"
        )
        product["cutoutMethod"] = method
        product["cutoutMetrics"] = metrics
        results.append({"id": product["id"], "name": product["name"], "method": method, **metrics})
        print(f"Processed {index}/{len(products)}: product {product['id']} ({method})")

    catalog["products"] = catalog["products"]
    catalog["cutoutModel"] = args.model
    catalog["cutoutResults"] = results
    manifest_path = CURRENT_MANIFEST_PATH if args.current else MANIFEST_PATH
    manifest_path.write_text(
        json.dumps(catalog, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
