const express = require("express")
const cookieParser = require("cookie-parser")
const dotenv = require("express")
const { clerkMiddleware } = require('@clerk/express') 

dotenv.config()

const app = express();


app.use(express.json())

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(clerkMiddleware())

module.exports = app



// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})