import mongoose from 'mongoose';
import { hashPassword } from '../middleware/hashPasswordMiddleware.js';


const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: false,
        },
        cnic: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        role: {
            type: String,
            enum: ["User", "Admin"],
            default: "User"
        }
    },
    {
        timestamps: true,
    }
);

// Use save ho na sa phala hash passward ho ga phir user save ho ga 
UserSchema.pre('save', hashPassword);

export default mongoose.model('User', UserSchema);
