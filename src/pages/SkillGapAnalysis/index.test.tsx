import React from 'react';
import { render, screen, act } from '@testing-library/react';
import SkillGapAnalysis from './index';

jest.mock('../../api', () => ({
  generateSkillGapAnalysis: jest.fn(),
}));

jest.mock('../../hooks/useCheckFormAndSubmit', () => ({
  default: jest.fn(),
}));

jest.mock('./ProfileComponent', () => ({
  default: () => <div>ProfileComponent</div>,
}));
jest.mock('../../components/InvalidFormNotice', () => ({
  default: () => <div>InvalidFormNotice</div>,
}));

describe('<SkillGapAnalysis />', () => {
  const mockGenerateSkillGapAnalysis = jest.fn();
  const mockUseCheckFormAndSubmit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows placeholder when isFormValid is true but no generated content', async () => {
    mockUseCheckFormAndSubmit.default.mockReturnValue(true);

    render(<SkillGapAnalysis />);

    expect(
      screen.getByText('Your skill gap analysis will appear here.')
    ).toBeInTheDocument();
  });

  it('renders ProfileComponent when isFormValid is true and there is generated content', async () => {
    mockUseCheckFormAndSubmit.default.mockImplementation((fn) => {
      fn();
      return true;
    });
    mockGenerateSkillGapAnalysis.mockResolvedValue('Generated Content');

    await act(async () => {
      render(<SkillGapAnalysis />);
    });

    expect(await screen.findByText('ProfileComponent')).toBeInTheDocument();
  });

  it('renders InvalidFormNotice when isFormValid is false', () => {
    mockUseCheckFormAndSubmit.default.mockReturnValue(false);

    render(<SkillGapAnalysis />);

    expect(screen.getByText('InvalidFormNotice')).toBeInTheDocument();
  });
});
