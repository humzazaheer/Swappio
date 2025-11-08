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
    // adding 2 minutes to current time, OTP validity 2 minutes
    const otpValidTill = new Date(new Date().getTime() + 2 * 60000);
    const payload = await userRepository.createUser({
      ...user,
      otp,
      password: await Encrypt_Password.hashPassword(user.password),
      otpValidTill: otpValidTill,
    });

    // sending mail with otp


    if (user) {

      if (process.env.MODE === 'prod') {

        const mail = await mailer(
          email,
          "Account Verification",
          `Hi ${user.firstName} ${user.lastName}, your OTP is ${otp}. OTP will expire in 2 minutes, please verify your account.`,
          `<p>Hi ${user.firstName} ${user.lastName}, your OTP is ${otp} OTP will expire in 2 minutes, please verify your account.</p>`
        );

        if (!mail.info) {
          console.log("Error sending email: ", mail?.error);
          return res.status(401).json({ mesage: "OPT not sent, something went wrong." });
        }
      }

      res
        .status(200)
        .json({
          mesage: `Hi ${user.firstName} ${user.lastName}, an OTP is sent to your email, please verify your account.`,
          user: new UserResponse(payload),
        });
    }
  };
  static getAllUsers = async (req: Request, res: Response) => {
    const allUsers = await userRepository.getAllUsers();
    res.status(200).json(allUsers);
  };
  static deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const isDeleted = await userRepository.deleteUser(Number(id));
    if (isDeleted) {
      res.status(200).json({ message: "User deleted successfully!" });
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  };
  static getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;


    const user = await userRepository.getUserById(Number(id));
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res
      .status(200)
      .json(new UserResponse(user));
  };
  static updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;


    const user = await userRepository.updateUser(Number(id), req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res
      .status(200)
      .json({
        message: "User updated successfully!",
        user: new UserResponse(user),
      });
  };
  // user profile
  static async userProfile(req: Request, res: Response) {
    const user = req.cookies;

    console.log(user);
    const userFound = await userRepository.getUserById(user.id);

    if (userFound) {
      return res.status(200).json(new UserResponse(userFound));
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  }

}
