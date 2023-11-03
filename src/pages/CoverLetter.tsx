import { useCallback, useState } from 'react';
import { generateCoverLetter } from '../api';
import useCheckFormAndSubmit from '../hooks/useCheckFormAndSubmit';
import InvalidFormNotice from '../components/InvalidFormNotice';
import localStorageKey from '../constants/localStorageKey';

export default function CoverLetter() {
  const [generatedContent, setGeneratedContent] = useState('');

  const submit = useCallback((data) => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
    generateCoverLetter({ ...data, tone: 'Formal' }).then(setGeneratedContent);
  }, []);

  const isFormValid = useCheckFormAndSubmit(submit);

  return (
    <>
      {isFormValid ? (
        <div className="min-h-screen max-w-xl m-auto flex flex-col justify-center items-center p-16">
          <div className="mb-4">
            <label className="block mb-2 font-bold">Cover letter's Tone:</label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              defaultValue="Formal"
            >
              <option value="Formal">Formal</option>
              <option value="Enthusiastic">Enthusiastic</option>
              <option value="Friendly">Friendly</option>
            </select>
          </div>

          <div className="w-full flex-1 bg-white p-4 mb-4 overflow-auto">
            {generatedContent ? (
              <textarea
                className="w-full min-h-96 px-3 py-2 border rounded-md"
                rows="10"
                readOnly
                value={generatedContent}
              ></textarea>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Your generated cover letter will appear here.
              </div>
            )}
          </div>
        </div>
      ) : (
        <InvalidFormNotice title="Cover Letter" />
      )}
    </>
  );
}
