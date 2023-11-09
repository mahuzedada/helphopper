import { useFormContext } from 'react-hook-form';
import useSubmit from '../hooks/useSubmit';
import { coverLetterPath } from '../constants/api';
import useFormInit from '../hooks/useFormInit';
import PageContainer from '../components/PageContainer';
import ErrorNotice from '../components/ErrorNotice';
import Loader from '../components/Loader';
import TextInput from '../components/Form/TextInput';
import DocumentInput from '../components/Form/DocumentInput';
import {
  firstName,
  jobDescription,
  lastName,
  resume,
  tone,
} from '../constants/fieldNames';
import { Link } from 'react-router-dom';

export default function CoverLetter() {
  const title = 'Cover Letter';
  const { handleSubmit, register } = useFormContext();
  const { submit, error, resetPage, isLoading, generatedContent } =
    useSubmit<string>(coverLetterPath);
  useFormInit();

  if (isLoading) {
    return (
      <PageContainer>
        <Loader title={title} />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorNotice message={error.message} retryFn={resetPage} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="text-2xl text-center font-bold mb-4">{title}</h1>
      <div className="flex flex-wrap -mx-2 mb-4">
        <TextInput
          label="First Name"
          fieldName={firstName}
          placeholder="Enter first name"
        />
        <TextInput
          label="Last Name"
          fieldName={lastName}
          placeholder="Enter last name"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold">Cover letter's Tone:</label>
        <select
          className="w-full px-3 py-2 border rounded-md"
          {...register(tone, { required: true })}
        >
          <option value="Formal">Formal</option>
          <option value="Enthusiastic">Enthusiastic</option>
          <option value="Friendly">Friendly</option>
        </select>
      </div>
      <DocumentInput
        label="Resume"
        fieldName={resume}
        placeholder="Enter your resume here"
      />
      <DocumentInput
        label="Job Description"
        fieldName={jobDescription}
        placeholder="Enter your job description here"
      />
      {generatedContent ? (
        <>
          <h1 className="text-2xl font-bold">Cover Letter</h1>
          <textarea
            className="w-full min-h-96 px-3 py-2 border rounded-md"
            rows={10}
            readOnly
            value={generatedContent}
          ></textarea>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handleSubmit(submit)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Regenerate {title}
            </button>
            <Link to="/skill-gap-analysis">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
                Go to Skill Gap Analysis
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={handleSubmit(submit)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Generate {title}
          </button>
        </div>
      )}
    </PageContainer>
  );
}
