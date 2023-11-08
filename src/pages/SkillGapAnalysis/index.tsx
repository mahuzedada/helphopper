import ProfileComponent, { ProfileData } from './ProfileComponent';
import { Link } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { jobDescription, resume } from '../../constants/fieldNames';
import DocumentInput from '../Form/DocumentInput';
import useFormInit from '../../hooks/useFormInit';
import useSubmit from '../../hooks/useSubmit';
import { skillGapAnalysisPath } from '../../constants/api';
import PageContainer from '../../components/PageContainer';
import ErrorNotice from '../../components/ErrorNotice';

export default function SkillGapAnalysis() {
  const { handleSubmit } = useFormContext();
  const { submit, error, resetPage, isLoading, generatedContent } =
    useSubmit<ProfileData>(skillGapAnalysisPath);
  useFormInit();

  if (isLoading) {
    return (
      <PageContainer>
        <Loader title="Skill Gap Analysis" />
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
      <h1 className="text-2xl text-center font-bold mb-4">
        Skill Gap Analysis
      </h1>
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
          <ProfileComponent data={generatedContent} />
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handleSubmit(submit)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Regenerate
            </button>
            <Link to="/cover-letter">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
                Go to Cover Letter
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
            Generate Skill Gap Analysis
          </button>
        </div>
      )}
    </PageContainer>
  );
}
