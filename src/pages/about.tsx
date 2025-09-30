import { GetStaticProps } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ExportedImage from 'next-image-export-optimizer';
import { Award, Users, Leaf, CheckCircle, Calendar, MapPin, Star } from 'lucide-react';
import { aboutContent, testimonials } from '@/lib/mockData';
import { generatePersonSchema, generateWebPageSchema, generateReviewSchema } from '@/lib/schema';
import type { AboutContent, Testimonial } from '@/types';

interface AboutPageProps {
  about: AboutContent;
  testimonials: Testimonial[];
}

export default function AboutPage({ about, testimonials }: AboutPageProps) {
  const pageTitle = 'About Us | Cagle&apos;s Landscaping & Restoration';
  const pageDescription = 'Learn about Cagle\'s Landscaping & Restoration, a family-owned landscaping company serving Fayetteville and Northwest Arkansas since 2015. Meet our team and our mission.';

  const ownerSchema = generatePersonSchema({
    name: about.fields.teamMembers[0].name,
    jobTitle: about.fields.teamMembers[0].role,
    bio: about.fields.teamMembers[0].bio,
    image: about.fields.teamMembers[0].photo.url,
  });

  const pageSchema = generateWebPageSchema({
    name: pageTitle,
    description: pageDescription,
    url: 'https://cagleslandscaping.com/about/',
  });

  const reviewSchema = generateReviewSchema(testimonials);

  const structuredData = [ownerSchema, pageSchema, reviewSchema];

  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
      structuredData={structuredData}
    >
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-primary to-primary-dark">
        <div className="container-wide">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Cagle&apos;s Landscaping
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto text-balance">
              Family-owned and operated since {about.fields.yearsFounded}, transforming outdoor spaces across Northwest Arkansas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                <a href="/contact">Get Free Estimate</a>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <a href="/portfolio">View Our Work</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Story Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg text-text-secondary">
                {about.fields.companyStory.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {new Date().getFullYear() - about.fields.yearsFounded}+
                  </div>
                  <div className="text-sm text-text-secondary">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-text-secondary">Projects Completed</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <ExportedImage
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=450&fit=crop"
                  alt="Beautiful landscaped property showcasing Cagle's Landscaping work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-semibold text-text-primary">Since {about.fields.yearsFounded}</div>
                    <div className="text-sm text-text-secondary">Family Owned & Operated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 lg:py-24 bg-neutral">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
            Our Mission
          </h2>
          <p className="text-xl text-text-secondary max-w-4xl mx-auto text-balance leading-relaxed">
            {about.fields.missionStatement}
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              These values guide everything we do and ensure we deliver exceptional service to every client.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.fields.coreValues.map((value, index) => {
              const IconComponent = value.icon === 'Award' ? Award :
                                 value.icon === 'Users' ? Users : Leaf;

              return (
                <Card key={index} className="text-center p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-4">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-neutral">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Our experienced team is dedicated to bringing your landscaping vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {about.fields.teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {/* Photo */}
                  <div className="md:col-span-2">
                    <div className="aspect-square relative overflow-hidden rounded-lg">
                      <ExportedImage
                        src={member.photo.url}
                        alt={member.photo.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 200px"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="md:col-span-3 flex flex-col justify-center">
                    <h3 className="text-2xl font-semibold text-text-primary mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Specialties */}
                    <div>
                      <h4 className="font-semibold text-text-primary mb-3">Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Credentials */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Certifications & Credentials
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              We maintain the highest professional standards through continuous education and industry certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {about.fields.certifications.map((certification, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 bg-neutral rounded-lg"
              >
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="text-text-primary font-medium">{certification}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 lg:py-24 bg-neutral">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Service Areas
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              We proudly serve residential and commercial clients throughout Northwest Arkansas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {[
              'Fayetteville', 'Springdale', 'Rogers', 'Bentonville', 'Johnson',
              'Goshen', 'Farmington', 'Prairie Grove', 'Elkins', 'Tontitown'
            ].map((city, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-3 bg-white rounded-lg text-center"
              >
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-text-primary text-sm font-medium">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Don't just take our word for it - see what our satisfied clients have to say about our work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.filter(t => t.fields.featured).slice(0, 3).map((testimonial) => (
              <Card key={testimonial.sys.id} className="p-6">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.fields.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-text-secondary mb-6 leading-relaxed">
                  "{testimonial.fields.reviewText}"
                </p>

                {/* Client Info */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-semibold text-text-primary">
                    {testimonial.fields.clientName}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {testimonial.fields.projectType}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline">
              <a href="/">View All Reviews</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-primary/5">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Let our experienced team transform your outdoor space. Contact us today for a free consultation and estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              <a href="/contact">Get Free Estimate</a>
            </Button>
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
      about: aboutContent,
      testimonials: testimonials,
    },
  };
};