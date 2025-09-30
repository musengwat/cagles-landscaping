import { CheckCircle } from 'lucide-react';
import type { Service } from '@/types';

interface ServiceProcessProps {
  service: Service;
}

export function ServiceProcess({ service }: ServiceProcessProps) {
  return (
    <section className="py-16 lg:py-24 bg-neutral">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Our Process
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto text-balance">
            We follow a proven 3-step process to ensure your {service.fields.title.toLowerCase()}
            project exceeds your expectations from start to finish.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Lines - Hidden on mobile */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 hidden md:block">
            <div className="flex items-center space-x-8">
              <div className="w-32 lg:w-40 h-0.5 bg-primary/30" />
              <div className="w-32 lg:w-40 h-0.5 bg-primary/30" />
            </div>
          </div>

          {service.fields.processSteps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center relative z-10">
                {/* Step Number */}
                <div className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full text-2xl font-bold mx-auto mb-6">
                  {index + 1}
                </div>

                {/* Step Content */}
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {step.title}
                </h3>

                <p className="text-text-secondary leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Step Completion Indicator */}
                <div className="flex items-center justify-center space-x-2 text-sm text-primary">
                  <CheckCircle className="h-4 w-4" />
                  <span>Professional Service</span>
                </div>
              </div>

              {/* Mobile Connector */}
              {index < service.fields.processSteps.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <div className="w-0.5 h-8 bg-primary/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Process Benefits */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <h3 className="text-2xl font-semibold text-text-primary mb-6 text-center">
            What This Process Means for You
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-text-primary mb-2">No Surprises</h4>
              <p className="text-sm text-text-secondary">
                Clear communication and transparency throughout the entire project
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-text-primary mb-2">Quality Results</h4>
              <p className="text-sm text-text-secondary">
                Attention to detail and professional execution in every step
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-text-primary mb-2">Peace of Mind</h4>
              <p className="text-sm text-text-secondary">
                Licensed, insured, and guaranteed work you can trust
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Information */}
        <div className="mt-12 text-center">
          <div className="bg-primary/5 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              Project Timeline
            </h3>
            <p className="text-text-secondary mb-4">
              Most {service.fields.title.toLowerCase()} projects are completed within 1-2 weeks,
              depending on scope and weather conditions.
            </p>
            <div className="text-sm text-text-secondary">
              <strong>Emergency services:</strong> Available for urgent needs and storm damage
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}