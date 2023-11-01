import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  });

  it('should render the app name', () => {
    const appNames = screen.getAllByText(/HelpHopper/i);
    expect(appNames[0]).toBeInTheDocument();
    expect(appNames[1]).toBeInTheDocument();
  });

  it('should render all the links for desktop/tablet view', () => {
    expect(screen.getByText(/Form/i)).toBeInTheDocument();
    expect(screen.getByText(/Skill Gap Analysis/i)).toBeInTheDocument();
    expect(screen.getByText(/Cover Letter/i)).toBeInTheDocument();
  });

  it('should toggle mobile menu on button click', async () => {
    fireEvent.click(screen.getByRole('button'));

    const formLinks = await screen.findAllByText(/Form/i);
    expect(formLinks[0]).toBeInTheDocument();
    expect(formLinks[1]).toBeInTheDocument();

    const skillGapAnalysisLinks =
      await screen.findAllByText(/Skill Gap Analysis/i);
    expect(skillGapAnalysisLinks[0]).toBeInTheDocument();
    expect(skillGapAnalysisLinks[1]).toBeInTheDocument();

    const coverLetterLinks = await screen.findAllByText(/Cover Letter/i);
    expect(coverLetterLinks[0]).toBeInTheDocument();
    expect(coverLetterLinks[1]).toBeInTheDocument();
  });
});
