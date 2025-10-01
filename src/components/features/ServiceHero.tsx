import Link from 'next/link';
import ExportedImage from 'next-image-export-optimizer';
import { ArrowLeft, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Service } from '@/types';

interface ServiceHeroProps {
  service: Service;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section className="relative py-16 lg:py-24 bg-text-primary text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ExportedImage
          src={service.fields.featuredImage.url}
          alt={service.fields.featuredImage.title}
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-text-primary/60" />
      </div>

      <div className="relative z-10 container-wide">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-300 mb-8" aria-label="Breadcrumb">
          <Link
            href="/"
            className="hover:text-white transition-colors duration-200"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/services"
            className="hover:text-white transition-colors duration-200"
          >
            Services
          </Link>
          <span>/</span>
          <span className="text-white">{service.fields.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            {/* Back Button */}
            <Link
              href="/services"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>

            {/* Service Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {service.fields.title}
            </h1>

            {/* Service Description */}
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              {service.fields.shortDescription}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary-dark text-white px-8 py-4">
                  Get Free Estimate
                </Button>
              </Link>

              <a
                href="tel:5203582221"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-md hover:bg-white hover:text-text-primary transition-colors duration-200 font-medium"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call (520) 358-2221
              </a>
            </div>

            {/* Service Highlights */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">Licensed</div>
                <div className="text-sm text-gray-300">& Insured</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">Free</div>
                <div className="text-sm text-gray-300">Estimates</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-gray-300">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Service Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <ExportedImage
                src={service.fields.featuredImage.url}
                alt={service.fields.featuredImage.description}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTk5z7amFN0inylEhDkpTHJ//Z"
              />
            </div>

            {/* Pricing Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-white rounded-lg p-4 shadow-lg">
              <div className="text-sm font-medium mb-1">Starting From</div>
              <div className="text-xs text-primary-light">
                {service.fields.priceRange.split(' ')[0]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}