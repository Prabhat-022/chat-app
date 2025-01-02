import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: "User not authenticated." })
        };

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decodedToken) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        req.id = decodedToken.userId;

        next();
    } catch (error) {
        console.log('isAuthenticated error: ', error)
        return res.status(401).json({ message: "Token verification failed." })
    }
}

export default isAuthenticated;