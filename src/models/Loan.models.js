import mongoose from "mongoose"

const Schema = mongoose.Schema;

const loanSchema = new Schema({
    category: {
        types: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    User: [{
        types: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    loanAmmount: {
        type: Number,
        required: true
    },
    Loanperiod: {
        type: String,
        required: true
    },
    deposit: {
        type: String,
        required: true,
        default: 0
    },
    loanstatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Completed'], // Allowed statuses
        default: 'Pending', // Default status
    },
    breakdownloan: {
        type: String
    }
});

loanSchema.pre("save", async function (next) {
    const breakdownloan = (this.loanAmount - this.deposit) / (this.loanPeriod * 12);
    this.paymentBreadDown = breakdownloan
    next()
})

export default mongoose.model('Loan', loanSchema);