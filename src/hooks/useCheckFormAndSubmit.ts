import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function useCheckFormAndSubmit(
  generatedContent: any,
  submit: any
) {
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
    } else if (!generatedContent) {
      submit(formData);
    }
  }, [submit, getValues, generatedContent]);

  return isFormValid;
}
