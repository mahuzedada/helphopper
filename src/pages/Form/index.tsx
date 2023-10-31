import { Link } from 'react-router-dom';
import DocumentInput from './DocumentInput';
import TextInput from './TextInput';

export default function Index() {
  return (
    <div className="md:w-1/2 p-6">
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
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        <Link to="/skill-gap-analysis">Generate Skill Gap</Link>
      </button>
    </div>
  );
}
