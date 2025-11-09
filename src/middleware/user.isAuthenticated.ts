import { NextFunction, Request, Response } from "express";
import { Token } from "../helper/token.helper.ts";

export const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const access_token = req.cookies.access_token;
    // if (access_token) { 
    //     return res.status(401).json({ message: "User Already Logged in." });
    // }

   

    const decode = await Token.verifyToken(access_token);
    if (decode) {
        return res.status(401).json({ message: "User Already Logged in." });
    }

    req.headers["user"] = decode;

    next();
};
