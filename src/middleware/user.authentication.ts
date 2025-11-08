import { NextFunction, Request, Response } from "express";
import { Token } from "../helper/token.helper.ts";

export const authentication = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const access_token = req.cookies.access_token;
    if (!access_token) {
        return res.status(401).json({ message: "Access token not found, User unauthorized" });
    }



    const decode = await Token.verifyToken(access_token);
    if (!decode) {
        return res.status(401).json({ message: "Access token not verified, User unauthorized" });
    }

    // (req as any ).user = decode;
    req.headers["user"] = decode;

    next();
};
