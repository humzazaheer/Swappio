import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();
const {DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD, DB_USER} = process.env

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST || "localhost",
    port: Number(DB_PORT) || 5432,
    username: DB_USER || "root",
    password: DB_PASSWORD || "root@pg",
    database: DB_NAME || "swappio",
    synchronize: false,
    logging: false,
    entities: ["./src/entity/**/*.ts"],
    migrations: ["./src/migration/**/*.ts"],
});