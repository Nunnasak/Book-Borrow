const jwt = require("jsonwebtoken");

const generateToken = (userID, res) => {
    const payload = { id: userID }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
}