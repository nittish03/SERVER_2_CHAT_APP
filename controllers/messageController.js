import Conversation from "../models/conversationModel.js"
import Message from "../models/messageModel.js"

//controller for sending and receiving the messages

export const sendMessage = async  (req,res) => {
 
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{
                $all:[senderId,receiverId]
            },            
        })
        
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
             
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        };

        // await conversation.save();
        // await newMessage.save();
        


        //socket io funcationality will go here


        //this will run in parallel so code optimization
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage)

    } catch (error) {
        res.status(500).json({error:"internal server error"});
    }


}

export const getMessages = async(req,res)=>{
    try {
        
        const {id:userToChatId} = req.params;
        const senderId = req.user._id; 

        const conversation = await Conversation.findOne({
            participants:{
                $all:[senderId,userToChatId]
            },
        }).populate("messages"); //not reference but actual messages

        if(!conversation){
            return res.status(200).json([]);
            const messages = conversation.messages;
        }

        res.status(200).json(conversation.messages);


        
    } catch (error) {
        console.log("error in get messages controller ", error.message);
        res.status(500).json({error:"internal server error"});
    }
}