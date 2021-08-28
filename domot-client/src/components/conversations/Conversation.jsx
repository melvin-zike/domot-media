import axios from 'axios';
import {useState, useEffect } from 'react'
import "./conversation.css";

export default function Conversation({conversation, currentUser}) {
    const [user, setUser] = useState([]);
    const  PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        
        const getUser = async()=>{
            const friendId = conversation.members.find((m)=>m !== currentUser._id);
            try{
                const res = await axios("/users?userId="+friendId, {
                    headers: {
                      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    },
                  });
                setUser(res.data);
                // console.log(res.data.username)
            }catch(err){
                console.log(err);
            }
            
        };
        getUser();
    }, [currentUser, conversation])
    
    return (
        <div className="conversation">
            <img src={user.profilePicture ? PF + user.profilePicture : PF + "profile/avatar.png"} alt="" className="conversationImg" />
            <span className="conversationName">{user.username}</span>
            
        </div>
    )
}
