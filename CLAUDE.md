# Cagle's Landscaping & Restoration - Development Guide

## Project Overview

Professional landscaping website for Cagle's Landscaping & Restoration in Fayetteville, Arkansas. Static Next.js site deployed to Cloudflare Pages with future Contentful CMS integration.

**Business Contact Information:**

- Phone: (520) 358-2221
- Email: Caglejosh4@gmail.com
- Location: Fayetteville, Arkansas
- Owner: Josh Cagle

## Tech Stack

- **Framework**: Next.js 14.x (Pages Router ONLY - NOT App Router)
- **Language**: TypeScript 5.3+ with strict mode
- **Styling**: Tailwind CSS 3.4+ (utility-first, mobile-first)
- **Forms**: React Hook Form + @emailjs/browser + Zod validation
- **Testing**: Jest + React Testing Library (90% coverage target)
- **Image Optimization**: next-image-export-optimizer
- **Icons**: lucide-react
- **Utilities**: class-variance-authority, clsx, tailwind-merge
- **Deployment**: Cloudflare Pages (static export)
- **Package Manager**: npm only

## Project Structure

```
cagles-landscaping/
├── src/
│   ├── pages/                 # Pages Router routes
│   │   ├── _app.tsx          # App wrapper with global styles
│   │   ├── _document.tsx     # HTML document structure
│   │   ├── index.tsx         # Homepage
│   │   ├── services/
│   │   │   └── [slug].tsx    # Dynamic service pages
│   │   ├── portfolio.tsx     # Portfolio gallery
│   │   ├── about.tsx         # About page
│   │   └── contact.tsx       # Contact page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx    # Main layout wrapper
│   │   │   ├── Header.tsx    # Site header with navigation
│   │   │   └── Footer.tsx    # Site footer
│   │   ├── ui/               # Reusable UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Select.tsx
│   │   └── features/         # Complex feature components
│   │       ├── ContactForm.tsx
│   │       ├── HeroSection.tsx
│   │       ├── ServiceGrid.tsx
│   │       ├── PortfolioGallery.tsx
│   │       └── TestimonialCarousel.tsx
│   ├── lib/
│   │   ├── mockData.ts       # Mock data (Contentful format)
│   │   ├── emailjs.ts        # EmailJS configuration
│   │   ├── seo.ts            # SEO utilities and meta data
│   │   └── utils.ts          # Utility functions
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   ├── styles/
│   │   └── globals.css       # Global styles + Tailwind
│   └── __tests__/            # Test files mirror src structure
│       ├── components/
│       ├── pages/
│       └── lib/
├── public/
│   ├── images/               # Optimized images
│   └── robots.txt           # SEO crawler instructions
├── CLAUDE.md                 # This file
├── jest.config.js           # Jest configuration
├── jest.setup.js            # Jest setup file
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

## Design System

### Colors (Tailwind Config)

```javascript
colors: {
  primary: {
    DEFAULT: '#7b9a76',  // Sage green
    light: '#a4c4a0',
    dark: '#5a7456',
  },
  secondary: {
    DEFAULT: '#d7623f',  // Coral for CTAs
    light: '#e88d6f',
    dark: '#b54e2f',
  },
  neutral: {
    DEFAULT: '#f6f6f6',
    dark: '#e5e5e5',
  },
  text: {
    primary: '#1a3a08',
    secondary: '#4a5f3f',
  }
}
```

### Typography

- Base size: 16px
- Headings: Font weight 700
- Body: Font weight 400
- Line height: 1.6 for body, 1.2 for headings

### Spacing Scale

Use Tailwind's default spacing scale (4px base unit)

### Breakpoints (Mobile-First)

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## Code Conventions

### TypeScript

- Use strict mode
- Define interfaces for all props
- Export types from types/index.ts
- Use type inference where obvious
- Avoid `any` type - use `unknown` if needed

### React Components

- Functional components only
- Named exports for components
- Props interface defined above component
- Use TypeScript for prop types
- Destructure props in function signature

Example:

```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
}: ButtonProps) {
  // Implementation
}
```

### Styling

- Tailwind utility classes preferred
- Use CVA (class-variance-authority) for component variants
- Use cn() utility for conditional classes
- No inline styles
- No CSS modules
- Mobile-first responsive design

### File Naming

- Components: PascalCase (Button.tsx)
- Utilities: camelCase (utils.ts)
- Types: index.ts in types folder
- Tests: match source file name with .test.tsx

### Testing

- Test file location mirrors source structure
- Use React Testing Library
- Test user interactions, not implementation
- Aim for 90% code coverage
- Mock external dependencies (EmailJS, etc.)

## Patterns to Follow

### Component Composition

Prefer small, composable components over large monolithic ones.

### State Management

- Use React hooks (useState, useEffect) for local state
- Prop drilling is acceptable for this small app
- No global state management needed

### Data Fetching

- Use getStaticProps for pages needing data
- Use getStaticPaths for dynamic routes
- Mock data imported from lib/mockData.ts

### Error Handling

- Try-catch blocks for async operations
- User-friendly error messages
- Error boundaries for component errors
- Form validation with clear feedback

### Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators visible
- Alt text for all images
- Form labels properly associated

## SEO Requirements

### Every Page Must Have:

- Unique title tag
- Meta description (155-160 chars)
- Open Graph tags
- Twitter Card tags
- Canonical URL
- Proper heading hierarchy (H1 → H2 → H3)

### Schema Markup Required:

- LocalBusiness on homepage
- Service schema on service pages
- BreadcrumbList for navigation
- Review schema for testimonials

### Image Optimization:

- Use next-image-export-optimizer
- WebP format
- Descriptive alt text with location keywords
- Lazy loading for below-fold images
- Priority loading for hero images

## Commands

### Development

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Testing

All tests must pass with 90%+ coverage before deployment.

## Security Guidelines

- Never commit API keys or secrets
- Use environment variables (.env.local)
- Validate all user inputs
- Sanitize form data before processing
- Use HTTPS only
- Implement rate limiting on forms

## DO NOT

- Use App Router (use Pages Router only)
- Use CSS Modules or styled-components
- Use any global state management
- Use Server Components
- Use dangerouslySetInnerHTML
- Commit .env files
- Use console.log in production code
- Create unused components or utilities
- Import libraries not in package.json

## Git Workflow

- Commit messages: Conventional Commits format
- Branch naming: feature/description or fix/description
- Keep commits focused and atomic
- Write descriptive commit messages

## Notes

- Future CMS: Contentful (not implemented yet)
- Mock data structure matches Contentful output format
- Keep codebase clean - delete unused code immediately
- All placeholder images from Unsplash
