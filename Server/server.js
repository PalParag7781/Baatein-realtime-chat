import dotenv from "dotenv"
import express from "express"
import userRouter from "./routes/user.route.js";
import connectDb from "./db/connectDb.js";
import messageRouter from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { app, server } from "./Socket.js";


const PORT = 5000

app.use(cors({
    origin: 'https://baatein-realtime-chat-frontend.onrender.com',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "I am from Backend of ChatApp"
    })
})

app.use("/api/v1/user", userRouter)
app.use("/api/v1/message", messageRouter)

server.listen(PORT, () => {
    connectDb()
    console.log("Your Port has connected to ", PORT)
})
