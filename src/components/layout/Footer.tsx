import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const serviceLinks = [
  { label: 'Lawn Care', href: '/services/lawn-care' },
  { label: 'Landscape Design', href: '/services/landscape-design' },
  { label: 'Hardscaping', href: '/services/hardscaping' },
  { label: 'Irrigation', href: '/services/irrigation' },
  { label: 'Tree Care', href: '/services/tree-care' },
  { label: 'Seasonal Cleanup', href: '/services/seasonal-cleanup' },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

const serviceAreas = [
  'Fayetteville',
  'Springdale',
  'Rogers',
  'Bentonville',
  'Johnson',
  'Goshen',
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text-primary text-white">
      {/* Main Footer Content */}
      <div className="container-wide py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Cagle&apos;s Landscaping & Restoration</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Professional landscaping services in Northwest Arkansas since 2015.
              We transform outdoor spaces with expert design, quality installation,
              and reliable maintenance.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:5203582221"
                className="flex items-center space-x-3 text-sm hover:text-primary transition-colors duration-200"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>(520) 358-2221</span>
              </a>

              <a
                href="mailto:Caglejosh4@gmail.com"
                className="flex items-center space-x-3 text-sm hover:text-primary transition-colors duration-200"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>Caglejosh4@gmail.com</span>
              </a>

              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Serving Fayetteville, AR & Northwest Arkansas</span>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <div>
                  <div>Monday - Saturday: 7:00 AM - 6:00 PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <h5 className="text-sm font-medium mb-2">Follow Us</h5>
              <div className="flex space-x-4">
                {/* Social media links - placeholder for when accounts are created */}
                <span className="text-xs text-gray-400">Social media coming soon</span>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Service Areas</h4>
            <p className="text-sm text-gray-300 mb-3">
              Proudly serving Northwest Arkansas:
            </p>
            <ul className="grid grid-cols-2 gap-1">
              {serviceAreas.map((area) => (
                <li key={area} className="text-sm text-gray-300">
                  {area}
                </li>
              ))}
            </ul>

            <div className="pt-4 space-y-2">
              <div className="text-sm">
                <span className="font-medium">Licensed & Insured</span>
              </div>
              <div className="text-sm text-gray-300">
                Family-owned business since 2015
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-300">
              © {currentYear} Cagle&apos;s Landscaping & Restoration. All rights reserved.
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="text-xs text-gray-400">
                Website built with ❤️ for local business
              </div>

              {/* Legal Links - Add when pages are created */}
              <div className="flex space-x-4 text-xs">
                <span className="text-gray-400">Privacy Policy</span>
                <span className="text-gray-400">Terms of Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}