import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export const NODE_ENV = process.env.NODE_ENV || "development";

export const SERVER = {
  HOSTNAME: process.env.SERVER_HOSTNAME || "localhost",
  PORT: process.env.SERVER_PORT || 3080,
};

export const DB_STRING = process.env.DB_STRING || "";

export const TOKEN = {
  jwt_secret: process.env.JWT_SECRET || "",
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || "",
};

export const AZURE = {
  TENANT_ID: process.env.TENANT_ID || "",
  CLIENT_ID: process.env.AZURE_CLIENT_ID || "",
  AZURE_SECRET: process.env.AZURE_SECRET || "",
  AZURE_CALLBACK_URL: process.env.AZURE_CALLBACK_URL || "",
};
