import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(403).json({
            message: "Access denied. No token provided.",
        })
    }

    const token = authHeader.split(' ')[1];
    try {
        // jwt.verify(token, secretKey, (err, decoded) => {
        //     if (err) {
        //         return res.status(401).json({
        //             message: "Invalid token.",
        //         });
        //     }
        //     req.userId = decoded.userId;
        //     next();
        // })
        const decoded = jwt.verify(token, secretKey);
        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            res.status(401).json({ message: "Invalid token." })
        }


    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
}
export default authMiddleware;