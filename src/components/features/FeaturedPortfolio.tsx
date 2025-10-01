import { useState } from 'react';
import Link from 'next/link';
import ExportedImage from 'next-image-export-optimizer';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { portfolioProjects } from '@/lib/mockData';

export function FeaturedPortfolio() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Get first 8 projects for featured display
  const featuredProjects = portfolioProjects.slice(0, 8);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Recent Projects
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto text-balance">
            Take a look at some of our recent landscaping transformations throughout
            Northwest Arkansas. Each project tells a unique story.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.sys.id}
              className="group relative overflow-hidden rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              onMouseEnter={() => setHoveredProject(project.sys.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <ExportedImage
                  src={project.fields.afterImage.url}
                  alt={project.fields.afterImage.title}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTk5z7amFN0inylEhDkpTHJ//Z"
                />

                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                  hoveredProject === project.sys.id ? 'opacity-100' : 'opacity-0'
                }`} />

                {/* Project Info Overlay */}
                <div className={`absolute bottom-0 left-0 right-0 p-4 text-white transform transition-all duration-300 ${
                  hoveredProject === project.sys.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <h3 className="font-semibold text-sm mb-1">{project.fields.title}</h3>
                  <div className="flex items-center text-xs text-gray-200">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{project.fields.location}</span>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-block px-2 py-1 bg-primary text-white text-xs font-medium rounded">
                    {project.fields.category === 'residential' ? 'Residential' : 'Commercial'}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-4">
                <h3 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-200">
                  {project.fields.title}
                </h3>

                <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                  {project.fields.description}
                </p>

                {/* Service Types */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.fields.serviceTypes.slice(0, 2).map((service) => (
                    <span
                      key={service}
                      className="inline-block px-2 py-1 bg-gray-100 text-text-secondary text-xs rounded"
                    >
                      {service}
                    </span>
                  ))}
                  {project.fields.serviceTypes.length > 2 && (
                    <span className="inline-block px-2 py-1 bg-gray-100 text-text-secondary text-xs rounded">
                      +{project.fields.serviceTypes.length - 2} more
                    </span>
                  )}
                </div>

                {/* View Project Link */}
                <Link
                  href={`/portfolio#${project.fields.slug}`}
                  className="inline-flex items-center text-sm text-primary hover:text-primary-dark transition-colors duration-200"
                >
                  View Details
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-text-secondary mb-6">
            Ready to see what we can do for your property?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/portfolio">
              <Button variant="outline" size="lg" className="px-8">
                View All Projects
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="px-8">
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}