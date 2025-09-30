import { CheckCircle, Star, Shield, Award } from 'lucide-react';
import type { Service } from '@/types';

interface ServiceOverviewProps {
  service: Service;
}

export function ServiceOverview({ service }: ServiceOverviewProps) {
  const benefits = [
    {
      title: 'Expert Knowledge',
      description: 'Years of experience with Arkansas climate and soil conditions',
      icon: Award,
    },
    {
      title: 'Quality Materials',
      description: 'We use only the highest quality materials and equipment',
      icon: Star,
    },
    {
      title: 'Guaranteed Work',
      description: 'All work comes with our satisfaction guarantee',
      icon: Shield,
    },
    {
      title: 'Licensed & Insured',
      description: 'Fully licensed and insured for your peace of mind',
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Service Overview */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
              What We Do
            </h2>

            <div className="prose prose-lg max-w-none text-text-secondary">
              <div dangerouslySetInnerHTML={{ __html: service.fields.fullDescription.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br />') }} />
            </div>

            {/* Pricing Information */}
            <div className="mt-8 bg-primary/5 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Investment & Pricing
              </h3>
              <p className="text-text-secondary mb-4">
                {service.fields.priceRange}
              </p>
              <div className="text-sm text-text-secondary">
                <ul className="space-y-1">
                  <li>• Free on-site consultations and estimates</li>
                  <li>• Transparent pricing with no hidden fees</li>
                  <li>• Flexible payment options available</li>
                  <li>• Seasonal discounts and package deals</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
              Why Choose Our {service.fields.title}?
            </h2>

            <div className="space-y-6">
              {benefits.map((benefit) => {
                const IconComponent = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="flex items-start space-x-4 p-6 bg-neutral rounded-lg hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-text-primary mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Service Info */}
            <div className="mt-8 p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Service Area
              </h3>
              <p className="text-text-secondary mb-4">
                We proudly serve all of Northwest Arkansas including:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Fayetteville</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Springdale</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Rogers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Bentonville</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Johnson</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Goshen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}