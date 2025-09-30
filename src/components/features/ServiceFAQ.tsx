import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Service } from '@/types';

interface ServiceFAQProps {
  service: Service;
}

export function ServiceFAQ({ service }: ServiceFAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-neutral">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* FAQ Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
              Frequently Asked Questions
            </h2>

            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              Get answers to common questions about our {service.fields.title.toLowerCase()} services.
              Don&apos;t see your question? Contact us for personalized answers.
            </p>

            {/* FAQ Items */}
            <div className="space-y-4">
              {service.fields.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:bg-gray-50 transition-colors duration-200"
                    aria-expanded={openItems.includes(index)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-text-primary pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        {openItems.includes(index) ? (
                          <ChevronUp className="h-5 w-5 text-primary" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Answer */}
                  {openItems.includes(index) && (
                    <div className="px-6 pb-4">
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-text-secondary leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* FAQ CTA */}
            <div className="mt-8 p-6 bg-primary/5 rounded-lg">
              <div className="flex items-start space-x-4">
                <MessageCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">
                    Still Have Questions?
                  </h3>
                  <p className="text-text-secondary mb-4">
                    We&apos;re here to help! Contact us for personalized answers about your specific project needs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="sm" className="px-6">
                      <a href="/contact">Ask a Question</a>
                    </Button>
                    <a
                      href="tel:5203582221"
                      className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-200"
                    >
                      Call (520) 358-2221
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 sticky top-8">
              <h3 className="text-2xl font-bold text-text-primary mb-6">
                Ready to Get Started?
              </h3>

              <p className="text-text-secondary mb-6">
                Get your free estimate for {service.fields.title.toLowerCase()} services.
                We&apos;ll assess your property and provide a detailed quote.
              </p>

              {/* Contact Options */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-text-secondary">Free on-site consultation</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-text-secondary">Detailed written estimate</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-text-secondary">No obligation, no pressure</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-text-secondary">24-hour response guarantee</span>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <a href="/contact">Get Free Estimate</a>
                </Button>

                <a
                  href="tel:5203582221"
                  className="block w-full text-center px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-200 font-medium"
                >
                  Call (520) 358-2221
                </a>

                <div className="text-center text-sm text-text-secondary">
                  <div>Monday - Saturday: 7:00 AM - 6:00 PM</div>
                  <div>Emergency services available</div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary">15+</div>
                    <div className="text-xs text-text-secondary">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary">100%</div>
                    <div className="text-xs text-text-secondary">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}