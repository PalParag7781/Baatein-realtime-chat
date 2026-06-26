

import express from 'express'
import { createServer } from 'http'
import { userInfo } from 'os'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "https://baatein-realtime-chat-frontend.onrender.com",
        credentials: true

    }
})

const userSocketIdMap = {}

io.on("connection", (socket) => {

    console.log('Handshake', socket.handshake.query.userId)

    const userId = socket.handshake.query.userId

    if (!userId || userId === "undefined") {
        return
    }

    userSocketIdMap[userId] = socket.id
    console.log("user is connected for userId ", userId, "socketId is ", socket.id)
    console.log(userSocketIdMap)

    io.emit("onlineUsers", Object.keys(userSocketIdMap))

    socket.on("disconnect", (reason) => {
        delete userSocketIdMap[userId];
        console.log(`User Disconnected: ${socket.id}. Reason: ${reason}`);

        io.emit("onlineUsers", Object.keys(userSocketIdMap));

    })

})

export const getSocketId = (userId) => {
    return userSocketIdMap[userId]
}

export { app, io, server } 
