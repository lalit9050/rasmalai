import mongoose from "mongoose"

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongodb connected")
    } catch (error) {
        console.error("mongodb not connected")
        console.error("Error details:", error.message)
        console.error("MongoDB URL:", process.env.MONGODB_URL ? "Found" : "Not found")
    }
}

export default connectDB