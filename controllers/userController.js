import User from "../models/userModel.js";

export const getUsersForSidebar = async(req,res) => { 

    //it is to get all the users for the side bar except ourselves

    try{

        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);


    }catch(error){
        console.log("error in getusersforsideBar: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }


}