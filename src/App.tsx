import './App.css';
import { FormProvider, useForm } from 'react-hook-form';
import CandidateAndJobDetails from './components/CandidateAndJobDetails';
import CoverLetter from './components/CoverLetter';
import SkillGapAnalysis from './components/SkillGapAnalysis';

function App() {
  const form = useForm();

  return (
    <>
      <FormProvider {...form}>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">HelpHopper</h1>
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <CandidateAndJobDetails />
            <SkillGapAnalysis />
            <CoverLetter />
          </div>
        </div>
      </FormProvider>
    </>
  );
}

export default App;
