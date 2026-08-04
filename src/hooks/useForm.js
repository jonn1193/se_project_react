import { useCallback, useState } from "react";

export function useForm(inputValues = {}) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const resetForm = useCallback(
    (newValues = inputValues) => {
      setValues(newValues);
    },
    [inputValues],
  );

  return { values, handleChange, resetForm };
}
