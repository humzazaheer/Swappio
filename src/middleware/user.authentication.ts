import { NextFunction, Request, Response } from "express";
import { Token } from "../helper/token.helper.ts";
import { AuthController } from "../controller/auth.controller.ts";

export const authentication = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: "Header not found, User unauthorized" });
    }

    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token not found, User unauthorized" });
    }

    const decode = await Token.verifyToken(token);
    if (!decode) {
        return res.status(401).json({ message: "Token not verified, User unauthorized" });
    }

    (req as any).user = decode;

    // AuthController.regenerateTokens;

    next();
};
