import express from "express"
import { Router } from "express"
import * as messageController from "../controllers/message.controller.js"
import isAuthenticated from "../middlewares/authenticated.js"

const messageRouter = Router()

messageRouter.post("/send/:receiverId", isAuthenticated, messageController.sendMessage);


messageRouter.get("/get-messages/:otherParticipantId", isAuthenticated, messageController.getMessages);

export default messageRouter