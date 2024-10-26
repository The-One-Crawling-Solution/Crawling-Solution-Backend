import express from "express";
import multer from "multer";
import { uploadImage } from "../controller/uploadController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/uploadImage",
  upload.single("image"),
  authenticateToken,
  uploadImage
);

export default router;
