import { Award, Shield, Heart, Users } from 'lucide-react';

const benefits = [
  {
    title: '15+ Years Experience',
    description: 'Serving Northwest Arkansas since 2015 with expert knowledge of local climate and soil conditions.',
    icon: Award,
  },
  {
    title: 'Licensed & Insured',
    description: 'Fully licensed and insured for your peace of mind. Professional service you can trust.',
    icon: Shield,
  },
  {
    title: 'Satisfaction Guaranteed',
    description: 'We stand behind our work with a satisfaction guarantee. Your happiness is our priority.',
    icon: Heart,
  },
  {
    title: 'Local Family Owned',
    description: 'Family-owned business deeply rooted in the community. We care about our neighbors.',
    icon: Users,
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-neutral">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Why Choose Cagle&apos;s Landscaping?
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto text-balance">
            We&apos;re committed to providing exceptional landscaping services that exceed
            your expectations and transform your outdoor spaces.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="text-center group"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <IconComponent className="h-8 w-8 text-primary group-hover:text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {benefit.title}
                </h3>

                <p className="text-text-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-text-secondary">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-text-secondary">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-text-secondary">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-sm text-text-secondary">Cities Served</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}