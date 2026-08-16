require('dotenv').config()
const { connectDB, disconnectDB } = require('./config/db.js');
const express = require("express");
const authRoutes = require("./route/authRoute.js");
const bookRoutes = require("./route/bookRoutes.js");
const app = express();
const PORT = process.env.PORT;

const startServer = async () => {
    await connectDB();

    const server = app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/auth", authRoutes);
app.use("/book", bookRoutes);

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception", err);
    await disconnectDB();
    process.exit(1);
});

process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutdown gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});