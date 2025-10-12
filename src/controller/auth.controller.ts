import { Request, Response } from "express";
import { userRepository } from "../repository/index.ts";
import { UserResponse } from "../dto/response/user.response.ts";
import { Encrypt_Password } from "../helper/password.helper.ts";
import { Token } from "../helper/token.helper.ts";

export class AuthController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await userRepository.getUserByEmail(email);
        if (!user || !(await Encrypt_Password.comparePassword(password, user.password))) {
            res.status(401).json({ message: "Invalid email or password...!" });
        }

        const token = await Token.generateToken({ id: user?.id });
        const refreshToken = await Token.generateRefereshToken({ id: user?.id });
        res.status(200).json({ user: new UserResponse(user), token, refreshToken });

    }
    static async regenerateToken(req: Request, res: Response) {
        
    }

    // forgot password

    static async forgotPassword(req: Request, res: Response) {
        const checkUser = await userRepository.getUserByEmail(req.body.email);
        if (!checkUser) {
            res.status(404).json({ message: "Email does not exist...!" });
        }
        
    }

    // reset password

    static async resetPassword(req: Request, res: Response) {
        
    }
}


