import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../context/AuthActions";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // const logOut = () => {
  //   localStorage.removeItem('user');
  //   window.location.reload();
  // }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Cappa </span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink" onClick={() => dispatch(logout())}>
            Logout
          </span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem person">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>

          <Link to="/messenger" className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </Link>
          <div className="topbarIconItem notif">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <div className="topbarImgDiv">
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "profile/avatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
          <span className="topbarUserName">{user.username}</span>
        </div>
      </div>
    </div>
  );
}
