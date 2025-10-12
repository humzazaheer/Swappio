import { Request, Response } from "express";
import { userRepository } from "../repository/index.ts";
import { UserResponse } from "../dto/response/user.response.ts";
import { Encrypt_Password } from "../helper/password.helper.ts";
import { otpGenerator } from "../helper/otp.helper.ts";
import { mailer } from "../helper/mailer.helper.ts";
import { error } from "console";

export class UserController {
  static createUser = async (req: Request, res: Response) => {
    // check if user exists
    const { email } = req.body;
    const getUser = await userRepository.getUserByEmail(email);
    if (getUser) {
      return res.status(401).json({ message: "User already exists!" });
    }

    // hasing password and adding opt before sending response

    const otp = otpGenerator();
    const user = await userRepository.createUser(req.body);

    // sending mail with otp

    const mail = await mailer(
      email,
      "Account Verification",
      `Hi ${user.firstName} ${user.lastName}, your OTP is ${otp}. OTP will expire in 2 minutes, please verify your account.`,
      `<p>Hi ${user.firstName} ${user.lastName}, your OTP is ${otp} OTP will expire in 2 minutes, please verify your account.</p>`
    );

        if (mail?.info) {
            // adding 2 minutes to current time, OTP validity 2 minutes
            const otpValidTill = new Date(new Date().getTime() + 2 * 60000);
            const payload = await userRepository.createUser({ ...user, otp, password: await Encrypt_Password.hashPassword(user.password), otpValidTill: otpValidTill });
            res.status(200).json({ mesage: `Hi ${user.firstName} ${user.lastName}, an OTP is sent to your email, please verify your account.`, user: new UserResponse(payload) });

        } else {
            console.log("Error sending email: ", mail?.error);
            res.status(401).json({ mesage: "OPT not sent, something went wrong." });
        }
    }
    static getAllUsers = async (req: Request, res: Response) => {
        const allUsers = await userRepository.getAllUsers();
        res.status(200).json(allUsers);
    }
}