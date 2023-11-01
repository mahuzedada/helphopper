/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFormContext } from 'react-hook-form';
import mammoth from 'mammoth';
import InputProps from './InputProps';
import * as pdfjsLib from 'pdfjs-dist';

// @ts-ignore
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'node_modules/pdfjs-dist/build/pdf.worker.js';

export default function DocumentInput({
  label,
  fieldName,
  placeholder,
}: InputProps) {
  const {
    register,
    formState: { errors },
    trigger,
    resetField,
  } = useFormContext();
  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      if (file.name.endsWith('.docx')) {
        reader.onload = async (loadEvent) => {
          const arrayBuffer = loadEvent.target.result;
          // @ts-ignore
          const result = await mammoth.extractRawText({
            arrayBuffer: arrayBuffer!,
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
            text += content.items.map((item) => item.str!).join(' ') + '\n';
          }
          resetField(fieldName, { defaultValue: text });
        };
        reader.readAsArrayBuffer(file);
      } else if (file.name.endsWith('.txt')) {
        reader.onload = (loadEvent) => {
          const text = loadEvent.target!.result;
          resetField(fieldName, { defaultValue: text });
        };
        reader.readAsText(file);
      }
      trigger(fieldName).then();
    }
  };
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold" htmlFor={`${label}-fileInput`}>
        {label}:
      </label>
      <input
        id={`${label}-fileInput`}
        type="file"
        accept=".pdf, .doc, .docx, .txt"
        onChange={handleFileChange}
      />
      <textarea
        className="w-full px-3 py-2 border rounded-md"
        rows={4}
        placeholder={placeholder}
        {...register(fieldName, { required: true })}
      ></textarea>
      {errors[fieldName] && (
        <p className="text-red-600" role="alert">
          Either upload or paste your {label} above{' '}
        </p>
      )}
    </div>
  );
}
