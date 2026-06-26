import { io } from "socket.io-client";


export let socket = null
export const socketConnect = (userId) => {
    socket = io("http://localhost:5000", {
        withCredentials: true,
        query: {
            userId
        },
    });
    return socket
} 