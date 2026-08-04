import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const initialValues = {
  name: "",
  avatar: "",
};

function EditProfileModal({ isOpen, onCloseModal, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, resetForm } = useForm(initialValues);

  useEffect(() => {
    if (isOpen && currentUser) {
      resetForm({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, isOpen, resetForm]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser(values);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
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

export default EditProfileModal;
