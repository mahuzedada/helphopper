import { Link } from 'react-router-dom';

interface Props {
  title: string;
}
export default function InvalidFormNotice({ title }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 text-center">
        <div className="mb-4">
          <svg
            className="w-16 h-16 mx-auto text-yellow-500 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M6.343 19.343a7.963 7.963 0 0011.314 0M5 12h3m4 0h4m4 0h3M4 12l.343-.343a7.963 7.963 0 0111.314 0M12 6v4m0 2v4"
            />
          </svg>
          <h2 className="text-xl font-semibold">Missing Information</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Oops! To view your {title}, you'll need to fill out the required form
          first.
        </p>
        <Link to="/form">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Go To Form
          </button>
        </Link>
      </div>
    </div>
  );
}
