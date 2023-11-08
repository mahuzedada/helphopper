import React from 'react';
import { render, screen, act } from '@testing-library/react';
import CoverLetter from './CoverLetter';

jest.mock('../api', () => ({
  generateCoverLetter: jest.fn(),
}));

jest.mock('../hooks/useCheckFormAndSubmit', () => ({
  default: jest.fn(),
}));

jest.mock('../components/InvalidFormNotice', () => ({
  default: () => <div>InvalidFormNotice</div>,
}));

describe('<CoverLetter />', () => {
  const mockGenerateCoverLetter = jest.fn();
  const mockUseCheckFormAndSubmit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows placeholder when isFormValid is true but no generated content', async () => {
    mockUseCheckFormAndSubmit.default.mockReturnValue(true);

    render(<CoverLetter />);

    expect(
      screen.getByText('Your generated cover letter will appear here.')
    ).toBeInTheDocument();
  });

  it('renders ProfileComponent when isFormValid is true and there is generated content', async () => {
    mockUseCheckFormAndSubmit.default.mockImplementation((fn) => {
      fn();
      return true;
    });
    mockGenerateCoverLetter.mockResolvedValue('Generated Content');

    await act(async () => {
      render(<CoverLetter />);
    });

    expect(await screen.findByText('Generated Content')).toBeInTheDocument();
  });

  it('renders InvalidFormNotice when isFormValid is false', () => {
    mockUseCheckFormAndSubmit.default.mockReturnValue(false);

    render(<CoverLetter />);

    expect(screen.getByText('InvalidFormNotice')).toBeInTheDocument();
  });
});
