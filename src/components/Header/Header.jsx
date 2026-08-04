import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  weatherData,
  isLoggedIn,
  onAddClick,
  onLoginClick,
  onRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const userInitial = currentUser?.name?.charAt(0).toUpperCase() || "?";

  return (
    <header className="header">
      <Link className="header__logo-link" to="/">
        <img className="header__logo" src={logo} alt="WTWR" />
      </Link>
      <p className="header__meta">
        <span className="header__date">{currentDate}, </span>
        <span className="header__location">{weatherData.city}</span>
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            className="header__add-clothes-btn"
            type="button"
            onClick={onAddClick}
          >
            + Add clothes
          </button>
          <Link className="header__user-container" to="/profile">
            <p className="header__username">{currentUser?.name}</p>
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">{userInitial}</div>
            )}
          </Link>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button
            className="header__auth-button"
            type="button"
            onClick={onRegisterClick}
          >
            Sign up
          </button>
          <button
            className="header__auth-button"
            type="button"
            onClick={onLoginClick}
          >
            Log in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
