import "./online.css";
import { VerifiedUserOutlined, VerifiedUserRounded } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Online({ user, key }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [follow, setFollow] = useState(
    !user?.followers.includes(currentUser?.userId)
  );

  const handleClick = async () => {
    try {
      await axios.put(`/users/${user?._id}/follow`, {
        userId: currentUser?._id,
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
    } catch (err) {}
    setFollow(!follow);
  };
  const handleUnfollow = async () => {
    try {
      await axios.put(`/users/${user?._id}/unfollow`, {
        userId: currentUser?._id,
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
    } catch (err) {}
    setFollow((follow) => !follow);
  };

  // const handleClick = async () => {

  //   try {
  //     if (followed) {
  //       await axios.put(`/users/${user?._id}/unfollow`, {
  //         userId: currentUser?._id,
  //         headers: {
  //           token:
  //             "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
  //         },
  //       });
  //       dispatch({ type: "UNFOLLOW", payload: user._id });
  //     } else {
  //       await axios.put(`/users/${user?._id}/follow`, {
  //         userId: currentUser?._id,

  //         headers: {
  //           token:
  //             "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
  //         },
  //       });
  //       dispatch({ type: "FOLLOW", payload: user._id });
  //     }
  //     setFollowed((followed) => !followed);
  //   } catch (err) {}
  // };

  return (
    <div className="rightbarFriend" key={key}>
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + "profile/avatar.png"
          }
          alt=""
        />
        <span className="rightbarOnline"></span>
      </div>
      <div className="rightbarUserInfomation">
        <li className="rightbarUsername">
          {user.username}
          <button className="verify">v</button>
        </li>
        <li className="rightbarUserdesc">User Nearby</li>
        <li className="rightbarUserdesc">{user.followers.length} followers</li>
        <span>
          {follow ? (
            <button className="rightbarFollowButton" onClick={handleClick}>
              follow <Add />
            </button>
          ) : (
            <button className="rightbarFollowButton" onClick={handleUnfollow}>
              Unfollow <Remove />
            </button>
          )}
        </span>
      </div>
    </div>
  );
}
