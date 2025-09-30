import Link from 'next/link';
import {
  Scissors,
  TreePine,
  Mountain,
  Leaf,
  Droplets,
  Trees
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const services = [
  {
    title: 'Lawn Care & Maintenance',
    description: 'Professional weekly and bi-weekly lawn maintenance to keep your grass healthy and beautiful year-round.',
    icon: Scissors,
    href: '/services/lawn-care',
  },
  {
    title: 'Landscape Design',
    description: 'Custom landscape design and installation services to create beautiful, functional outdoor spaces.',
    icon: TreePine,
    href: '/services/landscape-design',
  },
  {
    title: 'Hardscaping & Patios',
    description: 'Professional hardscaping services including patios, walkways, retaining walls, and outdoor living spaces.',
    icon: Mountain,
    href: '/services/hardscaping',
  },
  {
    title: 'Seasonal Cleanup',
    description: 'Comprehensive spring and fall cleanup services to prepare your landscape for changing seasons.',
    icon: Leaf,
    href: '/services/seasonal-cleanup',
  },
  {
    title: 'Irrigation Systems',
    description: 'Professional irrigation system design, installation, and maintenance to keep your landscape properly watered.',
    icon: Droplets,
    href: '/services/irrigation',
  },
  {
    title: 'Tree & Shrub Care',
    description: 'Professional tree and shrub care including pruning, health assessments, and pest management.',
    icon: Trees,
    href: '/services/tree-care',
  },
];

export function ServicesOverview() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Our Services
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto text-balance">
            We provide comprehensive landscaping services to transform and maintain
            your outdoor spaces throughout Northwest Arkansas.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;

            return (
              <Card key={service.href} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <IconComponent className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardFooter>
                  <Link href={service.href} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors duration-300"
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-text-secondary mb-6">
            Need a custom solution? We&apos;d love to discuss your project.
          </p>
          <Link href="/contact">
            <Button size="lg" className="px-8">
              Get Free Consultation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}