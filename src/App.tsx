import './App.css';
import { FormProvider, useForm } from 'react-hook-form';
import { Outlet, Link } from 'react-router-dom';

export default function App() {
  const form = useForm();

  return (
    <>
      <div id="sidebar">
        <h1>HelpHopper</h1>
        <nav>
          <ul>
            <li>
              <Link to={``}>Home</Link>
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
          <Outlet />
        </FormProvider>
      </div>
    </>
  );
}
