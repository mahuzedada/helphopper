import { useNavigate } from 'react-router-dom';
import DocumentInput from './DocumentInput';
import TextInput from './TextInput';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import localStorageKey from '../../constants/localStorageKey';

export default function Form() {
  const { handleSubmit, reset } = useFormContext();
  const navigate = useNavigate();

  useEffect(() => {
    const savedFormData = localStorage.getItem(localStorageKey);
    if (savedFormData) {
      reset(JSON.parse(savedFormData));
    }
  }, [reset]);

  return (
    <div className="min-h-screen max-w-md m-auto flex flex-col justify-center items-center p-4">
      <div className="flex flex-wrap -mx-2 mb-4">
        <TextInput
          label="First Name"
          fieldName="firstName"
          placeholder="Enter first name"
        />
        <TextInput
          label="Last Name"
          fieldName="lastName"
          placeholder="Enter last name"
        />
      </div>
      <DocumentInput
        label="Resume"
        fieldName="resumeText"
        placeholder="Enter your resume here"
      />
      <DocumentInput
        label="Job Description"
        fieldName="jdText"
        placeholder="Enter your job description here"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit(() => navigate('/skill-gap-analysis'))}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Skill Gap Analysis
        </button>
        <button
          onClick={handleSubmit(() => navigate('/cover-letter'))}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Cover Letter
        </button>
      </div>
    </div>
  );
}
