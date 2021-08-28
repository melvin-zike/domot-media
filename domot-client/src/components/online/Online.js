import "./online.css";
import { VerifiedUserOutlined, VerifiedUserRounded } from "@material-ui/icons";

export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={user.profilePicture ? PF+user.profilePicture : PF + "profile/avatar.png"} alt="" />
        <span className="rightbarOnline"></span>
      </div>
     <div className="rightbarUserInfomation">
     <li className="rightbarUsername">{user.username}<button className="verify">verified</button></li>
     <li className="rightbarUserdesc">Software developer</li>
     <li className="rightbarUserdesc">500 followers</li>
     <span><button className="rightbarFollowButton">Follow <VerifiedUserRounded /></button></span>
     </div>
    </div>
  );
}