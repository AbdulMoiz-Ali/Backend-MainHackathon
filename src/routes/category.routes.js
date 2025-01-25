import express from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from "../controllers/Category.controllers.js";

const router = express.Router();

// Create a new category
router.post("/", createCategory);

// Get all categories
router.get("/", getAllCategories);

// Get a category by ID
router.get("/:id", getCategoryById);

// Update a category by ID
router.put("/:id", updateCategory);

// Delete a category by ID
router.delete("/:id", deleteCategory);

export default router;
