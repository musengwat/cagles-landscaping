import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import type { NavItem } from '@/types';

const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Lawn Care', href: '/services/lawn-care' },
      { label: 'Landscape Design', href: '/services/landscape-design' },
      { label: 'Hardscaping', href: '/services/hardscaping' },
      { label: 'Seasonal Cleanup', href: '/services/seasonal-cleanup' },
      { label: 'Irrigation', href: '/services/irrigation' },
      { label: 'Tree Care', href: '/services/tree-care' },
    ]
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.asPath]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isHomePage = router.pathname === '/';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || !isHomePage
          ? 'bg-white shadow-md'
          : 'bg-white/90 backdrop-blur-sm'
      )}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl lg:text-2xl font-bold text-text-primary hover:text-primary transition-colors duration-200"
          >
            <span>Cagle&apos;s Landscaping</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    'text-text-primary hover:text-primary transition-colors duration-200 font-medium',
                    router.pathname === item.href && 'text-primary'
                  )}
                >
                  {item.label}
                </Link>

                {/* Dropdown for Services */}
                {item.children && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-48">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-gray-50 transition-colors duration-200',
                            router.pathname === child.href && 'text-primary bg-gray-50'
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Phone & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:5203582221"
              className="flex items-center space-x-2 text-text-primary hover:text-primary transition-colors duration-200"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">(520) 358-2221</span>
            </a>
            <Link href="/contact">
              <Button>Free Estimate</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 top-16 bg-black/20 backdrop-blur-sm" />
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100">
            <nav className="container-wide py-4">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block px-4 py-3 text-base font-medium rounded-md transition-colors duration-200',
                        router.pathname === item.href
                          ? 'text-primary bg-primary/10'
                          : 'text-text-primary hover:text-primary hover:bg-gray-50'
                      )}
                    >
                      {item.label}
                    </Link>

                    {/* Mobile Services Submenu */}
                    {item.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block px-4 py-2 text-sm rounded-md transition-colors duration-200',
                              router.pathname === child.href
                                ? 'text-primary bg-primary/10'
                                : 'text-text-secondary hover:text-primary hover:bg-gray-50'
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                <a
                  href="tel:5203582221"
                  className="flex items-center justify-center space-x-2 w-full py-3 text-lg font-medium text-primary hover:text-primary-dark transition-colors duration-200"
                >
                  <Phone className="h-5 w-5" />
                  <span>(520) 358-2221</span>
                </a>
                <Link href="/contact">
                  <Button className="w-full">Get Free Estimate</Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}