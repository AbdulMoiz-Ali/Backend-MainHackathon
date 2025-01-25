import express from 'express';
import { register, login, logout } from '../controllers/auth.controllers.js';
import { hashPassword } from '../middleware/hashPasswordMiddleware.js';
const router = express.Router();

// Register Route
router.post('/register', hashPassword, register);

// Login Route
router.post('/login', login);
//logout Route
router.post('/logout', logout)
// Protected Route
// router.get('/protected', verifyAccessToken, (req, res) => {
//     res.status(200).json({
//         message: "You have access to protected data",
//         user: req.user,  // User info added by the verifyAccessToken middleware
//     });
// });


// router.post("/addproducts", authenticate, upload.single("image"), addProduct);

export default router;
