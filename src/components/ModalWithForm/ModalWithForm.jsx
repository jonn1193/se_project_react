import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  isOpen,
  onClose,
}) {
  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" name={name}>
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
