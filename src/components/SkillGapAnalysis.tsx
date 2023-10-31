import { useState } from 'react';
import { generateSkillGapAnalysis } from '../api';
import { useFormContext } from 'react-hook-form';
import ProfileComponent from './ProfileComponent';

function SkillGapAnalysis() {
  const { handleSubmit } = useFormContext();
  const [generatedContent, setGeneratedContent] = useState('');

  const onSubmit = (data) => {
    generateSkillGapAnalysis(data).then(setGeneratedContent);
  };

  return (
    <>
      <div className="flex flex-col h-full justify-around">
        <div className="flex-1 bg-white mb-4 overflow-auto">
          {generatedContent ? (
            <ProfileComponent data={generatedContent as unknown as any} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Your skill gap analysis will appear here.
            </div>
          )}
        </div>

        <button
          className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          onClick={handleSubmit(onSubmit)}
        >
          Generate Analysis
        </button>
      </div>
    </>
  );
}

export default SkillGapAnalysis;
