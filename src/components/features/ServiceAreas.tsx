import { MapPin, CheckCircle } from 'lucide-react';
import { serviceAreas } from '@/lib/mockData';

export function ServiceAreas() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Proudly Serving Northwest Arkansas
            </h2>

            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              We&apos;re your local landscaping experts, serving communities throughout
              Northwest Arkansas. Our deep knowledge of the local climate, soil conditions,
              and native plants ensures your landscape thrives year-round.
            </p>

            {/* Service Areas List */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Cities We Serve:
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {serviceAreas.map((area) => (
                  <div
                    key={area}
                    className="flex items-center space-x-2 text-text-secondary"
                  >
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Area Info */}
            <div className="bg-primary/5 rounded-lg p-6">
              <h4 className="font-semibold text-text-primary mb-3">
                Service Area Details
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Free estimates within our service area</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Same-day emergency service available</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Regular maintenance routes optimized for efficiency</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Special consideration for areas outside our primary zone</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center text-center p-8">
              <MapPin className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Northwest Arkansas Service Map
              </h3>
              <p className="text-text-secondary mb-4">
                Serving a 30-mile radius from Fayetteville
              </p>
              <div className="text-sm text-text-secondary">
                Interactive map coming soon
              </div>
            </div>

            {/* Service Radius Indicator */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-sm border border-gray-100 p-3">
              <div className="text-sm text-text-secondary">Service Radius</div>
              <div className="text-lg font-semibold text-primary">30 miles</div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-neutral rounded-lg p-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Not Sure If We Serve Your Area?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              We&apos;re always looking to expand our service area for the right projects.
              Contact us to discuss your landscaping needs, even if you&apos;re outside
              our typical service area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:5203582221"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200 font-medium"
              >
                Call (520) 358-2221
              </a>
              <a
                href="mailto:Caglejosh4@gmail.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-200 font-medium"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}