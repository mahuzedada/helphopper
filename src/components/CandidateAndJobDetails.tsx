/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFormContext } from 'react-hook-form';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// @ts-ignore
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'node_modules/pdfjs-dist/build/pdf.worker.js';

function CandidateAndJobDetails() {
  const {
    register,
    formState: { errors },
    trigger,
    resetField,
  } = useFormContext();

  const handleFileChange = async (e, fieldName: string) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      if (file.name.endsWith('.docx')) {
        reader.onload = async (loadEvent) => {
          const arrayBuffer = loadEvent.target.result;
          // @ts-ignore
          const result = await mammoth.extractRawText({
            arrayBuffer: arrayBuffer,
          });
          resetField(fieldName, { defaultValue: result.value });
        };

        reader.readAsArrayBuffer(file);
      } else if (file.name.endsWith('.pdf')) {
        reader.onload = async (loadEvent) => {
          // @ts-ignore
          const data = new Uint8Array(loadEvent.target.result);
          // @ts-ignore
          const pdf = await pdfjsLib.getDocument(data).promise;
          let text = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item) => item.str).join(' ') + '\n';
          }
          resetField(fieldName, { defaultValue: text });
        };
        reader.readAsArrayBuffer(file);
      } else if (file.name.endsWith('.txt')) {
        reader.onload = (loadEvent) => {
          const text = loadEvent.target.result;
          resetField(fieldName, { defaultValue: text });
        };
        reader.readAsText(file);
      }
      trigger(fieldName).then();
    }
  };
  return (
    <div className="md:w-1/2 p-6">
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-1/2 px-2">
          <label className="block mb-2 font-bold">First Name:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter first name"
            {...register('firstName', { required: true })}
          />
          {errors.firstName?.type === 'required' && (
            <p className="text-red-600" role="alert">
              First name is required
            </p>
          )}
        </div>
        <div className="w-1/2 px-2">
          <label className="block mb-2 font-bold">Last Name:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter last name"
            {...register('lastName', { required: true })}
          />
          {errors.lastName?.type === 'required' && (
            <p className="text-red-600" role="alert">
              Last name is required
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold">Resume:</label>
        <input
          type="file"
          accept=".pdf, .doc, .docx, .txt"
          onChange={(e) => handleFileChange(e, 'resumeText')}
        />
        <textarea
          className="w-full px-3 py-2 border rounded-md"
          rows="4"
          placeholder="Enter your resume"
          {...register('resumeText', { required: true })}
        ></textarea>
        {errors.resumeText && (
          <p className="text-red-600" role="alert">
            Either upload or paste your resume above{' '}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold">Job Description:</label>
        <input
          type="file"
          accept=".pdf, .doc, .docx, .txt"
          onChange={(e) => handleFileChange(e, 'jdText')}
        />
        <textarea
          className="w-full px-3 py-2 border rounded-md"
          rows="4"
          placeholder="Enter the job description"
          {...register('jdText', { required: true })}
        ></textarea>
        {errors.jdText && (
          <p className="text-red-600" role="alert">
            Either upload or paste the Job Description above{' '}
          </p>
        )}
      </div>
    </div>
  );
}

export default CandidateAndJobDetails;
