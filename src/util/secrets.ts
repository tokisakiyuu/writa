import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  logger.debug("Using .env.example file to supply config environment variables");
  dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
// const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const MONGODB_URI = process.env["MONGODB_URI"];
export const SSL_KEY_PATH = process.env["SSL_KEY_PATH"];
export const SSL_CERT_PATH = process.env["SSL_CERT_PATH"];
export const PORT = process.env["PORT"];

if (!SESSION_SECRET) {
  logger.error("No client secret. Set SESSION_SECRET environment variable.");
  process.exit(1);
}

if (!MONGODB_URI) {
  logger.error("No mongo connection string. Set MONGODB_URI environment variable.");
  process.exit(1);
}

if (!fs.existsSync(SSL_KEY_PATH)) {
  logger.debug("Dose not exist SSL key file");
  process.exit(1);
}

if (!fs.existsSync(SSL_CERT_PATH)) {
  logger.debug("Dose not exist SSL cert file");
  process.exit(1);
}
