import { Request, response, Response } from "express";
import { userRepository } from "../repository/index.ts";
import { UserResponse } from "../dto/response/user.response.ts";
import { Encrypt_Password } from "../helper/password.helper.ts";
import { Token } from "../helper/token.helper.ts";
import { otpGenerator } from "../helper/otp.helper.ts";
import { mailer } from "../helper/mailer.helper.ts";
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "referesh_token";

export class AuthController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await userRepository.getUserByEmail(email);
        if (!user || !(await Encrypt_Password.comparePassword(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password...!" });
        }
        const accessToken = await Token.generateToken({ id: user?.id });
        const refreshToken = await Token.generateRefereshToken({ id: user?.id });
        res.cookie(ACCESS_TOKEN_KEY, accessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });
        res.cookie(REFRESH_TOKEN_KEY, refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });
        res.status(200).json(new UserResponse(user));

    }



    static async verifyAccount(req: Request, res: Response) {
        const { email, otp } = req.body;
        const user = await userRepository.getUserByEmail(email);

        if (user) {
            if (user.isVerified) {
                return res.status(400).json({ message: "User is already verified." });
            }
            else {
                const isOtpValid = user.otpValidTill && new Date(user.otpValidTill) > new Date();

                if (user.otp === otp && isOtpValid) {
                    user.isVerified = true;
                    user.otp = null;

                    user.otpValidTill = null;
                    await userRepository.updateUser(user.id, user);

                    res.status(200).json({ message: "User verified successfully" });
                } else {
                    return res.status(400).json({ message: "Invalid OTP or expired" });
                }
            }
        }
        else {
            return res.status(404).json({ message: "User not found." });
        }




    }

    static async resendOtp(req: Request, res: Response) {
        const { email } = req.body;
        const user = await userRepository.getUserByEmail(email);

        if (user) {
            if (user.isVerified) {
                return res.status(400).json({ message: "User is already verified" });

            }
            else {
                const otp = otpGenerator();
                const otpValidTill = new Date(new Date().getTime() + 2 * 60000);

                if (process.env.MODE === 'dev') {
                    const payload = await userRepository.updateUser(user.id, { otp, otpValidTill });
                    res.status(200).json({ mesage: `Hi ${user.firstName} ${user.lastName}, your OTP has expired, a new OTP is sent to your email, please verify your account.`, user: new UserResponse(payload) });
                }
                else {
                    const mail = await mailer(
                        email,
                        "Account Verification",
                        `Hi ${user.firstName} ${user.lastName}, your OTP has expired, here is your new OTP ${otp}. OTP will expire in 2 minutes, please verify your account.`,
                        `<p>Hi ${user.firstName} ${user.lastName}, your OTP has expired, here is your new OTP ${otp}. OTP will expire in 2 minutes, please verify your account.</p>`,
                    );

                    if (mail?.info) {
                        // adding 2 minutes to current time, OTP validity 2 minutes

                        const payload = await userRepository.updateUser(user.id, { otp, otpValidTill });

                        res.status(200).json({ mesage: `Hi ${user.firstName} ${user.lastName}, your OTP has expired, a new OTP is sent to your email, please verify your account.`, user: new UserResponse(payload) });

                    } else {
                        console.log("Error sending email: ", mail?.error);
                        res.status(401).json({ mesage: "OPT not sent, something went wrong.", error: mail?.error });
                    }
                }

            }
        }
        else {
            return res.status(404).json({ message: "User not found." });

        }
    }

    static async regenerateTokens(req: Request, res: Response) {
        const oldRefreshToken = req.cookies.referesh_token;

        if (!oldRefreshToken) {
            return res.status(400).json({ message: "Refresh token is required" });
        }
        try {
            const payload = await Token.verifyToken(oldRefreshToken);

            const accessToken = await Token.generateToken({ id: payload.id });
            const refreshToken = await Token.generateRefereshToken({
                id: payload.id,
            });
            res.cookie(ACCESS_TOKEN_KEY, accessToken, {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
            });
            res.cookie(REFRESH_TOKEN_KEY, refreshToken, {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
            });
            res.status(200).json({ message: "Token refreshed successfully" });
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

            if (process.env.MODE === 'prod') {

                const mail = await mailer(
                    req.body.email,
                    "Password Reset",
                    '',
                    `Hi ${checkUser.firstName} ${checkUser.lastName}, your OTP is <strong>${otp}</strong>. OTP will expire in 2 minutes, please verify to reset your password.`,
                )
                mail.sent ? res.status(200).json({ message: mail.message }) : res.status(400).json({ message: mail.message });
            }

            res.status(200).json({ message: "OTP sent successfully.", userEmail: checkUser.email });
        }


    }

    // verify otp

    static async verifyOtp(req: Request, res: Response) {
        const { email, otp } = req.body;
        const user = await userRepository.getUserByEmail(email);
        if (!user || !user.otp || !user.otpValidTill || user.otp !== otp || user.otpValidTill < new Date()) {
            res.status(400).json({ message: "Invalid or expired OTP." });
        } else {
            await userRepository.updateUser(user.id, { otp: null, otpValidTill: null });

            res.status(200).json({ message: "OTP verified successfully.", userEmail: email });
        }
    }


    // reset password

    static async resetPassword(req: Request, res: Response) {
        const { email, password, otp } = req.body;
        const user = await userRepository.getUserByEmail(email);


        if (!user || !user.otp || !user.otpValidTill || user.otp !== otp || user.otpValidTill < new Date()) {
            return res.status(400).json({ message: "Invalid or expired OTP." });
        }

        await userRepository.updateUser(user.id, { password: await Encrypt_Password.hashPassword(password) });
        res.status(200).json({ message: "Password reset successfully." });

    }

    // logout 
    static async logout(req: Request, res: Response) {
        res.clearCookie(ACCESS_TOKEN_KEY);
        res.clearCookie(REFRESH_TOKEN_KEY);
        res.status(200).json({ message: "Logged out successfully" });
    }
}
