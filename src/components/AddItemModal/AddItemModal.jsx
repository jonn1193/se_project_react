import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const initialValues = {
  name: "",
  imageUrl: "",
  weather: "",
};

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const { values, handleChange, resetForm } = useForm(initialValues);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItem(values, resetForm);
  };

  return (
    <ModalWithForm
      title="New garment"
      name="add-garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </label>
      <label className="modal__label">
        Image
        <input
          className="modal__input"
          type="url"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
      </label>
      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__radio-label">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          Hot
        </label>
        <label className="modal__radio-label">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>
        <label className="modal__radio-label">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
