import { io } from "socket.io-client";


export let socket = null
export const socketConnect = (userId) => {
    socket = io("https://baatein-realtime-chat-backend.onrender.com", {
        withCredentials: true,
        query: {
            userId
        },
    });
    return socket
} 
