import * as bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
configDotenv();

const { SALT_ROUNDS } = process.env;

export class Encrypt_Password {



    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
        return bcrypt.hashSync(password, salt);
    }

    static async comparePassword(
        password: string,
        hashedPassword: string
    ): Promise<boolean> {
        return bcrypt.compareSync(password, hashedPassword);
    }
}