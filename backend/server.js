const app = require("./app")
const dotenv = require("dotenv")
const connectDB = require("./config/database")
const cloudinary = require("cloudinary")

// Handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to uncaught exception")
    process.exit(1)
})

// Config
dotenv.config({path:"backend/config/config.env"})

// Connecting to DB
connectDB()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

// Unhandled promise rejections

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to unhandled promise rejection")

    server.close(()=>{
        process.exit(1);
    })
})