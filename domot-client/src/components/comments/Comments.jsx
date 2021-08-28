import {useState, useEffect } from 'react';
import "./comments.css";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default function Comments({comments}) {
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`/users?userId=${comments.userId}`);
          setUser(res.data);
        };
        fetchUser();
      }, [comments.userId]);

    return (
        <>
        <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "profile/avatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{comments.text}</span>
          </div>
        
       

        </>
    )
}
