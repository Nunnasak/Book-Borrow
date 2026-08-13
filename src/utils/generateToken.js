const jwt = require("jsonwebtoken");

const generateToken = (userID, res) => {
    const payload = { id: userID }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("jwt", token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samesite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    return token;
}

module.exports = { generateToken };