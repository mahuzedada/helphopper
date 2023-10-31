import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function useCheckFormAndSubmit(submit) {
  const { getValues } = useFormContext();
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    const formData = getValues();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.resumeText ||
      !formData.jdText
    ) {
      setIsFormValid(false);
    } else {
      submit(formData);
      if (!isFormValid) {
        setIsFormValid(true);
      }
    }
  }, []);

  return isFormValid;
}