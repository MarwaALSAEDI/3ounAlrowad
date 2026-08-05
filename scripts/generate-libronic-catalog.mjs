import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "public", "libronic-catalog", "catalog.json");
const outputPath = path.join(root, "src", "data", "libronicCatalog.ts");

const catalog = JSON.parse(await readFile(manifestPath, "utf8"));
const products = catalog.products.map((product) => ({
  categoryId: product.categoryId,
  id: product.id,
  image: product.original,
  name: product.name,
}));

const output = `export type LibronicCatalogProduct = {
  categoryId: 13 | 14 | 17;
  id: number;
  image: string;
  name: string;
};

export const libronicCatalog: LibronicCatalogProduct[] = ${JSON.stringify(products, null, 2)};
`;

await writeFile(outputPath, output, "utf8");
console.log(`Generated ${products.length} products at ${outputPath}`);
