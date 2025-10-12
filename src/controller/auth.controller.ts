import { Request, response, Response } from "express";
import { userRepository } from "../repository/index.ts";
import { UserResponse } from "../dto/response/user.response.ts";
import { Encrypt_Password } from "../helper/password.helper.ts";
import { Token } from "../helper/token.helper.ts";
import { otpGenerator } from "../helper/otp.helper.ts";
import { mailer } from "../helper/mailer.helper.ts";

export class AuthController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await userRepository.getUserByEmail(email);
        if (!user || !(await Encrypt_Password.comparePassword(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password...!" });
        }
        const token = await Token.generateToken({ id: user?.id });
        const refreshToken = await Token.generateRefereshToken({ id: user?.id });
        res.status(200).json({ user: new UserResponse(user), token, refreshToken });

    }



    static async verifyAccount(req: Request, res: Response) {
        const { email, otp } = req.body;
        const user = await userRepository.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }


        if (user.otpValidTill && new Date() > new Date(user.otpValidTill)) {
            // return res.status(400).json({ message: "OTP has expired." });

            // OTP expired, generate new OTP and send email
            const otp = otpGenerator();
            const otpValidTill = new Date(new Date().getTime() + 2 * 60000);
            const mail = await mailer(
                email,
                "Account Verification",
                `Hi ${user.firstName} ${user.lastName}, your OTP has expired, here is your new OTP ${otp}. OTP will expire in 2 minutes, please verify your account.`,
                `<p>Hi ${user.firstName} ${user.lastName}, your OTP has expired, here is your new OTP ${otp}. OTP will expire in 2 minutes, please verify your account.</p>`,
            );

            if (mail?.info) {
                // adding 2 minutes to current time, OTP validity 2 minutes

                const payload = await userRepository.createUser({ ...user, otp, otpValidTill: otpValidTill });
                res.status(200).json({ mesage: `Hi ${user.firstName} ${user.lastName}, your OTP has expired,a new OTP is sent to your email, please verify your account.`, user: new UserResponse(payload) });

            } else {
                console.log("Error sending email: ", mail?.error);
                res.status(401).json({ mesage: "OPT not sent, something went wrong.", error: mail?.error });
            }
        }
        else {
            if (user.otp !== otp) {
                return res.status(400).json({ message: "Invalid OTP." });
            }
            else {
                // OTP is correct, verify user and clear OTP and time validity
                const updatedUser = await userRepository.updateUser(user.id, { isVerified: true, otp: null, otpValidTill: null });
                res.status(200).json({ message: "Account verified successfully.", user: new UserResponse(updatedUser) });
            }
        }



    }

    static async regenerateTokens(req: Request, res: Response) {
        const { refreshToken } = req.body;
        const decode = await Token.verifyToken(refreshToken);
        if (!decode) {
            return res.status(401).json({ message: "Invalid token." });
        }
        try {
            const newToken = await Token.generateToken({ id: decode.id });
            const newRefreshToken = await Token.generateRefereshToken({ id: decode.id });
            res.status(200).json({ message: "Token refreshed.", token: newToken, refreshToken: newRefreshToken });

        } catch (error) {
            res.status(401).json({ message: "Invalid refresh token" });
        }
    }

    // forgot password

    static async forgotPassword(req: Request, res: Response) {
        const checkUser = await userRepository.getUserByEmail(req.body.email);
        if (!checkUser) {
            res.status(404).json({ message: "Email does not exist...!" });
        }
        else {
            const otp = otpGenerator();
            const otpValidTill = new Date(new Date().getTime() + 2 * 60000);
            await userRepository.updateUser(checkUser.id, { otp, otpValidTill });
            const mail = await mailer(
                req.body.email,
                "Password Reset",
                '',
                `Hi ${checkUser.firstName} ${checkUser.lastName}, your OTP is <strong>${otp}</strong>. OTP will expire in 2 minutes, please verify to reset your password.`,
            )
            mail.sent ? res.status(200).json({message: mail.message}) : res.status(400).json({message: mail.message});
            
        }
        

    }

    // verify otp

    static async verifyOtp(req: Request, res: Response) {
        const {email, otp} = req.body;
        const user = await userRepository.getUserByEmail(email);
        if(!user || !user.otp || !user.otpValidTill || user.otp !== otp || user.otpValidTill < new Date()) {
            res.status(400).json({message: "Invalid or expired OTP."});
        } else {
            await userRepository.updateUser(user.id, {otp: null, otpValidTill: null});
            
            res.status(200).json({message: "OTP verified successfully."});
        }
    }

    // reset password

    static async resetPassword(req: Request, res: Response) {
        const {email, password} = req.body;
        const user = await userRepository.getUserByEmail(email);
        if(!user) {
            res.status(404).json({message: "User not found."});
        } else {
            await userRepository.updateUser(user.id, {password: await Encrypt_Password.hashPassword(password)});
            res.status(200).json({message: "Password reset successfully."});
        }
        

    }
}
