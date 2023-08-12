const { verify } = require('jsonwebtoken');
require('dotenv').config();

const validateToken = (req, res, next) => {
    try {
        const accessToken = req.header("Authorization").split(" ")[1];
        if (!accessToken) {
            return res.sendStatus(401);
        }

        const payload = verify(accessToken, process.env.APP_SECRET);
        req.user = payload;
        return next();
    }
    catch (err) {
        console.log("Token verification error:", err.message);
        return res.sendStatus(401);
    }
}

module.exports = { validateToken };
