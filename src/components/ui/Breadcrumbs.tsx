import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/lib/schema';

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  // Add home as the first item if not present
  const breadcrumbItems = items[0]?.href === '/' ? items : [
    { label: 'Home', href: '/' },
    ...items
  ];

  // Generate structured data for breadcrumbs
  const structuredData = generateBreadcrumbSchema(
    breadcrumbItems.map(item => ({
      name: item.label,
      url: `https://cagleslandscaping.com${item.href}`
    }))
  );

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className={`bg-neutral border-b border-gray-200 ${className}`}
      >
        <div className="container-wide py-3">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight
                    className="h-4 w-4 text-gray-400 mx-2"
                    aria-hidden="true"
                  />
                )}

                {item.current ? (
                  <span
                    className="text-text-primary font-medium"
                    aria-current="page"
                  >
                    {index === 0 && <Home className="h-4 w-4 inline mr-1" />}
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-text-secondary hover:text-primary transition-colors duration-200 flex items-center"
                  >
                    {index === 0 && <Home className="h-4 w-4 mr-1" />}
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}