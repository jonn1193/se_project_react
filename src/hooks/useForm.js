import { useState } from "react";

export function useForm(inputValues = {}) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const resetForm = (newValues = inputValues) => {
    setValues(newValues);
  };

  return { values, handleChange, resetForm };
}
