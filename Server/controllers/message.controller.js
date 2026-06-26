import MessageModel from "../models/message.model.js"
import conversationModel from "../models/conversation.model.js"
import messageModel from "../models/message.model.js"
import { getSocketId, io } from "../Socket.js"

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id
        const receiverId = req.params.receiverId
        const message = req.body.message

        if (!senderId || !receiverId || !message) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        let conversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await conversationModel.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = await messageModel.create({
            senderId, receiverId, message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
            await conversation.save()
        }
        //socket.io 
        const socketId = getSocketId(receiverId)

        console.log("receiverId =", receiverId)
        console.log("socketId =", socketId)

        io.to(socketId).emit("messages", newMessage)

        console.log("message emitted")

        return res.status(201).json({
            success: true,
            message: newMessage
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const getMessages = async (req, res) => {
    try {
        const myId = req.id;
        const otherParticipantId = req.params.otherParticipantId;

        if (!myId || !otherParticipantId) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const conversation = await conversationModel.findOne({
            participants: { $all: [myId, otherParticipantId] },
        }).populate("messages")

        res.status(200).json({
            success: true,
            responseData: conversation,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};