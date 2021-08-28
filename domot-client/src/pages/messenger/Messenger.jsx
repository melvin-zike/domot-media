import {useContext, useEffect, useState, useRef } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import Topbar from "../../components/topbar/Topbar";
import "./messenger.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import {io} from "socket.io-client";

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const {user} = useContext(AuthContext);
    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data => {
          setArrivalMessage({
              sender: data.senderId,
              text: data.text,
              createdAt: Date.now(),
          })
        }) 
    }, []);

    //update messages
    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    //add, get users and set online users
    useEffect(() => {  
       socket.current.emit("addUser", user._id);
       socket.current.on("getUsers", (users) => {
        setOnlineUsers(user.followings.filter(f=>users.some(u=>u.userId === f)));
       });
    }, [user]);

    useEffect(() => {
      const getConversations = async () => {
          try{
            const res = await axios.get('/conversations/'+user._id, {
                headers: {
                  token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                },
              });
            setConversations(res.data);
          }catch(err){
              console.log(err);
          }
      }  
      getConversations();
    }, [user._id])

  useEffect(() => {
     const getMessages = async () => {
         try{
            const res = await axios.get("/messages/"+currentChat?._id, {
                headers: {
                  token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                },
              });
            setMessages(res.data)
         }catch(err){
             console.log(err)
         }
        
     }
     getMessages();
  }, [currentChat])
  
  const handleSubmit= async(e)=> {
      e.preventDefault();
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,  
      }; 

      const receiverId = currentChat.members.find(member=> member !==user._id)

      socket.current.emit("sendMessage", {
          senderId: user._id,
          receiverId,
          text: newMessage,
      })
      try{
        const res = await axios.post('/messages', message, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
        setMessages([...messages, res.data]);
        setNewMessage("");
      }catch(err){
          console.log(err);
      }
  };

  //scroll on message
  useEffect(() => {
   scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

    return (
        <>
          <Topbar />
          <div className="messenger">
              <div className="chatMenu">
                  <div className="chatMenuWrapper">
                      <input type="text" placeholder="Search for friends" className="chatMenuInput" />
                     {conversations.map((c) => (
                         <div onClick={() => setCurrentChat(c)}>                   
                         <Conversation conversation={c} currentUser={user} />
                         </div>
                     ))} 
                  </div>
              </div>
              <div className="chatBox">
                  <div className="chatBoxWrapper">
                      {currentChat ? 
                      <>
                      <div className="chatBoxTop">
                          {messages.map((m)=>(
                              <div ref={scrollRef}>
                                 <Message message={m} own={m.sender === user._id} />
                              </div>
                               
                                
                          ))}
                      </div>
                      <div className="chatBoxBottom">
                          <textarea 
                          placeholder="write something..." 
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="chatMessageInput"></textarea>
                          <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                      </div></> : <span className="noConversationText">Open a conversation to start a chat</span>}
                  </div>
              </div>
              <div className="chatOnline">
                  <div className="chatOnlineWrapper">
                    <ChatOnline 
                    onlineUsers ={onlineUsers}
                    currentId={user._id}
                    setCurrentChat={setCurrentChat}
                    />
                  </div>
              </div>
          </div>  
        </>
    );
}
