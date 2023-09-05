import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import { IS_PRODUCTION } from "./constants";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port:
    process.env.DB_PORT === undefined
      ? undefined
      : parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: !IS_PRODUCTION,
  logging: !IS_PRODUCTION,
  entities: [path.join(__dirname, "entity", "**", "*.{js,ts}")],
  migrations: [path.join(__dirname, "migration")],
  subscribers: [],
});
