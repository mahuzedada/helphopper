import { useCallback, useState } from 'react';
import localStorageKey from '../constants/localStorageKey';
import duplicatedRequestErrorMessage from '../constants/duplicatedRequestErrorMessage';
import post from '../lib/post';

export default function useSubmit<T>(path: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<T | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);

  const submit = useCallback(
    (data: any) => {
      localStorage.setItem(localStorageKey, JSON.stringify(data));
      setIsLoading(true);
      post(path, data)
        .then((data) => {
          setGeneratedContent(data);
          setIsLoading(false);
        })
        .catch((e) => {
          if (e.message !== duplicatedRequestErrorMessage) {
            setError(e);
            setIsLoading(false);
          }
        });
    },
    [path]
  );

  const resetPage = useCallback(() => {
    setError(null);
    setGeneratedContent(null);
    setIsLoading(false);
  }, []);

  return {
    submit,
    resetPage,
    isLoading,
    generatedContent,
    error,
  };
}
