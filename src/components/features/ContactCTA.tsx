import Link from 'next/link';
import ExportedImage from 'next-image-export-optimizer';
import { Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ContactCTA() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ExportedImage
          src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&h=1080&fit=crop&crop=center"
          alt="Beautiful landscaped front yard with professional design"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-text-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Ready to Transform Your Landscape?
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto text-balance">
            Get your free estimate today and take the first step toward the outdoor space of your dreams.
          </p>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm font-medium">Free Estimates</div>
              <div className="text-xs text-gray-300">No obligation consultation</div>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm font-medium">Quick Response</div>
              <div className="text-xs text-gray-300">24-hour response guarantee</div>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm font-medium">Licensed & Insured</div>
              <div className="text-xs text-gray-300">Fully protected service</div>
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/contact">
              <Button
                size="lg"
                className="text-lg px-8 py-4 w-full sm:w-auto bg-primary hover:bg-primary-dark"
              >
                Get Free Estimate
              </Button>
            </Link>

            <a
              href="tel:5203582221"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium border-2 border-white text-white rounded-md hover:bg-white hover:text-text-primary transition-colors duration-200 w-full sm:w-auto"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call (520) 358-2221
            </a>
          </div>

          {/* Business Hours */}
          <div className="text-sm text-gray-300">
            <div className="mb-2">
              <strong>Business Hours:</strong>
            </div>
            <div>Monday - Saturday: 7:00 AM - 6:00 PM</div>
            <div>Sunday: Closed</div>
          </div>

          {/* Emergency Contact Note */}
          <div className="mt-8 text-xs text-gray-400">
            Emergency storm cleanup available outside normal business hours
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}