import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('<App />', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  it('renders the HelpHopper sidebar with navigation links', () => {
    expect(screen.getByText('HelpHopper')).toBeInTheDocument();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Form')).toBeInTheDocument();
    expect(screen.getByText('Skill Gap Analysis')).toBeInTheDocument();
    expect(screen.getByText('Cover Letter')).toBeInTheDocument();
  });
});
