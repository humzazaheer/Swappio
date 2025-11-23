import { Router } from "express";
import { authorization, authentication } from "../middleware/index.ts";
import { userRoles } from "../enum/user.enum.ts";
import { UploadFileController } from "../controller/uploadFile.controller.ts";
import { uploadProfileImage } from "../helper/fileUpload.helper.ts";

export const uploadFileRouter = Router();


uploadFileRouter.put(
    "/profile-image",
    authentication,
    authorization([userRoles.USER]),
    uploadProfileImage.single('profile_image'),
    UploadFileController.uploadProfileImage

);

// uploadFileRouter.post(
//     "/ad-images",
//     authentication,
//     authorization([userRoles.USER]),
//     uploadEventImages.array("eventImages", 10),
//     UploadController.uploadEventImages
// );