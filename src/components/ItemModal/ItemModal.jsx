import "./ItemModal.css";

function ItemModal({ card, isOpen, onClose, onCardDelete }) {
  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <div
      className={`modal item-modal ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="item-modal__content">
        <button
          className="item-modal__close"
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        />
        {card && (
          <>
            <img
              className="item-modal__image"
              src={card.link || card.imageUrl}
              alt={card.name}
            />
            <div className="item-modal__footer">
              <div>
                <h2 className="item-modal__title">{card.name}</h2>
                <p className="item-modal__weather">Weather: {card.weather}</p>
              </div>
              <button
                className="item-modal__delete"
                type="button"
                onClick={handleDeleteClick}
              >
                Delete item
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
