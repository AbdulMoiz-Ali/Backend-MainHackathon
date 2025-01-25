import mongoose from "mongoose"

const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
    name: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    User: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loan"
    }],
});


export default mongoose.model('Subcategory', SubcategorySchema);