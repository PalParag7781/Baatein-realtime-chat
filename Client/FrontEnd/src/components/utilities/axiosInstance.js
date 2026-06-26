import axios from "axios";

const DB_URL = "https://baatein-realtime-chat-backend.onrender.com/api/v1";

export const axiosInstance = axios.create({
    baseURL: DB_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json", 
    },
});
