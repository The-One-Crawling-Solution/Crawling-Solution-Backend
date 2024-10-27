import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogsByCategory,
} from "../controller/blogController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createBlog", authenticateToken, createBlog);
router.get("/getBlogs", getBlogs);
router.get("/getBlogById", getBlogById);
router.put("/updateBlog", authenticateToken, updateBlog);
router.delete("/deleteBlog", authenticateToken, deleteBlog);
router.post("/getBlogsByCategory", getBlogsByCategory);

export default router;
