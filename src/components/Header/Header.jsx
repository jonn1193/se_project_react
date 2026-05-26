import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ weatherData, onAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
      <button
        className="header__add-clothes-btn"
        type="button"
        onClick={onAddClick}
      >
        + Add clothes
      </button>
      <Link className="header__user-container" to="/profile">
        <p className="header__username">Jon Nicdao</p>
        <img src={avatar} alt="JC" className="header__avatar" />
      </Link>
    </header>
  );
}

export default Header;
