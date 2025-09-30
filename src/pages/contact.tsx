import { Layout } from '@/components/layout/Layout';
import { ContactForm } from '@/components/features/ContactForm';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Star,
  MessageCircle,
  CalendarCheck,
  Shield
} from 'lucide-react';
import { generateWebPageSchema } from '@/lib/schema';

export default function ContactPage() {
  const pageTitle = 'Contact Us | Cagle\'s Landscaping & Restoration';
  const pageDescription = 'Contact Cagle\'s Landscaping & Restoration for your free landscaping estimate. Serving Fayetteville and Northwest Arkansas. Call (520) 358-2221 or fill out our contact form.';

  const pageSchema = generateWebPageSchema({
    name: pageTitle,
    description: pageDescription,
    url: 'https://cagleslandscaping.com/contact/',
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
              Get Your Free Estimate
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 text-balance">
              Ready to transform your outdoor space? Contact us today for a free consultation and detailed estimate.
            </p>

            {/* Quick Contact */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:5203582221"
                className="inline-flex items-center space-x-3 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                <Phone className="h-5 w-5" />
                <span>(520) 358-2221</span>
              </a>
              <a
                href="mailto:Caglejosh4@gmail.com"
                className="inline-flex items-center space-x-3 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-200"
              >
                <Mail className="h-5 w-5" />
                <span>Caglejosh4@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-neutral">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form - Takes up 2 columns */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Sidebar Information */}
            <div className="space-y-8">
              {/* Contact Information Card */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-6">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium text-text-primary">(520) 358-2221</div>
                      <div className="text-sm text-text-secondary">Call or text anytime</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium text-text-primary">Caglejosh4@gmail.com</div>
                      <div className="text-sm text-text-secondary">Email us directly</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium text-text-primary">Fayetteville, Arkansas</div>
                      <div className="text-sm text-text-secondary">Serving all of Northwest Arkansas</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium text-text-primary">Monday - Saturday</div>
                      <div className="text-sm text-text-secondary">7:00 AM - 6:00 PM</div>
                      <div className="text-xs text-text-secondary mt-1">Emergency services available</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Service Areas Card */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  Service Areas
                </h3>
                <p className="text-text-secondary mb-4 text-sm">
                  We proudly serve the following areas:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    'Fayetteville', 'Springdale', 'Rogers', 'Bentonville',
                    'Johnson', 'Goshen', 'Farmington', 'Prairie Grove',
                    'Elkins', 'Tontitown'
                  ].map((city) => (
                    <div key={city} className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-primary" />
                      <span className="text-text-secondary">{city}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Why Choose Us Card */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  Why Choose Us?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-400 mt-1" />
                    <div>
                      <div className="font-medium text-text-primary text-sm">15+ Years Experience</div>
                      <div className="text-xs text-text-secondary">Family-owned since 2015</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium text-text-primary text-sm">Licensed & Insured</div>
                      <div className="text-xs text-text-secondary">Full liability coverage</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CalendarCheck className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium text-text-primary text-sm">24-Hour Response</div>
                      <div className="text-xs text-text-secondary">Fast project estimates</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MessageCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium text-text-primary text-sm">Free Consultations</div>
                      <div className="text-xs text-text-secondary">No obligation estimates</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Emergency Services */}
              <Card className="p-6 bg-primary/5 border-primary/20">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Emergency Services
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  Storm damage? Tree fallen? We provide emergency cleanup and repair services.
                </p>
                <Button size="sm" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href="tel:5203582221">Call Now</a>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-white">
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
                title: 'Contact Us',
                description: 'Call, email, or fill out our contact form to get started.',
                icon: MessageCircle,
              },
              {
                step: '2',
                title: 'Free Consultation',
                description: 'We visit your property to assess your needs and discuss options.',
                icon: CalendarCheck,
              },
              {
                step: '3',
                title: 'Detailed Estimate',
                description: 'Receive a comprehensive written estimate within 24 hours.',
                icon: CheckCircle,
              },
              {
                step: '4',
                title: 'Project Completion',
                description: 'We complete your project on time and within budget.',
                icon: Star,
              },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.step} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">{item.step}</span>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-neutral">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Quick answers to common questions about our services and process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: 'How quickly can you provide an estimate?',
                answer: 'We typically provide estimates within 24 hours of our initial consultation. For urgent projects, same-day estimates are often possible.',
              },
              {
                question: 'Do you provide free estimates?',
                answer: 'Yes! All estimates and consultations are completely free with no obligation. We believe in transparent pricing.',
              },
              {
                question: 'Are you licensed and insured?',
                answer: 'Absolutely. We are fully licensed, bonded, and insured. We can provide proof of insurance upon request.',
              },
              {
                question: 'What areas do you serve?',
                answer: 'We serve all of Northwest Arkansas including Fayetteville, Springdale, Rogers, Bentonville, and surrounding communities.',
              },
              {
                question: 'Do you offer emergency services?',
                answer: 'Yes, we provide emergency cleanup services for storm damage, fallen trees, and other urgent landscape issues.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept cash, checks, and all major credit cards. Payment terms are discussed during the estimate process.',
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-text-primary mb-3">
                  {faq.question}
                </h3>
                <p className="text-text-secondary">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-primary/5">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Don't wait to transform your outdoor space. Contact us today and let's discuss your landscaping project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:5203582221"
              className="inline-flex items-center justify-center space-x-3 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200"
            >
              <Phone className="h-5 w-5" />
              <span>Call (520) 358-2221</span>
            </a>
            <Button variant="outline" size="lg" className="px-8">
              <a href="#contact-form">Fill Out Form Above</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}