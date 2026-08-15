require("dotenv").config();
const { PrismaClient } = require("../../generated/prisma/client.ts");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"]
})

const connectDB = async () => {
    try {
        await prisma.$connect()
        console.log("DB Connect via Prisma")
    } catch (error){
        console.error(`Database connect error: ${error.message}`)
        process.exit(1)
    }
}

const disconnectDB = async () => {
    await prisma.$disconnect()
}

module.exports = { prisma, connectDB, disconnectDB };
