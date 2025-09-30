import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ExportedImage from 'next-image-export-optimizer';
import { ExternalLink, MapPin, Calendar, Tag } from 'lucide-react';
import { portfolioProjects } from '@/lib/mockData';
import { portfolioPageSchema } from '@/lib/schema';
import type { PortfolioProject } from '@/types';

interface PortfolioPageProps {
  projects: PortfolioProject[];
}

export default function PortfolioPage({ projects }: PortfolioPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  // Filter projects based on selections
  const filteredProjects = projects.filter((project) => {
    const categoryMatch =
      selectedCategory === 'all' || project.fields.category === selectedCategory;
    const locationMatch =
      selectedLocation === 'all' || project.fields.location === selectedLocation;
    return categoryMatch && locationMatch;
  });

  // Get unique categories and locations for filters
  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.fields.category)))];
  const locations = ['all', ...Array.from(new Set(projects.map((p) => p.fields.location)))];

  const pageTitle = 'Portfolio | Cagle\'s Landscaping & Restoration';
  const pageDescription = 'View our completed landscaping projects in Fayetteville, Northwest Arkansas. Before and after photos of residential and commercial landscape transformations.';

  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
      structuredData={portfolioPageSchema}
    >
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-primary to-primary-dark">
        <div className="container-wide">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Portfolio
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto text-balance">
              Discover the transformative power of professional landscaping through our completed projects across Northwest Arkansas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                <a href="/contact">Start Your Project</a>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <a href="/services/landscape-design">View Services</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-neutral">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Tag className="h-5 w-5 text-primary" />
                <span className="font-medium text-text-primary">Filters:</span>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' :
                     category === 'residential' ? 'Residential' : 'Commercial'}
                  </option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-text-secondary">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-wide">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-text-primary mb-4">
                No projects found
              </h3>
              <p className="text-text-secondary mb-6">
                Try adjusting your filters to see more projects.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedLocation('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.sys.id} className="group overflow-hidden">
                  {/* Before & After Images */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* After Image (Default) */}
                    <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
                      <ExportedImage
                        src={project.fields.afterImage.url}
                        alt={project.fields.afterImage.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        After
                      </div>
                    </div>

                    {/* Before Image (On Hover) */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <ExportedImage
                        src={project.fields.beforeImage.url}
                        alt={project.fields.beforeImage.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                        Before
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                    {/* View Details Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" className="bg-white text-primary hover:bg-gray-100">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {project.fields.title}
                    </h3>

                    <p className="text-text-secondary mb-4 line-clamp-2">
                      {project.fields.description}
                    </p>

                    {/* Project Meta */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{project.fields.location}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>
                          {new Date(project.fields.completionDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long'
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Service Types */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.fields.serviceTypes.map((service, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    {/* Category Badge */}
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.fields.category === 'residential'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {project.fields.category === 'residential' ? 'Residential' : 'Commercial'}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-primary/5">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Ready to Transform Your Property?
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Let us create a custom landscape design that enhances your property's beauty and value.
            Get your free consultation and estimate today.
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
      projects: portfolioProjects,
    },
  };
};