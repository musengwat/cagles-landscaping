import { render, screen } from '@testing-library/react';
import { ServicesOverview } from '@/components/features/ServicesOverview';
import { mockServices } from '@/lib/mockData';
import '@testing-library/jest-dom';

const mockProps = {
  services: mockServices.slice(0, 6)
};

describe('ServicesOverview', () => {
  it('renders without crashing', () => {
    render(<ServicesOverview {...mockProps} />);
    expect(document.body).toBeInTheDocument();
  });

  it('displays services when provided', () => {
    render(<ServicesOverview {...mockProps} />);
    mockServices.slice(0, 6).forEach(service => {
      expect(screen.getByText(service.fields.name)).toBeInTheDocument();
    });
  });
});