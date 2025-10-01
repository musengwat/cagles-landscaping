# Deployment Guide - Cagle's Landscaping

This guide covers deploying the Cagle's Landscaping website to production on Cloudflare Pages.

## 🚀 Quick Deployment (Recommended)

### Cloudflare Pages Setup

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project" → "Connect to Git"
   - Select your GitHub repository
   - Use these build settings:
     ```
     Framework preset: Next.js (Static Export)
     Build command: npm run build
     Build output directory: out
     Root directory: /
     ```

3. **Configure Environment Variables**
   In Cloudflare Pages settings, add:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key
   ```

4. **Deploy**
   - Click "Save and Deploy"
   - Your site will be live at `https://your-project-name.pages.dev`

## 📧 EmailJS Configuration

### Before Deployment - Set up EmailJS

1. **Create EmailJS Account**
   - Go to [EmailJS.com](https://www.emailjs.com/)
   - Create a free account (1000 emails/month)

2. **Add Email Service**
   - Dashboard → Email Services → Add New Service
   - Choose Gmail, Outlook, or your email provider
   - Follow setup instructions to connect your email

3. **Create Email Template**
   - Dashboard → Email Templates → Create New Template
   - Use this template structure:

   ```html
   Subject: New Contact Form Submission - {{from_name}}

   Hello Josh,

   You have received a new contact form submission from your website:

   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{from_phone}}
   Service Interest: {{service_interest}}

   Message:
   {{message}}

   Submitted on: {{submission_date}}

   Please respond to this customer as soon as possible.

   Best regards,
   Cagle's Landscaping Website
   ```

4. **Get API Keys**
   - Dashboard → Account → API Keys
   - Copy your User ID (Public Key)
   - Note your Service ID and Template ID

## 🛠️ Manual Deployment Steps

### Local Build Test

```bash
# Install dependencies
npm install

# Run tests
npm run test

# Build for production
npm run build

# Test local build
npm run serve
```

### Deploy to Other Platforms

#### Netlify
```bash
# Build settings
Build command: npm run build
Publish directory: out
```

#### Vercel
```bash
# Build settings
Framework: Next.js
Build command: npm run build
Output directory: out
```

#### AWS S3 + CloudFront
```bash
# Build and upload
npm run build
aws s3 sync out/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## 🔧 Production Configuration

### Required Environment Variables

For production, ensure these are set:

```bash
# EmailJS (Required for contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_xxxxxxxxx

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Custom Domain Setup

1. **Cloudflare Pages Custom Domain**
   - Pages dashboard → Custom domains → Set up a custom domain
   - Add your domain (e.g., `cagleslandscaping.com`)
   - Update DNS records as instructed
   - SSL certificate will be automatically provisioned

2. **DNS Configuration**
   ```
   Type: CNAME
   Name: www (or @)
   Value: your-project-name.pages.dev
   ```

## 📊 Post-Deployment Checklist

### Immediate Verification

- [ ] Website loads correctly
- [ ] All pages are accessible
- [ ] Contact form works and sends emails
- [ ] Mobile responsiveness confirmed
- [ ] Performance is good (check Core Web Vitals)

### SEO Setup

- [ ] Submit sitemap to Google Search Console: `https://yourdomain.com/sitemap.xml`
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Google My Business profile
- [ ] Verify meta tags are correct using Facebook Debugger
- [ ] Test structured data with Google Rich Results Test

### Monitoring Setup

- [ ] Set up Google Analytics (if using)
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Set up uptime monitoring (e.g., UptimeRobot)
- [ ] Test contact form regularly

## 🔍 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Check for TypeScript errors
   npm run lint

   # Run tests
   npm run test

   # Build locally
   npm run build
   ```

2. **Contact Form Not Working**
   - Verify environment variables are set in hosting platform
   - Check EmailJS service status
   - Test with browser developer tools

3. **Images Not Loading**
   - Ensure all image URLs are valid
   - Check next-image-export-optimizer configuration
   - Verify Unsplash images are accessible

4. **404 Errors**
   - Ensure static export is configured correctly
   - Check that all routes are properly generated
   - Verify trailing slash configuration

### Performance Issues

1. **Slow Loading**
   - Check image optimization
   - Verify CDN is working
   - Test Core Web Vitals

2. **SEO Issues**
   - Validate structured data
   - Check meta tags
   - Verify sitemap is accessible

## 📈 Performance Optimization

### Cloudflare Optimizations

Enable these in Cloudflare dashboard:
- Auto Minify (CSS, JS, HTML)
- Brotli compression
- Image optimization
- Rocket Loader (test first)

### Monitoring

Use these tools to monitor performance:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse CI

## 🔐 Security Considerations

### Content Security Policy

Consider adding CSP headers in Cloudflare:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' cdn.emailjs.com; img-src 'self' data: images.unsplash.com; style-src 'self' 'unsafe-inline';
```

### SSL/HTTPS

- Cloudflare automatically provides SSL certificates
- Ensure "Always Use HTTPS" is enabled
- Set SSL/TLS encryption mode to "Full (strict)"

## 📞 Support

### Production Issues

For urgent production issues:
1. Check Cloudflare Pages build logs
2. Review browser console for errors
3. Test contact form functionality
4. Verify DNS settings

### EmailJS Issues

If contact form isn't working:
1. Check EmailJS dashboard for failed sends
2. Verify template variables match form fields
3. Ensure email service is connected
4. Check for rate limiting

---

**Need help?** Contact technical support or refer to the main README.md for development guidance.