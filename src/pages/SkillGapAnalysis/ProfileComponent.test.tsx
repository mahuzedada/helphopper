import { render, screen } from '@testing-library/react';
import ProfileComponent from './ProfileComponent';

describe('<ProfileComponent />', () => {
  const mockData = {
    strengths: ['Strength1', 'Strength2'],
    gaps: ['Gap1', 'Gap2'],
    resources: [
      {
        skill: 'Skill1',
        resources: [
          {
            shortDescription: 'Resource1 for Skill1',
            link: 'http://link1.com',
          },
          {
            shortDescription: 'Resource2 for Skill1',
            link: 'http://link2.com',
          },
        ],
      },
      {
        skill: 'Skill2',
        resources: [
          {
            shortDescription: 'Resource1 for Skill2',
            link: 'http://link3.com',
          },
        ],
      },
    ],
    matchScore: 85,
  };

  beforeEach(() => {
    render(<ProfileComponent data={mockData} />);
  });

  it('displays the match score correctly', () => {
    expect(screen.getByText('85% Match')).toBeInTheDocument();
  });

  it('renders strengths correctly', () => {
    for (const strength of mockData.strengths) {
      expect(screen.getByText(strength)).toBeInTheDocument();
    }
  });

  it('renders gaps correctly', () => {
    for (const gap of mockData.gaps) {
      expect(screen.getByText(gap)).toBeInTheDocument();
    }
  });

  it('renders resources and their links correctly', () => {
    for (const resource of mockData.resources) {
      expect(screen.getByText(resource.skill)).toBeInTheDocument();
      for (const link of resource.resources) {
        expect(screen.getByText(link.shortDescription)).toHaveAttribute(
          'href',
          link.link
        );
      }
    }
  });
});
