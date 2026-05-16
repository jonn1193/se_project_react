import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <button className="card__button" type="button" onClick={handleCardClick}>
        <div className="card__header">
          <h2 className="card__name">{item.name}</h2>
          <span className="card__like" aria-label="Like" />
        </div>
        <img className="card__image" src={item.link} alt={item.name} />
      </button>
    </li>
  );
}

export default ItemCard;
