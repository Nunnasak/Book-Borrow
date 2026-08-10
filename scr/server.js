const express = require("express");
const authRoutes = require("../scr/route/authRoute.js")
const app = express();

const PORT = 8000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})

app.use()

