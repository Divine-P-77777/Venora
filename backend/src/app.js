const express = require("express")
const cookieParser = require("cookie-parser")
require('dotenv').config();
const { clerkMiddleware } = require('@clerk/express')
const authRoutes = require("./routes/auth.routes")
const eventRoutes = require("./routes/event.routes")
const {seedRootAdmin} = require("../src/utils/seedAdmin")
const app = express();


app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(clerkMiddleware())

seedRootAdmin()


app.use("/api/auth", authRoutes)
app.use("/api/event", eventRoutes)

module.exports = app
