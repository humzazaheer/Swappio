import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();
const { DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD, DB_USER, MODE } = process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST || MODE === "dev" ? "localhost" : "aws-1-ap-southeast-2.pooler.supabase.com",
    port: Number(DB_PORT) || 5432,
    username: DB_USER || MODE === "dev" ? "root" : "postgres.igkxldkpktdkipllissq",
    password: DB_PASSWORD || MODE === "dev" ? "root@pg" : "hZYF1tvcF8K3QouP",
    database: DB_NAME || MODE === "dev" ? "swappio" : "postgres",
    synchronize: true,
    logging: false,
    entities: ["./src/entity/**/*.ts"],
    migrations: ["./src/migration/**/*.ts"],
});