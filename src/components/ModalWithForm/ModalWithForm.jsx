import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  secondaryButtonText,
  isOpen,
  onClose,
  onSubmit,
  onSecondaryButtonClick,
}) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
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
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <div className="modal__actions">
            <button className="modal__submit" type="submit">
              {buttonText}
            </button>
            {secondaryButtonText && (
              <button
                className="modal__secondary-button"
                type="button"
                onClick={onSecondaryButtonClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
