const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, "my-string", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        if (decoded.userId !== req.headers.user_id) {
            res.status(401).json({ message: "Invalid token" });
        } else {
            next();
        }
    });
};

export default auth;