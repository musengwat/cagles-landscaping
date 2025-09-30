// Contentful-compatible data structures for easy CMS migration

export interface ContentfulAsset {
  sys: { id: string };
  url: string;
  title: string;
  description: string;
  width: number;
  height: number;
  contentType: string;
}

export interface Service {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    icon: string; // lucide-react icon name
    processSteps: Array<{ title: string; description: string }>;
    priceRange: string;
    faqs: Array<{ question: string; answer: string }>;
    featuredImage: ContentfulAsset;
    galleryImages: ContentfulAsset[];
    seo: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
}

export interface PortfolioProject {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    location: string;
    category: 'residential' | 'commercial';
    serviceTypes: string[];
    description: string;
    beforeImage: ContentfulAsset;
    afterImage: ContentfulAsset;
    completionDate: string;
  };
}

export interface Testimonial {
  sys: { id: string };
  fields: {
    clientName: string;
    rating: 1 | 2 | 3 | 4 | 5;
    reviewText: string;
    projectType: string;
    date: string;
    featured: boolean;
  };
}

export interface AboutContent {
  sys: { id: string };
  fields: {
    companyStory: string;
    missionStatement: string;
    yearsFounded: number;
    coreValues: Array<{ title: string; description: string; icon: string }>;
    teamMembers: Array<{
      name: string;
      role: string;
      bio: string;
      photo: ContentfulAsset;
      specialties: string[];
    }>;
    certifications: string[];
  };
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  serviceInterest: string;
  message: string;
  website?: string; // Honeypot field
}

export interface ContactFormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  submit?: string;
}

// SEO Types
export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string[];
  noindex?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

// Component Props
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

export interface InputProps {
  id: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'password';
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  'aria-describedby'?: string;
}

export interface SelectProps {
  id: string;
  name: string;
  label: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface TextareaProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  className?: string;
  'aria-describedby'?: string;
}

// Page Props
export interface ServicePageProps {
  service: Service;
}

export interface PortfolioPageProps {
  projects: PortfolioProject[];
  categories: string[];
  serviceTypes: string[];
}

export interface AboutPageProps {
  about: AboutContent;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// API Response Types
export interface EmailResponse {
  status: number;
  text?: string;
}

// Utility Types
export type WithClassName<T = object> = T & {
  className?: string;
};

export type WithChildren<T = object> = T & {
  children: React.ReactNode;
};

// Component State Types
export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

export interface ModalState {
  isOpen: boolean;
  content?: React.ReactNode;
}

export interface CarouselState {
  currentIndex: number;
  isPlaying: boolean;
  direction: 'next' | 'prev';
}