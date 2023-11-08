import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ErrorPage from './error-page';
import SkillGapAnalysis from './pages/SkillGapAnalysis';
import Home from './pages/Home';
import CoverLetter from './pages/CoverLetter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/skill-gap-analysis',
        element: <SkillGapAnalysis />,
      },
      {
        path: '/cover-letter',
        element: <CoverLetter />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
