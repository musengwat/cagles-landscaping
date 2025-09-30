import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ExportedImage from 'next-image-export-optimizer';
import { ArrowRight, Check, Star, Phone } from 'lucide-react';
import { services } from '@/lib/mockData';
import { generateWebPageSchema } from '@/lib/schema';
import type { Service } from '@/types';

interface ServicesPageProps {
  services: Service[];
}

export default function ServicesPage({ services }: ServicesPageProps) {
  const pageTitle = 'Landscaping Services | Cagle\'s Landscaping & Restoration';
  const pageDescription = 'Professional landscaping services in Fayetteville, Northwest Arkansas. Lawn care, landscape design, hardscaping, irrigation, tree care, and seasonal cleanup.';

  const pageSchema = generateWebPageSchema({
    name: pageTitle,
    description: pageDescription,
    url: 'https://cagleslandscaping.com/services/',
  });

  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
      structuredData={pageSchema}
    >
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-primary to-primary-dark">
        <div className="container-wide">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Landscaping Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 text-balance">
              Comprehensive landscaping solutions for residential and commercial properties in Northwest Arkansas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Get Free Estimate
                </Button>
              </Link>
              <a
                href="tel:5203582221"
                className="inline-flex items-center justify-center space-x-3 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-200"
              >
                <Phone className="h-5 w-5" />
                <span>(520) 358-2221</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Complete Landscaping Solutions
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto text-balance">
              From weekly lawn maintenance to complete landscape transformations, we provide
              professional services that enhance your property's beauty and value.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {services.map((service) => (
              <Card key={service.sys.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {/* Service Image */}
                  <div className="md:col-span-2">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <ExportedImage
                        src={service.fields.featuredImage.url}
                        alt={service.fields.featuredImage.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="md:col-span-3 flex flex-col justify-center p-6">
                    <h3 className="text-2xl font-semibold text-text-primary mb-3">
                      {service.fields.title}
                    </h3>

                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {service.fields.shortDescription}
                    </p>

                    {/* Key Benefits */}
                    <div className="space-y-2 mb-6">
                      {service.fields.processSteps.slice(0, 2).map((step, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{step.title}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price Range */}
                    <div className="text-sm text-text-secondary mb-6">
                      <strong>Pricing:</strong> {service.fields.priceRange}
                    </div>

                    {/* Learn More Button */}
                    <Link href={`/services/${service.fields.slug}`}>
                      <Button variant="outline" size="sm" className="w-full group">
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16 lg:py-24 bg-neutral">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Why Choose Our Services?
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              We bring years of experience, professional expertise, and commitment to quality to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                15+ Years Experience
              </h3>
              <p className="text-text-secondary">
                Family-owned business serving Northwest Arkansas since 2015 with consistent,
                reliable service and proven results.
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Licensed & Insured
              </h3>
              <p className="text-text-secondary">
                Fully licensed, bonded, and insured for your peace of mind.
                Professional service with complete liability coverage.
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                24-Hour Response
              </h3>
              <p className="text-text-secondary">
                Fast response times for estimates and emergency services.
                We're here when you need us most.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Service Areas
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              We proudly serve residential and commercial clients throughout Northwest Arkansas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {[
              'Fayetteville', 'Springdale', 'Rogers', 'Bentonville', 'Johnson',
              'Goshen', 'Farmington', 'Prairie Grove', 'Elkins', 'Tontitown'
            ].map((city) => (
              <div
                key={city}
                className="text-center p-4 bg-neutral rounded-lg"
              >
                <div className="font-medium text-text-primary">{city}</div>
                <div className="text-sm text-text-secondary">Arkansas</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 lg:py-24 bg-neutral">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Our Simple Process
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              From initial contact to project completion, we make the process easy and transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Free Consultation',
                description: 'We visit your property to assess your needs and discuss your vision.',
              },
              {
                step: '2',
                title: 'Custom Proposal',
                description: 'Receive a detailed written estimate within 24 hours of consultation.',
              },
              {
                step: '3',
                title: 'Professional Work',
                description: 'Our experienced team completes your project on time and on budget.',
              },
              {
                step: '4',
                title: 'Ongoing Support',
                description: 'We provide maintenance and support to keep your landscape beautiful.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-primary/5">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Ready to Transform Your Property?
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and detailed estimate.
            Let's discuss how we can enhance your outdoor space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="px-8">
                Get Free Estimate
              </Button>
            </Link>
            <a
              href="tel:5203582221"
              className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-200 font-medium"
            >
              Call (520) 358-2221
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      services,
    },
  };
};