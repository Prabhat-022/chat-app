import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});

<<<<<<< HEAD
// const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
        
//         if (!token) {
//             return res.status(401).json({ message: "User not authenticated." })
//         };

//         const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

//         if (!decodedToken) {
//             return res.status(401).json({
//                 message: "Invalid token"
//             })
//         }
//         req.id = decodedToken.userId;

//         next();
//     } catch (error) {
//         console.log('isAuthenticated error: ', error)
//         return res.status(401).json({ message: "Token verification failed." })
//     }
// }

// export default isAuthenticated;



//Middleware to protect routes
const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.user.id).select('-password');
            next();
        } catch (error) {
            console.error("Token varification failed:", error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
=======
const isAuthenticated = async (req, res, next) => {
    console.log("cookie ", req.cookies)
    // const token = req.headers.authorization.split(" ")[1];
    // console.log('msm token ', token )
    // console.log('msm req body', req.body)
    try {
        // Try to get token from cookies first
        let token = req.cookies.token;
        console.log('token', token)

        // If not in cookies, try to get from Authorization header
        if (!token) {
            const authHeader = req.headers.authorization;
            console.log('header', authHeader)
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            }
        }

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated. Please login first."
            });
        }

        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.id = decodedToken.userId;
            next();
        } catch (jwtError) {
            return res.status(401).json({
                message: "Invalid or expired token. Please login again."
            });
        }
    } catch (error) {
        console.error('isAuthenticated error:', error);
        return res.status(401).json({
            message: "Authentication failed. Please try logging in again."
        });
>>>>>>> ea8f39e (fixed some bugs)
    }
};

export default protect;