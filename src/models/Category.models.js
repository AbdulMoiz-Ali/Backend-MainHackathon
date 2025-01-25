import mongoose from "mongoose"

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subcategories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subcategory"
        }
    ],
    Maxloan: {
        type: String,
        required: true
    },
    Loanperiod: {
        type: String,
        required: true
    }
});


export default mongoose.model('Category', categorySchema);