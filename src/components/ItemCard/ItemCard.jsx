import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, isLoggedIn, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const imageSrc = item.link || item.imageUrl;
  const isLiked = item.likes?.some((id) => id === currentUser?._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    onCardLike(item);
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label={isLiked ? "Unlike item" : "Like item"}
            onClick={handleLikeClick}
          />
        )}
      </div>
      <button className="card__button" type="button" onClick={handleCardClick}>
        <img className="card__image" src={imageSrc} alt={item.name} />
      </button>
    </li>
  );
}

export default ItemCard;
