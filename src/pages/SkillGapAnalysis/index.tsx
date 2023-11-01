import { useState } from 'react';
import { generateSkillGapAnalysis } from '../../api';
import ProfileComponent from './ProfileComponent';
import InvalidFormNotice from '../../components/InvalidFormNotice';
import useCheckFormAndSubmit from '../../hooks/useCheckFormAndSubmit';

export default function SkillGapAnalysis() {
  const [generatedContent, setGeneratedContent] = useState('');

  const submit = (data) => {
    generateSkillGapAnalysis(data).then(setGeneratedContent);
  };
  const isFormValid = useCheckFormAndSubmit(submit);

  return (
    <>
      {isFormValid ? (
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
        </div>
      ) : (
        <InvalidFormNotice title="Skill Gap Analysis" />
      )}
    </>
  );
}
