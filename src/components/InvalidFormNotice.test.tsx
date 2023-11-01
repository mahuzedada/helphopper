import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import InvalidFormNotice from './InvalidFormNotice';

describe('<InvalidFormNotice />', () => {
  const mockTitle = 'Skill Gap Analysis';

  beforeEach(() => {
    render(
      <MemoryRouter>
        <InvalidFormNotice title={mockTitle} />
      </MemoryRouter>
    );
  });

  it('renders without crashing', () => {
    expect(screen.getByText('Missing Information')).toBeInTheDocument();
  });

  it('displays the title prop correctly in the message', () => {
    expect(
      screen.getByText(
        `Oops! To view your ${mockTitle}, you'll need to fill out the required form first.`
      )
    ).toBeInTheDocument();
  });

  it('has a link to go to the form', () => {
    expect(screen.getByText('Go To Form')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go To Form' })).toHaveAttribute(
      'href',
      '/form'
    );
  });
});
