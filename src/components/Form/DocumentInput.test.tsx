import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import DocumentInput from './DocumentInput';
import { ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.FileReader = class {
  readAsArrayBuffer() {
    if (this.onload) {
      this.onload({ target: { result: 'fake array buffer' } });
    }
  }
  readAsText() {
    if (this.onload) {
      this.onload({ target: { result: 'fake text content' } });
    }
  }
  onload = null;
};

jest.mock('mammoth', () => ({
  default: {
    extractRawText: jest.fn().mockResolvedValue({ value: 'fake docx content' }),
  },
}));

jest.mock('pdfjs-dist', () => {
  return {
    getDocument: jest.fn(() => ({
      promise: Promise.resolve({
        numPages: 1,
        getPage: jest.fn(() => ({
          getTextContent: jest.fn(() =>
            Promise.resolve({
              items: [{ str: 'fake pdf content' }],
            })
          ),
        })),
      }),
    })),
    GlobalWorkerOptions: { workerSrc: '' },
  };
});

let methods;
describe('<DocumentInput />', () => {
  function Wrapper({ children }: { children: ReactNode | ReactNode[] }) {
    methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  }

  it('renders the label and input fields correctly', () => {
    render(
      <Wrapper>
        <DocumentInput
          label="Document"
          fieldName="document"
          placeholder="Insert your document"
        />
      </Wrapper>
    );

    expect(screen.getByLabelText(/Document:/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Insert your document/i)
    ).toBeInTheDocument();
  });

  const fireFileChange = (fileName, fileContent) => {
    const input = screen.getByLabelText(/Document:/i);
    const file = new File([fileContent], fileName);
    fireEvent.change(input, { target: { files: [file] } });
  };

  it('handles .docx file upload', async () => {
    render(
      <Wrapper>
        <DocumentInput
          label="Document"
          fieldName="document"
          placeholder="Insert your document"
        />
      </Wrapper>
    );

    fireFileChange('sample.docx', 'fake content');

    const textarea = await screen.findByPlaceholderText('Insert your document');
    expect(textarea.value).toBe('fake docx content');
  });

  it('handles .pdf file upload', async () => {
    render(
      <Wrapper>
        <DocumentInput
          label="Document"
          fieldName="document"
          placeholder="Insert your document"
        />
      </Wrapper>
    );

    fireFileChange('sample.pdf', 'fake content');

    const textarea = await screen.findByPlaceholderText('Insert your document');
    expect(textarea.value).toBe('fake pdf content' + '\n');
  });
  it('handles .txt file upload', async () => {
    render(
      <Wrapper>
        <DocumentInput
          label="Document"
          fieldName="document"
          placeholder="Insert your document"
        />
      </Wrapper>
    );

    fireFileChange('sample.txt', 'fake content');

    const textarea = await screen.findByPlaceholderText('Insert your document');
    expect(textarea.value).toBe('fake text content');
  });
  it('displays an error when the field is empty and the form is triggered', async () => {
    render(
      <Wrapper>
        <DocumentInput
          label="Document"
          fieldName="document"
          placeholder="Insert your document"
        />
      </Wrapper>
    );

    await methods.trigger();

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Either upload or paste your Document above'
    );
  });
});
