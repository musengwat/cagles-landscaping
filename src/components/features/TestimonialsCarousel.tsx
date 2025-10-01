import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/mockData";
import { Button } from "@/components/ui/Button";

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying] = useState(true);

  // Filter to featured testimonials
  const featuredTestimonials = testimonials.filter((t) => t.fields.featured);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === featuredTestimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, featuredTestimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? featuredTestimonials.length - 1 : currentIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === featuredTestimonials.length - 1 ? 0 : currentIndex + 1
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (featuredTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-primary/5">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto text-balance">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied
            clients throughout Northwest Arkansas have to say about our work.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Controls */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              className="p-2"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex  items-center space-x-2 mx-4">
              {featuredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? "bg-primary" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              className="p-2"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          {/* Testimonial Content */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredTestimonials.map((testimonial) => (
                <div
                  key={testimonial.sys.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 md:p-12 text-center">
                    {/* Quote Icon */}
                    <div className="flex justify-center mb-6">
                      <Quote className="h-8 w-8 text-primary/30" />
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center space-x-1 mb-6">
                      {renderStars(testimonial.fields.rating)}
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-lg md:text-xl text-text-primary mb-8 leading-relaxed italic max-w-3xl mx-auto">
                      &ldquo;{testimonial.fields.reviewText}&rdquo;
                    </blockquote>

                    {/* Client Info */}
                    <div className="border-t border-gray-100 pt-6">
                      <cite className="not-italic">
                        <div className="font-semibold text-text-primary text-lg mb-1">
                          {testimonial.fields.clientName}
                        </div>
                        <div className="text-text-secondary text-sm">
                          {testimonial.fields.projectType}
                        </div>
                      </cite>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Carousel Controls */}
            <div className="flex items-center justify-between mb-8">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevious}
                className="p-2"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex  items-center space-x-2 mx-4">
                {featuredTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === currentIndex ? "bg-primary" : "bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={goToNext}
                className="p-2"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {/* Mobile Navigation */}
          <div className="flex justify-center space-x-4 mt-8 md:hidden">
            <Button
              variant="outline"
              onClick={goToPrevious}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            <Button
              variant="outline"
              onClick={goToNext}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Additional Social Proof */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-8">
              <div>
                <div className="text-2xl font-bold text-primary">5.0</div>
                <div className="flex justify-center space-x-1 mb-1">
                  {renderStars(5)}
                </div>
                <div className="text-sm text-text-secondary">
                  Average Rating
                </div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <div className="text-2xl font-bold text-primary">
                  {testimonials.length}+
                </div>
                <div className="text-sm text-text-secondary">Happy Clients</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-text-secondary">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
