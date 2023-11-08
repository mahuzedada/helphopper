import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import TextInput from './TextInput';

let methods;

describe('<TextInput />', () => {
  const Wrapper = ({ children }) => {
    methods = useForm();
    return (
      <FormProvider {...methods}>
        {children}
        <button type="submit" onClick={methods.handleSubmit(() => {})}>
          Submit
        </button>
      </FormProvider>
    );
  };

  it('renders input with given label and placeholder', () => {
    render(
      <Wrapper>
        <TextInput
          label="First Name"
          fieldName="firstName"
          placeholder="John Doe"
        />
      </Wrapper>
    );

    expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
  });

  it('displays error when input is required and not provided', async () => {
    render(
      <Wrapper>
        <TextInput
          label="First Name"
          fieldName="firstName"
          placeholder="John Doe"
        />
      </Wrapper>
    );

    fireEvent.click(screen.getByText('Submit'));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'First Name is required'
    );
  });
});
