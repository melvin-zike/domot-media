import "./post.css";
import { useContext, useEffect, useState} from "react";
import { MoreVert, Chat, } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import  Comments from "../comments/Comments"
import  Commentry from "../commentry/Commentry"

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [text, setText] = useState([])
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id }, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
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
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          
            
            <span className="postLikeCounter">{like}likes</span>
            
            {/* <span className="postLikeCounter">{post.credit.length}money</span> */}
           
            <span className="postCommentText">{post.comments.length} comments</span>
 
        </div>
        <div className="commentBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}/posts/like.jpg`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter"></span>
            
          </div>
          <div className="postBottomRight">
            <span className="postCommentText"><Chat className="commentIcon" /></span>
          </div>
          
        </div>
        <div className="hLine">
        </div>
        <p>{post.comments.map((c) => (
              <Comments comments={c} />
            ))}</p>
        <Commentry sender={currentUser} actualPost={post} user={user}/>
      </div>
      
    </div>
  );
}