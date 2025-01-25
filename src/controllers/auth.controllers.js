import User from "../models/User.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Password generation function
const generatePassword = (name) => {
    if (!name) {
        throw new Error("Name is required to generate a password");
    }
    const initials = name.toLowerCase().slice(0, 3);
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    return `${initials}${randomNumbers}`;
};

// Access token generation
const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

// Register user
const register = async (req, res) => {
    try {
        const { name, email, cnic, role } = req.body;

        if (!name || !email || !cnic) {
            return res.status(400).json({ message: "Name, Email, and CNIC are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const password = generatePassword(name);
        const newUser = new User({ name, email, cnic, password, role });
        await newUser.save();

        // Send welcome email with the password
        await transporter.sendMail({
            from: `"Abdul Moiz Ali" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "🎉 Your Account Password & Welcome to Our Platform! 🎉",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <div style="text-align: center; font-size: 48px;">👋</div>
                    <h1 style="color: #333; text-align: center; font-size: 28px; margin-bottom: 20px;">Welcome to Our Community!</h1>
                    <p style="color: #555; text-align: center; font-size: 16px; line-height: 1.6;">
                        Hi <strong>${name}</strong>,
                    </p>
                    <p style="color: #555; text-align: center; font-size: 16px; line-height: 1.6;">
                        We’re excited to have you onboard! Below, you’ll find your <strong>account password</strong> to log in and get started:
                    </p>
                    <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px;">
                        <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">Your Password</h2>
                        <p style="font-size: 20px; color: #007bff; font-weight: bold; margin: 0;">${password}</p>
                        <p style="font-size: 14px; color: #999; margin: 10px 0;">(Please keep this password secure and do not share it with anyone.)</p>
                    </div>
                    <p style="color: #555; text-align: center; font-size: 16px; line-height: 1.6;">
                        Once you log in, we recommend changing your password to something you’ll remember. If you face any issues, feel free to reach out to our support team.
                    </p>
                    <footer style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">
                        © ${new Date().getFullYear()} Your Platform. All rights reserved.
                    </footer>
                </div>
            `,
        });

        res.status(201).json({ message: "User created successfully", data: { name, email } });
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }

        const accessToken = generateAccessToken(user._id);

        res.status(200).json({
            message: "Login successful",
            accessToken,
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Logout user
const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
};

export { register, login, logout };
