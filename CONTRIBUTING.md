# Contributing to Cagle's Landscaping Website

Thank you for your interest in contributing to the Cagle's Landscaping & Restoration website! This document provides guidelines and best practices for development.

## 🚀 Development Setup

### Prerequisites

- Node.js 18.17.0 or later
- npm (comes with Node.js)
- Git
- VS Code (recommended) with these extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier
  - Jest

### Initial Setup

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd cagles-landscaping
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your EmailJS credentials
   ```

3. **Start development**
   ```bash
   npm run dev
   ```

## 🏗️ Architecture Guidelines

### Project Structure

```
src/
├── pages/           # Next.js Pages Router (NO App Router)
├── components/
│   ├── ui/         # Reusable UI primitives
│   ├── layout/     # Layout components
│   └── features/   # Complex feature components
├── lib/            # Utilities and configurations
├── types/          # TypeScript type definitions
└── __tests__/      # Test files (mirror src structure)
```

### Component Architecture

- **UI Components**: Small, reusable, single-responsibility
- **Feature Components**: Complex business logic components
- **Layout Components**: Page structure and navigation
- **Page Components**: Route-level components in `/pages`

## 📝 Code Standards

### TypeScript

```typescript
// ✅ Good: Strict typing
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({ variant = 'primary', size = 'md', children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }))}
      {...props}
    >
      {children}
    </button>
  );
}

// ❌ Avoid: Any types, loose typing
function Button(props: any) { ... }
```

### Styling with Tailwind

```tsx
// ✅ Good: Use CVA for component variants
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-dark',
        secondary: 'bg-secondary text-white hover:bg-secondary-dark',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// ✅ Good: Use cn() utility for conditional classes
<div className={cn('base-class', isActive && 'active-class', className)} />

// ❌ Avoid: Inline styles, string concatenation
<div style={{ backgroundColor: 'red' }} />
<div className={'base-class ' + (isActive ? 'active-class' : '')} />
```

### File Naming

- **Components**: PascalCase (`Button.tsx`, `ContactForm.tsx`)
- **Utilities**: camelCase (`utils.ts`, `emailjs.ts`)
- **Pages**: lowercase with hyphens (`about.tsx`, `[slug].tsx`)
- **Types**: index.ts in types folder
- **Tests**: match source file name with `.test.tsx`

## 🧪 Testing Guidelines

### Test Structure

```typescript
// Component tests
describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Best Practices

- **Test behavior, not implementation**
- **Use accessible queries** (`getByRole`, `getByLabelText`)
- **Mock external dependencies** (EmailJS, Next.js router)
- **Test user interactions** (clicks, form submissions)
- **Write descriptive test names**

### Running Tests

```bash
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

## 🎨 Design System

### Colors

```javascript
// tailwind.config.js
colors: {
  primary: {
    DEFAULT: '#7b9a76',  // Sage green
    light: '#a4c4a0',
    dark: '#5a7456',
  },
  secondary: {
    DEFAULT: '#d7623f',  // Coral
    light: '#e88d6f',
    dark: '#b54e2f',
  },
  text: {
    primary: '#1a3a08',
    secondary: '#4a5f3f',
  }
}
```

### Typography

- **Headings**: Font weight 700 (font-bold)
- **Body**: Font weight 400 (font-normal)
- **Hierarchy**: H1 → H2 → H3 (proper semantic structure)

### Spacing

- Use Tailwind's spacing scale (4px base unit)
- Prefer `space-y-*` and `gap-*` over individual margins
- Use `container-wide` class for consistent page width

## 📊 SEO Requirements

### Every Page Must Have

```tsx
// Page component
export default function PageName() {
  const seo = generateMetaTags(seoConfigs.pageName);

  return (
    <Layout
      title={seo.title}
      description={seo.description}
      structuredData={pageSchema}
    >
      {/* Page content */}
    </Layout>
  );
}
```

### SEO Checklist

- [ ] Unique, descriptive title (< 60 characters)
- [ ] Meta description (120-160 characters)
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Alt text for all images
- [ ] Structured data (JSON-LD)
- [ ] Internal linking
- [ ] Mobile-responsive design

## 🔄 Git Workflow

### Branch Naming

```bash
feature/contact-form-validation
fix/mobile-navigation
hotfix/broken-email
docs/update-readme
```

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add contact form validation
fix: resolve mobile navigation toggle
docs: update deployment guide
perf: optimize image loading
test: add button component tests
```

### Pull Request Process

1. **Create feature branch** from `main`
2. **Make changes** following code standards
3. **Write/update tests** for new functionality
4. **Run full test suite** (`npm test`)
5. **Build successfully** (`npm run build`)
6. **Create pull request** with description
7. **Request review** from maintainers

## ⚡ Performance Guidelines

### Core Web Vitals

- **LCP < 2.5s**: Use `priority` for above-fold images
- **FID < 100ms**: Minimize JavaScript execution
- **CLS < 0.1**: Reserve space for dynamic content

### Image Optimization

```tsx
// ✅ Good: Optimized images
<ExportedImage
  src="/image.jpg"
  alt="Descriptive alt text"
  fill
  priority              // For above-fold
  loading="lazy"        // For below-fold
  sizes="(max-width: 768px) 100vw, 50vw"
  placeholder="blur"
  blurDataURL="data:image/..."
/>

// ❌ Avoid: Unoptimized images
<img src="/large-image.jpg" />
```

### Bundle Optimization

- Use dynamic imports for large components
- Lazy load below-the-fold content
- Minimize third-party scripts
- Use proper `sizes` attributes

## 🛠️ Development Tools

### Required VS Code Extensions

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "orta.vscode-jest"
  ]
}
```

### Useful Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # ESLint check
npm run lint:fix     # Auto-fix ESLint issues
npm test             # Run tests
npm run type-check   # TypeScript validation
```

## 🚫 What NOT to Do

### Code

- ❌ Don't use App Router (use Pages Router only)
- ❌ Don't use CSS Modules or styled-components
- ❌ Don't use `any` type in TypeScript
- ❌ Don't use inline styles
- ❌ Don't commit `.env.local` files
- ❌ Don't use `console.log` in production

### Components

- ❌ Don't create overly complex components
- ❌ Don't skip TypeScript interfaces
- ❌ Don't use default exports for utilities
- ❌ Don't forget accessibility attributes

### Performance

- ❌ Don't load all images with `priority`
- ❌ Don't import entire libraries for small features
- ❌ Don't skip image optimization
- ❌ Don't ignore Core Web Vitals warnings

## 🐛 Debugging

### Common Issues

1. **Build errors**: Check TypeScript and ESLint
2. **Performance issues**: Use React DevTools Profiler
3. **Styling issues**: Use browser dev tools
4. **Test failures**: Check test output and mocks

### Development Server Issues

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for port conflicts
lsof -ti:3000
```

## 📚 Resources

### Documentation

- [Next.js Pages Router](https://nextjs.org/docs/pages)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Tools

- [Figma](https://figma.com) - Design system reference
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## 🤝 Getting Help

### Before Asking

1. Check existing documentation
2. Search closed issues
3. Test with a minimal reproduction
4. Check browser console for errors

### How to Ask

1. **Describe the problem** clearly
2. **Include error messages** and stack traces
3. **Provide code examples** or screenshots
4. **Mention your environment** (OS, Node version, etc.)

### Contact

- **Issues**: Create GitHub issue with reproduction steps
- **Questions**: Use GitHub discussions
- **Urgent bugs**: Tag maintainers in issues

---

**Happy coding! 🚀**