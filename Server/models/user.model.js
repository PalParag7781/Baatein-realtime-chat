import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
    },
    avatar: {
        type: String,
        required: true
    },

},
    { timestamps: true },)

const userModel = mongoose.model("User", userSchema)

export default userModel