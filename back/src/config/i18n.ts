import i18n from "i18n";
import path from "node:path";
import { __dirname } from "../utils/dirname";

const localesPath = path.join(__dirname, "./config/locales");

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
