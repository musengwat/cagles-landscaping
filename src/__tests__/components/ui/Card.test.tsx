import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import '@testing-library/jest-dom';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders card with children', () => {
      render(
        <Card>
          <div>Card content</div>
        </Card>
      );
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Card className="custom-card" data-testid="card">
          <div>Content</div>
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-card');
    });

    it('has proper default styling', () => {
      render(
        <Card data-testid="card">
          <div>Content</div>
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('rounded-lg', 'bg-white', 'border-gray-100', 'shadow-sm');
    });
  });

  describe('CardHeader', () => {
    it('renders header content', () => {
      render(
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('applies header styling', () => {
      render(
        <CardHeader data-testid="card-header">
          <div>Header content</div>
        </CardHeader>
      );
      const header = screen.getByTestId('card-header');
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'pb-4');
    });
  });

  describe('CardTitle', () => {
    it('renders title text', () => {
      render(<CardTitle>Card Title</CardTitle>);
      expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    it('applies title styling', () => {
      render(<CardTitle data-testid="card-title">Title</CardTitle>);
      const title = screen.getByTestId('card-title');
      expect(title).toHaveClass('text-lg', 'font-semibold', 'leading-none', 'tracking-tight', 'text-text-primary');
    });
  });

  describe('CardDescription', () => {
    it('renders description text', () => {
      render(<CardDescription>Card description</CardDescription>);
      expect(screen.getByText('Card description')).toBeInTheDocument();
    });

    it('applies description styling', () => {
      render(<CardDescription data-testid="card-description">Description</CardDescription>);
      const description = screen.getByTestId('card-description');
      expect(description).toHaveClass('text-sm', 'text-text-secondary');
    });
  });

  describe('CardContent', () => {
    it('renders content', () => {
      render(
        <CardContent>
          <p>Card content</p>
        </CardContent>
      );
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('applies content styling', () => {
      render(
        <CardContent data-testid="card-content">
          <div>Content</div>
        </CardContent>
      );
      const content = screen.getByTestId('card-content');
      expect(content).toHaveClass('pt-0');
    });
  });

  describe('CardFooter', () => {
    it('renders footer content', () => {
      render(
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      );
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('applies footer styling', () => {
      render(
        <CardFooter data-testid="card-footer">
          <div>Footer</div>
        </CardFooter>
      );
      const footer = screen.getByTestId('card-footer');
      expect(footer).toHaveClass('flex', 'items-center', 'pt-4');
    });
  });

  describe('Complete Card', () => {
    it('renders a complete card structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Service Title</CardTitle>
            <CardDescription>Service description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Main content of the card</p>
          </CardContent>
          <CardFooter>
            <button>Learn More</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByText('Service Title')).toBeInTheDocument();
      expect(screen.getByText('Service description goes here')).toBeInTheDocument();
      expect(screen.getByText('Main content of the card')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Learn More' })).toBeInTheDocument();
    });
  });
});