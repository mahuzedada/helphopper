import PDFJS from 'pdfjs-dist';
import { FC, useState } from 'react';

// const PDFJS: any = {};

interface DocumentInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const DocumentInput: FC<DocumentInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  const [file, setFile] = useState(null);
  const [textContent, setTextContent] = useState('');

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleExtractText = async () => {
    const pdf = await PDFJS.getDocument(file);
    const numPages = await pdf.getNumPages();

    let textContent = '';
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const text = await page.getTextContent();

      textContent += text.items.map((item) => item.str).join(' ');
    }

    setTextContent(textContent);
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">{label}</label>
      <textarea
        className="w-full px-3 py-2 border rounded-md"
        rows={4}
        placeholder={placeholder}
        value={textContent}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
      <div className="mt-2">
        <input type="file" onChange={handleOnChange} />
        <button onClick={handleExtractText}>Extract Text</button>
      </div>
    </div>
  );
};

export default DocumentInput;
