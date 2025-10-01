import { render, screen } from '@testing-library/react';
import { ServiceAreas } from '@/components/features/ServiceAreas';
import '@testing-library/jest-dom';

describe('ServiceAreas', () => {
  it('renders without crashing', () => {
    render(<ServiceAreas />);
    expect(document.body).toBeInTheDocument();
  });

  it('displays service area information', () => {
    render(<ServiceAreas />);
    expect(screen.getByText(/Service Areas/i)).toBeInTheDocument();
    expect(screen.getByText(/Fayetteville/i)).toBeInTheDocument();
    expect(screen.getByText(/Northwest Arkansas/i)).toBeInTheDocument();
  });
});