import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./src/db/index.js";
import authRoutes from "./src/routes/auth.routes.js"
import cors from "cors"


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// routes
app.use("/auth", authRoutes);

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO DB connection failed !!! ", err);
    });
