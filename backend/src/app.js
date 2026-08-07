const express = require("express")
const cookieParser = require("cookie-parser")
require('dotenv').config();
const { clerkMiddleware } = require('@clerk/express')


const app = express();


app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(clerkMiddleware())

module.exports = app

const PORT = 8000

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})