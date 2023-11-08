import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import localStorageKey from '../constants/localStorageKey';

export default function useFormInit() {
  const { reset } = useFormContext();
  useEffect(() => {
    const savedFormData = localStorage.getItem(localStorageKey);
    if (savedFormData) {
      reset(JSON.parse(savedFormData));
    }
  }, [reset]);
}
