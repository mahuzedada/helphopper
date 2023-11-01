import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('<Home />', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        {' '}
        <Home />
      </MemoryRouter>
    );
  });

  it('renders the welcome message', () => {
    expect(screen.getByText('Welcome to Helphopper!')).toBeInTheDocument();
  });

  it('renders the introduction about Helphopper', () => {
    expect(
      screen.getByText(
        "Helphopper boosts your job application process. Here's how to get started:"
      )
    ).toBeInTheDocument();
  });

  it('renders the steps to get started', () => {
    expect(
      screen.getByText('Upload or enter your resume.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Input the desired job description.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Manually trigger the skill gap analysis.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Receive a tailored cover letter based on your input.')
    ).toBeInTheDocument();
  });

  it('renders the motivational message', () => {
    expect(
      screen.getByText(
        "Ready to leap forward in your job hunt? Let's get started!"
      )
    ).toBeInTheDocument();
  });

  it('renders the Get Started button linking to the form', () => {
    const linkElement = screen.getByText('Get Started').closest('a'); // get the closest anchor (Link will be rendered as an anchor tag)
    expect(linkElement).toBeInTheDocument();
    expect(linkElement?.getAttribute('href')).toBe('/form');
  });
});
