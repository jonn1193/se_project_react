import avatar from "../../images/avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <aside className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Jon Nicdao" />
      <p className="sidebar__username">Jon Nicdao</p>
    </aside>
  );
}

export default SideBar;
