const mongoose  = require("mongoose");

const connectDB = async () =>{
    try{

        const connect  = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB Atlas connected  ,${connect.connection.host}` )

    }catch(error){
        console.log(`Database Connection Error, ${error}`)
    }
}