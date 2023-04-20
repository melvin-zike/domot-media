import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import Cb from "../cb/Cb";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [randomusers, setRandomUsers] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [followed, setFollowed] = useState(
    currentUser?.followings.includes(currentUser?.userId)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          "/users/friends/" + currentUser?._id,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  //Get Random Users
  useEffect(() => {
    const getRandomUsers = async () => {
      try {
        const userList = await axios.get("/users/all", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setRandomUsers(userList.data);
        console.log(randomusers);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomUsers();
  }, [user]);

  console.log(friends);
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/posts/birthday.jpg" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/posts/post-3.jpg" alt="" />
        <h4 className="rightbarTitle">Recommended For You</h4>
        <ul className="rightbarFriendList">
          {randomusers.map((u) => (
            <Online key={u._id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username ? (
          ""
        ) : (
          <Cb creditOwner={currentUser} />
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Balance:</span>
            <span className="rightbarInfoValuecash">NGN8500</span>
            <span className="rightbarInfoValue">
              <button className="delete">Reharge</button>
            </span>
            <span className="rightbarInfoValue">
              <button className="withdraw">Withdraw</button>
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "profile/avatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
