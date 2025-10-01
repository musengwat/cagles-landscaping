import { render, screen } from '@testing-library/react';
import { TestimonialsCarousel } from '@/components/features/TestimonialsCarousel';
import { mockTestimonials } from '@/lib/mockData';
import '@testing-library/jest-dom';

const mockProps = {
  testimonials: mockTestimonials
};

describe('TestimonialsCarousel', () => {
  it('renders without crashing', () => {
    render(<TestimonialsCarousel {...mockProps} />);
    expect(document.body).toBeInTheDocument();
  });

  it('displays testimonials when provided', () => {
    render(<TestimonialsCarousel {...mockProps} />);
    expect(screen.getByText(/testimonials/i)).toBeInTheDocument();

    // Check for first testimonial
    if (mockTestimonials.length > 0) {
      expect(screen.getByText(mockTestimonials[0].fields.author)).toBeInTheDocument();
    }
  });
});