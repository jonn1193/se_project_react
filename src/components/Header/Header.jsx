import "./Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";

function Header({ weatherData, onAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="WTWR" />
      <p className="header__meta">
        <span className="header__date">{currentDate}, </span>
        <span className="header__location">{weatherData.city}</span>
      </p>
      <button
        className="header__add-clothes-btn"
        type="button"
        onClick={onAddClick}
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Jon Nicdao</p>
        <img src={avatar} alt="JC" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
