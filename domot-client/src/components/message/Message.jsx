import React from 'react'
import "./message.css";
import {format} from "timeago.js";

export default function Message({message, own}) {
    
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1t-TPqm32al4nMMYqIYR4xKtX3r6Vhe9Pyc4b3G6DsfAHsP5Uc60qojuuuwh7llK_9r8&usqp=CAU" alt=""  />
                <p className="messageText">
                   {message.text}
                    </p>
            </div>
            <div className="messageBottom">
            {format(message.createdAt)}
            </div>
            
        </div>
    )
}
