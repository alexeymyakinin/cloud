import { Sequelize } from "sequelize";
import { PG_BASE, PG_HOST, PG_PASS, PG_PORT, PG_USER } from "./config";

export const sequelize = new Sequelize({
    username: PG_USER,
    password: PG_PASS,
    database: PG_BASE,
    host: PG_HOST,
    port: PG_PORT,
    dialect: "postgres",
});
