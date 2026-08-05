from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    parser = argparse.ArgumentParser(description="Build a gray-background QA sheet for product cutouts.")
    parser.add_argument("--ids", required=True, help="Comma-separated product IDs.")
    parser.add_argument("--output", default="tmp/cutout-contact-sheet.jpg")
    parser.add_argument("--current", action="store_true")
    args = parser.parse_args()

    ids = [value.strip() for value in args.ids.split(",") if value.strip()]
    cutout_directory = (
        ROOT / "public" / "libronic-products" / "cutouts-transparent"
        if args.current
        else ROOT / "public" / "libronic-catalog" / "cutouts"
    )
    tiles: list[Image.Image] = []

    for product_id in ids:
        pattern = f"{product_id}.png" if args.current else f"{int(product_id):03d}-*.png"
        matches = list(cutout_directory.glob(pattern))
        if not matches:
            continue
        cutout = Image.open(matches[0]).convert("RGBA")
        cutout.thumbnail((360, 360), Image.Resampling.LANCZOS)
        tile = Image.new("RGBA", (400, 400), (210, 210, 210, 255))
        tile.alpha_composite(cutout, ((400 - cutout.width) // 2, (400 - cutout.height) // 2))
        ImageDraw.Draw(tile).text((12, 10), str(product_id), fill=(20, 20, 20, 255))
        tiles.append(tile.convert("RGB"))

    columns = 2
    rows = (len(tiles) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * 400, rows * 400), (235, 235, 235))
    for index, tile in enumerate(tiles):
        sheet.paste(tile, ((index % columns) * 400, (index // columns) * 400))

    output_path = ROOT / args.output
    output_path.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output_path, quality=92)
    print(output_path)


if __name__ == "__main__":
    main()
