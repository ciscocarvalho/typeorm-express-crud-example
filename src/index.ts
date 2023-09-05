import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { router } from "./routes";
import { AppDataSource } from "./data-source";

const setUpExpress = () => {
  const app = express();
  const PORT = process.env.PORT ?? 5000;

  app.use(router);

  app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
  });
};

const setUpTypeOrm = async () => {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
};

const main = async () => {
  await setUpTypeOrm();
  setUpExpress();
};

main().catch((error) => console.error(error));
