import { Request, Response } from "express";
import { userRepository } from "../repository/index.ts";
import { existsSync, unlink } from "node:fs";
import { ProfileImageUploadResponseDto } from "../dto/response/upload.response.ts";


export class UploadFileController {
    static uploadProfileImage = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            if (!req.file) {
                res.status(400).json({
                    success: false,
                    message: "No file uploaded",
                });
                return;
            }

            const user = (req as any).user;
            const userId = user?.id || null;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "User not authenticated",
                });
                return;
            }

            const imageUrl = `/image/profile_image/${req.file.filename}`;

            const updatedUser = await userRepository.updateUser(userId, {
                profile_image: imageUrl,
            });

            if (!updatedUser) {
                res.status(404).json({
                    success: false,
                    message: "User not found",
                });
                return;
            }

            const responseData = new ProfileImageUploadResponseDto({
                filename: req.file.filename,
                url: imageUrl,
                size: req.file.size,
                user: updatedUser,
            });

            res.status(200).json({
                success: true,
                message: "Profile image uploaded and saved successfully",
                data: responseData,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error uploading profile image",
                error: (error as Error).message,
            });
        }
    };
}