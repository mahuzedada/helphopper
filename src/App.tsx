import './App.css';
import { FormProvider, useForm } from 'react-hook-form';
import { Outlet, Link } from 'react-router-dom';

function App() {
  const form = useForm();

  return (
    <>
      <div id="sidebar">
        <h1>HelpHopper</h1>
        <nav>
          <ul>
            <li>
              <Link to={`home`}>Home</Link>
            </li>
            <li>
              <Link to={`form`}>Form</Link>
            </li>
            <li>
              <Link to={`skill-gap-analysis`}>Skill Gap Analysis</Link>
            </li>
            <li>
              <Link to={`cover-letter`}>Cover Letter</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <FormProvider {...form}>
          <div className="min-h-screen bg-gray-100 flex flex-col justify-center p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">HelpHopper</h1>
            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <Outlet />
            </div>
          </div>
        </FormProvider>
      </div>
    </>
  );
}

export default App;
