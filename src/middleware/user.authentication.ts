import { NextFunction, Request, Response } from "express";
import { Token } from "../helper/token.helper.ts";

export const authentication = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const access_token = req.cookies.access_token;
    console.log(req);
    if (!access_token) {
        return res.status(401).json({ message: "Access token not found, User unauthorized" });
    }

    const decode = await Token.verifyToken(access_token);
    if (!decode) {
        return res.status(401).json({ message: "Access token expired, User unauthorized" });
    }

    (req as any).user = decode;

    next();
};
