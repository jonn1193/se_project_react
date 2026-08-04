import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfileClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const userInitial = currentUser?.name?.charAt(0).toUpperCase() || "?";

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        {currentUser?.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{userInitial}</div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__actions">
        <button
          className="sidebar__button"
          type="button"
          onClick={onEditProfileClick}
        >
          Edit profile
        </button>
        <button className="sidebar__button" type="button" onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
