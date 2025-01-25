import express from "express";
import {
    createSubcategory,
    getAllSubcategories,
    getSubcategoryById,
    updateSubcategory,
    deleteSubcategory,
} from "../controllers/Subcatagaries.controllers.js";

const router = express.Router();

// Create a new subcategory
router.post("/", createSubcategory);

// Get all subcategories
router.get("/", getAllSubcategories);

// Get a subcategory by ID
router.get("/:id", getSubcategoryById);

// Update a subcategory by ID
router.put("/:id", updateSubcategory);

// Delete a subcategory by ID
router.delete("/:id", deleteSubcategory);

export default router;
