const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Conexion a base de datos Mongo exitosa!")
    }
})
