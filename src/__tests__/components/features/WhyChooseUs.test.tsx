import { render, screen } from '@testing-library/react';
import { WhyChooseUs } from '@/components/features/WhyChooseUs';
import '@testing-library/jest-dom';

describe('WhyChooseUs', () => {
  it('renders without crashing', () => {
    render(<WhyChooseUs />);
    expect(document.body).toBeInTheDocument();
  });

  it('displays key selling points', () => {
    render(<WhyChooseUs />);
    expect(screen.getByText(/Why Choose/i)).toBeInTheDocument();
    expect(screen.getByText(/Years Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Licensed.*Insured/i)).toBeInTheDocument();
  });
});