import { Message } from '../models/messageModel.js'
import { Conversation } from '../models/conversationModel.js'
import { getReceicedSocketId, io } from '../../socketServer.js';

export const sendMessage = async (req, res) => {

    try {
        const sender = req.id;
        const receiver = req.params.id;

        const { message } = req.body;

        // Find or create conversation
        let gotConversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] }
        });

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [sender, receiver],
                messages: []
            });
        }

        // Create message and add to conversation
        const newMessage = await Message.create({
            sender,
            receiver,
            message
        });

        if (newMessage) {
            gotConversation.messages.push(newMessage._id);

        }

        // await gotConversation.save();
        await Promise.all([gotConversation.save(), newMessage.save()]);

        const receivedSocketId = getReceicedSocketId(receiver);
        
        if (receivedSocketId) {

            console.log('Socket sent sms:', newMessage);
            io.to(receivedSocketId).emit("newMessage", newMessage);

        } else {

            console.log(`Receiver (ID: ${receiver}) is not connected.`);
             
        }

        return res.status(200).json({
            message: "Message sent successfully",
            success: true,
            message: newMessage
        });

    } catch (error) {
        console.log(`Message not sent: ${error}`);
        return res.status(500).json({
            message: "Error sending message",
            success: false,
            error: error.message
        });
    }
}

export const getAllTheMessage = async (req, res) => {
    try {
        const sender = req.id;
        const receiver = req.params.id;

        const conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] }
        }).populate("messages")

        return res.status(200).json(conversation?.messages)


    } catch (error) {
        console.log(`Message not fetched: ${error}`);
        return res.status(500).json({
            message: "Error fetching messages",
            success: false,
            error: error.message
        });
    }
}
