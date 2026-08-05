import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceManifest = path.join(root, "tmp", "libronic-source", "catalog-products.json");
const outputDirectory = path.join(root, "public", "libronic-catalog", "originals");
const outputManifest = path.join(root, "public", "libronic-catalog", "catalog.json");
const concurrency = 8;

await mkdir(outputDirectory, { recursive: true });
const products = JSON.parse(await readFile(sourceManifest, "utf8"));
let cursor = 0;
let completed = 0;
const failures = [];

async function downloadProduct(product) {
  const imageUrl = new URL(product.image);
  const extension = path.extname(imageUrl.pathname) || ".jpg";
  const filename = `${String(product.id).padStart(3, "0")}-${path.basename(imageUrl.pathname, extension)}${extension}`;
  const destination = path.join(outputDirectory, filename);

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(imageUrl, {
      headers: {
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        Referer: product.detailUrl,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/136 Safari/537.36",
      },
    });
    const contentType = response.headers.get("content-type") || "";
    if (response.ok && contentType.startsWith("image/")) {
      await writeFile(destination, Buffer.from(await response.arrayBuffer()));
      return {
        ...product,
        original: `/libronic-catalog/originals/${filename}`,
        filename,
      };
    }
    if (attempt === 3) {
      throw new Error(`${response.status} ${contentType || "unknown content type"}`);
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 500));
  }
}

async function worker() {
  while (true) {
    const index = cursor;
    cursor += 1;
    if (index >= products.length) return;
    const product = products[index];
    try {
      products[index] = await downloadProduct(product);
    } catch (error) {
      failures.push({ id: product.id, image: product.image, error: String(error) });
    }
    completed += 1;
    if (completed % 20 === 0 || completed === products.length) {
      console.log(`Downloaded ${completed}/${products.length}; failures: ${failures.length}`);
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));
await mkdir(path.dirname(outputManifest), { recursive: true });
await writeFile(
  outputManifest,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      source: "https://libronic-iq.com/",
      products,
      failures,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log(`Saved ${products.length - failures.length} product images.`);
if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
}
