import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import Form from './index';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}));

describe('<Index />', () => {
  const Wrapper = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  beforeEach(() => {
    render(
      <Wrapper>
        <Form />
      </Wrapper>
    );
  });

  it('renders text inputs and document inputs', () => {
    expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Resume:')).toBeInTheDocument();
    expect(screen.getByLabelText('Job Description:')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your resume here')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your job description here')
    ).toBeInTheDocument();
  });

  it('shows error messages when button is clicked with empty form', async () => {
    fireEvent.click(screen.getByText('Generate Skill Gap'));

    const errorMessages = await screen.findAllByRole('alert');

    expect(errorMessages.length).toBe(4);
  });

  it('should call useNavigate when form is valid and button is clicked', async () => {
    const mockNavigate = require('react-router-dom').useNavigate();
    fireEvent.change(screen.getByLabelText('First Name:'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText('Last Name:'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your resume here'), {
      target: { value: 'Sample Resume Content' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('Enter your job description here'),
      {
        target: { value: 'Sample Job Description' },
      }
    );

    fireEvent.click(screen.getByText('Generate Skill Gap'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/skill-gap-analysis');
    });
  });
});
