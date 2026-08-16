const { prisma } = require("../config/db.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken.js");

const register = async (req, res) => {
    const { name, password } = req.body
    const userExit = await prisma.users.findUnique({
        where: { username: name }
    })
    if (userExit) {
        return res
            .status(409)
            .json({message: "The user with this name is already exist"})
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.users.create({
        data: {
            username: name,
            password_hash: hashedPassword,
        },
    })

    const token = generateToken(user.id, res)

    res.status(201).json({
        data: {
            User: {
                id: user.id,
                username: name,                
            },
            token,
        }
    })
}

const login = async(req, res) => {
    const { name, password } = req.body
    const user = await prisma.users.findUnique({
        where: {username: name}
    })
    if (!user){
        return res.status(409).json({message: "Invalid username or password"})
    }

    const ispasswordValid = await bcrypt.compare(password ,user.password_hash)

    if (!ispasswordValid){
        return res.status(409).json({message: "Invalid username or password"})
    }

    const token = generateToken(user.id, res)

    res.status(201).json({
        data: {
            user: {
                id: user.id,
            },
            token,
        },
    })
}

const logout = async (req, res) => {
    res.cookie("jwt", "",{
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({
        status: "Success",
        message: "Logged out Successfully"
    })
}

module.exports = { register, login, logout}