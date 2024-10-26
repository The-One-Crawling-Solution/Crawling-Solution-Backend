import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
import { sendSuccess, sendError } from "../utils/responseUtil.js";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileContent = fs.readFileSync(req.file.path);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `Blog/${Date.now()}_${path.basename(req.file.originalname)}`,
      Body: fileContent,
      ContentType: req.file.mimetype,
    };

    const data = await s3.upload(params).promise();

    fs.unlinkSync(req.file.path);

    sendSuccess(
      res,
      { imageUrl: data.Location },
      "Blog deleted successfully",
      200
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    sendError(res, error, 500);
  }
};
