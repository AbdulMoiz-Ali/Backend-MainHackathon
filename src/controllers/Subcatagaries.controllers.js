import Subcategory from "../models/Subcategory.models.js";

// Create a new subcategory
export const createSubcategory = async (req, res) => {
    try {
        const { name, category } = req.body;

        // Validate input
        if (!name || !category) {
            return res.status(400).json({ message: "Name and category are required" });
        }

        const subcategory = new Subcategory({
            name,
            category,
        });

        await subcategory.save();

        res.status(201).json({ message: "Subcategory created successfully", subcategory });
    } catch (error) {
        console.error("Error creating subcategory:", error);
        res.status(500).json({ message: "Failed to create subcategory", error: error.message });
    }
};

// Get all subcategories
export const getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate("category");
        res.status(200).json(subcategories);
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        res.status(500).json({ message: "Failed to fetch subcategories", error: error.message });
    }
};

// Get a single subcategory by ID
export const getSubcategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const subcategory = await Subcategory.findById(id).populate("category");

        if (!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        res.status(200).json(subcategory);
    } catch (error) {
        console.error("Error fetching subcategory:", error);
        res.status(500).json({ message: "Failed to fetch subcategory", error: error.message });
    }
};

// Update a subcategory
export const updateSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category } = req.body;

        const updatedSubcategory = await Subcategory.findByIdAndUpdate(
            id,
            { name, category },
            { new: true }
        );

        if (!updatedSubcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        res.status(200).json({ message: "Subcategory updated successfully", updatedSubcategory });
    } catch (error) {
        console.error("Error updating subcategory:", error);
        res.status(500).json({ message: "Failed to update subcategory", error: error.message });
    }
};

// Delete a subcategory
export const deleteSubcategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSubcategory = await Subcategory.findByIdAndDelete(id);

        if (!deletedSubcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        res.status(200).json({ message: "Subcategory deleted successfully", deletedSubcategory });
    } catch (error) {
        console.error("Error deleting subcategory:", error);
        res.status(500).json({ message: "Failed to delete subcategory", error: error.message });
    }
};
