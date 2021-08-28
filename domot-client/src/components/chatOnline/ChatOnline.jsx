import React, { useState, useEffect } from 'react'
import "./chatOnline.css";
import axios from "axios"
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
       const getFriends = async ()=> {
           const res =  await axios.get("/users/friends/" + currentId, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
           setFriends(res.data);
       };
       getFriends();
    }, [currentId]);

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers])

    const handleClick = async (user) => {
        try{
            const res = await axios.get(`/conversations/find/${currentId}/${user._id}`, {
                headers: {
                  token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                },
              });
            setCurrentChat(res.data);
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="chatOnline">
            {onlineFriends.map((online) => (
                 <div className="chatOnlineFriend" onClick={()=>handleClick(online)}>
                 <div className="chatOnlineImgContainer">
                     <img className="chatOnlineImg" src={online?.profilePicture ? PF+ online.profilePicture : PF+"profile/avatar.png"} alt="" />
                     <div className="chatOnlineBadge">
 
                     </div>
                 </div>
                 <span className="chatOnlineName">{online?.username}</span>
             </div>
            ))}
           
            
            
        </div>
    )
}
