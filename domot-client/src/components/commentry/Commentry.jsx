import {useRef} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./commentry.css"

export default function Commentry({sender, actualPost, user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const text = useRef();

  const handleComment = (e) => {
    e.preventDefault()
    if(text.current.value === ""){
        console.log("Fill something on")
    }else{
      const comment = {
        text: text.current.value,
        userId: sender._id,
      }
    try {
      axios.put("/posts/" + actualPost._id + "/comments", comment, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
};


    return (
        
            <div className="commentInput">
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
            <span className="postInput"> 
            <input
            required
            type="text"
            placeholder="Comment On this post"
            className="" 
            ref={text}
             />
            </span>
            <span className="postbtn"><button onClick ={handleComment}>post</button></span>
        </div>
    )
}
