import Blog from "../model/blogModel.js";
import { sendSuccess, sendError } from "../utils/responseUtil.js";
import { paginate } from "../utils/paginationUtil.js";

export const createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    sendSuccess(res, { newBlog }, "Blog created successfully", 200);
  } catch (error) {
    sendError(res, error, 500);
  }
};

export const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Define the query with filters
    const query = { isActive: true, isDeleted: false };

    // Paginate the blogs with the defined query
    const blogs = await paginate(Blog, page, limit, query);
    const totalBlogs = await Blog.countDocuments(query);
    const totalPages = Math.ceil(totalBlogs / limit);

    sendSuccess(
      res,
      { blogs, currentPage: page, totalPages, totalBlogs },
      "Blogs fetched successfully",
      200
    );
  } catch (error) {
    sendError(res, error, 500);
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.query.id);
    if (!blog) return sendError(res, "Blog not found", 404);
    sendSuccess(res, { blog }, "Blog fetched successfully", 200);
  } catch (error) {
    sendError(res, error, 500);
  }
};

export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBlog) return sendError(res, "Blog not found", 404);
    sendSuccess(res, { updatedBlog }, "Blog updated successfully", 200);
  } catch (error) {
    sendError(res, error, 400);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.query.id;

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { isActive: false, isDeleted: true },
      { new: true }
    );

    if (!updatedBlog) return sendError(res, "Blog not found", 404);

    sendSuccess(res, { updatedBlog }, "Blog  deleted successfully", 200);
  } catch (error) {
    sendError(res, error, 500);
  }
};

export const getBlogsByCategory = async (req, res) => {
  try {
    const { categories } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!Array.isArray(categories) || categories.length === 0) {
      return sendError(
        res,
        "Please provide a non-empty array of categories",
        400
      );
    }

    const blogs = await Blog.find({
      category: { $in: categories },
      isActive: true,
      isDeleted: false,
    })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalBlogs = await Blog.countDocuments({
      category: { $in: categories },
      isActive: true,
      isDeleted: false,
    });
    const totalPages = Math.ceil(totalBlogs / limit);

    if (blogs.length === 0) {
      return sendError(res, "No blogs found for these categories", 404);
    }

    sendSuccess(
      res,
      { blogs, currentPage: page, totalPages, totalBlogs },
      "Matching blogs fetched successfully",
      200
    );
  } catch (error) {
    sendError(res, error, 500);
  }
};
