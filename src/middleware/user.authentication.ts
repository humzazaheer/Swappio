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

    try {
        const decode = await Token.verifyToken(access_token);
        // Attach decoded info to request object, not headers
        (req as any).user = decode;
        next();
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Access token expired" });
        }
        return res.status(401).json({ message: "Access token not verified" });
    }
};
