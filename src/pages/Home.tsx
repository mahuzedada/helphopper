import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div className="min-h-screen mt-16 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Welcome to Helphopper!
        </h1>
        <p className="text-gray-700 mb-4">
          Helphopper boosts your job application process. Here's how to get
          started:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-2">Upload a resume.</li>
          <li className="mb-2">Upload a job description.</li>
          <li className="mb-2">Generate skill gap analysis or cover letter</li>
        </ol>
        <p className="text-gray-700 mb-4">
          Ready to leap forward in your job hunt? Let's get started!
        </p>
        <div className="flex justify-between items-center">
          <Link to="/skill-gap-analysis">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Skill Gap Analysis
            </button>
          </Link>
          <Link to="/cover-letter">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Cover Letter
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
