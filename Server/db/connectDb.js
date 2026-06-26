import mongoose from "mongoose";
import config from "../config/config.js";

async function connectDb() {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("Mongodb has connected to the data base")

    } catch (error) {
        console.log(error)
    }
}

export default connectDb