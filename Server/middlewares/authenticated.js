import config from "../config/config.js";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token_sent = req.headers.authorization?.split(" ")[1];


        if (!token_sent) {
            return res.status(401).json({ message: "Access token not found" });
        }

        const decoded = jwt.verify(token_sent, config.JWT_SECRET);
        console.log("The value of decoded is ", decoded)
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: "false",
            });
        }
        req.id = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token is invalid or expired",
            success: false,
        });
    }
};

export default isAuthenticated;
