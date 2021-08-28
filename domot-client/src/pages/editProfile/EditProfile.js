import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import FindUsers from "../../components/findUsers/FindUsers";
import "./editProfile.css"

export default function EditProfile() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        {/* <Sidebar /> */}
        <FindUsers />
      </div>
    </>
  );
}

