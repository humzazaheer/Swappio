import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

const { JWT_SECRET = "" } = process.env;

export class Token {
    static async generateToken(payload: any): Promise<string> {
        return await jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    }
    static async generateRefereshToken(payload: any): Promise<string> {
        return await jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    }

    static async verifyToken(token: string): Promise<any> {
        try {
            const decoded = await jwt.verify(token, JWT_SECRET);
            return decoded;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}