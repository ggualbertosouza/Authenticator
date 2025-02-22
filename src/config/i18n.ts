import i18n from "i18n";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);

const localesPath = path.join(currentDir, "../locales");

i18n.configure({
  locales: ["pt-br", "en"],
  directory: localesPath,
  defaultLocale: "pt-br",
  objectNotation: true,
  autoReload: true,
  syncFiles: true,
  queryParameter: "lang",
  cookie: "lang",
});

export default i18n;
