import './App.css';
import { FormProvider, useForm } from 'react-hook-form';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  const form = useForm();

  return (
    <div className="relative">
      <Navbar />
      <div id="detail" className="mt-16">
        <FormProvider {...form}>
          <Outlet />
        </FormProvider>
      </div>
    </div>
  );
}
