const express = require("express");
const authRoutes = require("./route/authRoute.js")
const app = express();

const PORT = 8000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})






process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection", err)
    server.close(async () => {
        await disconnectDB()
        process.exit(1)
    })
})

process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception", err)
    await disconnectDB()
    process.exit(1)
})

process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutdown gracefully")
    server.close(async () => {
        await disconnectDB()
        process.exit(0)
    })
})