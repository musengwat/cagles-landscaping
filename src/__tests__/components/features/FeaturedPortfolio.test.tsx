import { render, screen } from '@testing-library/react';
import { FeaturedPortfolio } from '@/components/features/FeaturedPortfolio';
import { portfolioProjects } from '@/lib/mockData';
import '@testing-library/jest-dom';

const mockProps = {
  projects: portfolioProjects.slice(0, 6)
};

describe('FeaturedPortfolio', () => {
  it('renders without crashing', () => {
    render(<FeaturedPortfolio {...mockProps} />);
    expect(document.body).toBeInTheDocument();
  });

  it('displays portfolio projects when provided', () => {
    render(<FeaturedPortfolio {...mockProps} />);
    expect(screen.getByText(/Recent Projects/i)).toBeInTheDocument();

    // Check for first project
    if (portfolioProjects.length > 0) {
      expect(screen.getByText(portfolioProjects[0].fields.title)).toBeInTheDocument();
    }
  });
});