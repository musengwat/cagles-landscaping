import { render } from '@testing-library/react';
import { HeroSection } from '@/components/features/HeroSection';
import '@testing-library/jest-dom';

describe('HeroSection', () => {
  it('renders without crashing', () => {
    render(<HeroSection />);
    expect(document.body).toBeInTheDocument();
  });
});