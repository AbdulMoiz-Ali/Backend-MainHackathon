import Category from "../models/Category.models.js";

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { name, subcategories, Maxloan, Loanperiod } = req.body;

        // Validate input
        if (!name || !Maxloan || !Loanperiod) {
            return res.status(400).json({ message: "Name, Maxloan, and Loanperiod are required" });
        }

        const category = new Category({
            name,
            subcategories,
            Maxloan,
            Loanperiod,
        });

        await category.save();

        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Failed to create category", error: error.message });
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate("subcategories");
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Failed to fetch categories", error: error.message });
    }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id).populate("subcategories");

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ message: "Failed to fetch category", error: error.message });
    }
};

// Update a category
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, subcategories, Maxloan, Loanperiod } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, subcategories, Maxloan, Loanperiod },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category updated successfully", updatedCategory });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Failed to update category", error: error.message });
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully", deletedCategory });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Failed to delete category", error: error.message });
    }
};
