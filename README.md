# Cagle's Landscaping & Restoration

A professional landscaping website built with Next.js, featuring comprehensive SEO optimization, performance monitoring, and conversion-focused design for Cagle's Landscaping & Restoration in Fayetteville, Arkansas.

## 🌟 Features

- **Professional Design**: Modern, mobile-first responsive design optimized for lead generation
- **SEO Optimized**: Comprehensive SEO with structured data, meta tags, and local search optimization
- **Performance Focused**: Core Web Vitals optimized with lazy loading and image optimization
- **Contact Forms**: EmailJS integration with validation and spam protection
- **Static Export**: Cloudflare Pages ready with static site generation
- **Accessibility**: WCAG 2.1 AA compliant with proper semantic HTML
- **Testing**: Comprehensive test suite with Jest and React Testing Library

## 🏗️ Tech Stack

- **Framework**: Next.js 14.x (Pages Router)
- **Language**: TypeScript 5.3+ (strict mode)
- **Styling**: Tailwind CSS 3.4+ (mobile-first)
- **Forms**: React Hook Form + EmailJS + Zod validation
- **Testing**: Jest + React Testing Library
- **Image Optimization**: next-image-export-optimizer
- **Icons**: Lucide React
- **Utilities**: class-variance-authority, clsx, tailwind-merge
- **Performance**: Web Vitals monitoring
- **Deployment**: Cloudflare Pages (static export)

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17.0 or later
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/cagles-landscaping.git
   cd cagles-landscaping
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your EmailJS credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run serve        # Serve static build
npm run lint         # Run ESLint
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:ci      # Run tests for CI
```

## 🎨 Project Structure

```
cagles-landscaping/
├── src/
│   ├── pages/                 # Next.js pages (Pages Router)
│   │   ├── _app.tsx          # App wrapper
│   │   ├── _document.tsx     # HTML document
│   │   ├── index.tsx         # Homepage
│   │   ├── about.tsx         # About page
│   │   ├── contact.tsx       # Contact page
│   │   ├── portfolio.tsx     # Portfolio page
│   │   └── services/         # Services pages
│   │       ├── index.tsx     # Services overview
│   │       └── [slug].tsx    # Dynamic service pages
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   ├── layout/           # Layout components
│   │   └── features/         # Feature components
│   ├── lib/
│   │   ├── mockData.ts       # Content data
│   │   ├── seo.ts            # SEO utilities
│   │   ├── schema.ts         # Structured data
│   │   ├── emailjs.ts        # EmailJS configuration
│   │   ├── performance.ts    # Performance monitoring
│   │   └── utils.ts          # Utility functions
│   ├── types/
│   │   └── index.ts          # TypeScript definitions
│   ├── styles/
│   │   └── globals.css       # Global styles
│   └── __tests__/            # Test files
└── public/                   # Static assets
```

## 🛠️ Configuration

### Environment Variables

Create `.env.local` file:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### EmailJS Setup

1. Create account at [EmailJS](https://www.emailjs.com/)
2. Create email service (Gmail, Outlook, etc.)
3. Create email template
4. Copy Service ID, Template ID, and Public Key to `.env.local`

## 📊 SEO Configuration

The website includes comprehensive SEO optimization:

- **Meta Tags**: Optimized title, description, keywords for each page
- **Open Graph**: Social media sharing optimization
- **Structured Data**: LocalBusiness, Service, Review schemas
- **Sitemap**: Auto-generated XML sitemap
- **Local SEO**: Geographic targeting for Northwest Arkansas

### Key SEO Features

- **Target Keywords**: "landscaping fayetteville ar", "lawn care northwest arkansas"
- **Local Business**: Complete NAP (Name, Address, Phone) consistency
- **Service Pages**: Individual optimization for each service
- **Performance**: Core Web Vitals optimized for search ranking

## 🎯 Deployment

### Cloudflare Pages (Recommended)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare Pages**
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: `/`

### Environment Variables on Cloudflare

Add these environment variables in Cloudflare Pages settings:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## 📞 Business Information

**Cagle's Landscaping & Restoration**
- **Phone**: (520) 358-2221
- **Email**: Caglejosh4@gmail.com
- **Location**: Fayetteville, Arkansas
- **Service Areas**: Northwest Arkansas (Fayetteville, Springdale, Rogers, Bentonville, and surrounding areas)

### Services Offered

1. **Lawn Care & Maintenance** - Weekly and bi-weekly lawn services
2. **Landscape Design & Installation** - Custom outdoor space design
3. **Hardscaping & Patios** - Stone, brick, and concrete work
4. **Seasonal Cleanup** - Spring and fall yard cleanup
5. **Irrigation Systems** - Sprinkler installation and maintenance
6. **Tree & Shrub Care** - Pruning and health assessments

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## 🔧 Development

### Adding New Pages

1. Create page in `src/pages/`
2. Add SEO config in `src/lib/seo.ts`
3. Update navigation in `src/components/layout/Header.tsx`
4. Add structured data if needed
5. Create tests in `src/__tests__/pages/`

## 📈 Performance

The website is optimized for Google's Core Web Vitals:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

---

**Built with ❤️ for Cagle's Landscaping & Restoration**
