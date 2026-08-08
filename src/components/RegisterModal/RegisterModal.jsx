import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const initialValues = {
  name: "",
  avatar: "",
  email: "",
  password: "",
};

function RegisterModal({ isOpen, onCloseModal, onRegister, onLoginClick }) {
  const { values, handleChange, resetForm } = useForm(initialValues);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(values, resetForm);
  };

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      buttonText="Sign up"
      secondaryButtonText="or Log In"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      onSecondaryButtonClick={onLoginClick}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>
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
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
