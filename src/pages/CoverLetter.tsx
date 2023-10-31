import { useState } from 'react';
import { generateCoverLetter } from '../api';
import { useFormContext } from 'react-hook-form';

function CoverLetter() {
  const { handleSubmit, register } = useFormContext();
  const [generatedContent, setGeneratedContent] = useState('');

  const onSubmit = (data) => {
    generateCoverLetter(data).then(setGeneratedContent);
  };

  return (
    <>
      <div className="flex flex-col h-full justify-around p-4">
        <div className="mb-4">
          <label className="block mb-2 font-bold">Cover letter's Tone:</label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            defaultValue="Formal"
            {...register('tone', { required: true })}
          >
            <option value="Formal">Formal</option>
            <option value="Enthusiastic">Enthusiastic</option>
            <option value="Friendly">Friendly</option>
          </select>
        </div>

        <div className="flex-1 bg-white p-4 mb-4 overflow-auto">
          {generatedContent ? (
            <textarea
              className="w-full h-full px-3 py-2 border rounded-md"
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

        <button
          className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          onClick={handleSubmit(onSubmit)}
        >
          Generate Cover Letter
        </button>
      </div>
    </>
  );
}

export default CoverLetter;
