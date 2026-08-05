const app = require("./src/app")


const database = require("./src/db/db")

database.connectDB()

PORT = 8000

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})