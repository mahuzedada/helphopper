import useCheckFormAndSubmit from './useCheckFormAndSubmit';
import { useFormContext } from 'react-hook-form';
import { renderHook } from '@testing-library/react';

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn(),
}));

describe('useCheckFormAndSubmit', () => {
  let submitFn: jest.Mock;

  beforeEach(() => {
    submitFn = jest.fn();
  });

  it('should mark the form as invalid if some fields are missing', () => {
    (useFormContext as jest.Mock).mockReturnValue({
      getValues: () => ({
        firstName: 'John',
        lastName: 'Doe',
        resumeText: '',
        jdText: '',
      }),
    });

    const { result } = renderHook(() => useCheckFormAndSubmit(submitFn));

    expect(result.current).toBe(false);
  });

  it('should call the submit function and mark the form as valid if all fields are present', () => {
    (useFormContext as jest.Mock).mockReturnValue({
      getValues: () => ({
        firstName: 'John',
        lastName: 'Doe',
        resumeText: 'Sample Resume',
        jdText: 'Job Description',
      }),
    });

    const { result } = renderHook(() => useCheckFormAndSubmit(submitFn));

    expect(submitFn).toBeCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      resumeText: 'Sample Resume',
      jdText: 'Job Description',
    });
    expect(result.current).toBe(true);
  });
});
