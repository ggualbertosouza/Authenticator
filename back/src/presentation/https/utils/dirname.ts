import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFilePath = fileURLToPath(import.meta.url);
const dirname = path.dirname(currentFilePath);

export const __dirname = path.join(dirname, "..");
