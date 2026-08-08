import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const initialValues = {
  email: "",
  password: "",
};

function LoginModal({ isOpen, onCloseModal, onLogin, onRegisterClick }) {
  const { values, handleChange, resetForm } = useForm(initialValues);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(values, resetForm);
  };

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      buttonText="Log in"
      secondaryButtonText="or Sign Up"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      onSecondaryButtonClick={onRegisterClick}
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
    </ModalWithForm>
  );
}

export default LoginModal;
