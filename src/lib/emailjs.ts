import emailjs from '@emailjs/browser';
import type { ContactFormData, EmailResponse } from '@/types';

// Initialize EmailJS with public key
// Note: Actual credentials should be in .env.local (not committed to repo)
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

/**
 * Initialize EmailJS
 * Call this once when the app starts
 */
export function initEmailJS(): void {
  if (EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
}

/**
 * Validates environment variables for EmailJS
 * @returns Boolean indicating if all required env vars are present
 */
export function validateEmailJSConfig(): boolean {
  return !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
}

/**
 * Sends contact form email using EmailJS
 * @param formData - Contact form data
 * @returns Promise resolving to email response
 */
export async function sendContactEmail(formData: ContactFormData): Promise<EmailResponse> {
  // Validate configuration
  if (!validateEmailJSConfig()) {
    throw new Error('EmailJS configuration is incomplete. Please check environment variables.');
  }

  // Check for honeypot (spam prevention)
  if (formData.website && formData.website.trim() !== '') {
    // Silently reject spam submissions
    throw new Error('Spam detected');
  }

  // Prepare template parameters
  const templateParams = {
    // Form data
    from_name: formData.name,
    from_email: formData.email,
    from_phone: formData.phone,
    service_interest: formData.serviceInterest || 'Not specified',
    message: formData.message,

    // Business data (recipient)
    to_name: 'Josh Cagle',
    to_email: 'Caglejosh4@gmail.com',

    // Additional context
    subject: `New Contact Form Submission - ${formData.serviceInterest || 'General Inquiry'}`,
    submission_date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),

    // Auto-reply data
    reply_to: formData.email,
    business_name: "Cagle's Landscaping & Restoration",
    business_phone: '(520) 358-2221',
    business_email: 'Caglejosh4@gmail.com',
  };

  try {
    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID!,
      EMAILJS_TEMPLATE_ID!,
      templateParams,
      EMAILJS_PUBLIC_KEY!
    );

    // Log successful submission (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log('Email sent successfully:', response);
    }

    return {
      status: response.status,
      text: response.text,
    };
  } catch (error) {
    // Log error details (development only)
    if (process.env.NODE_ENV === 'development') {
      console.error('EmailJS error:', error);
    }

    // Re-throw with user-friendly message
    if (error instanceof Error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    throw new Error('Failed to send email. Please try again or call us directly.');
  }
}

/**
 * Sends a test email to verify EmailJS configuration
 * @returns Promise resolving to test email response
 */
export async function sendTestEmail(): Promise<EmailResponse> {
  const testData: ContactFormData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '(555) 123-4567',
    serviceInterest: 'Test Service',
    message: 'This is a test message to verify EmailJS configuration.',
  };

  return sendContactEmail(testData);
}

/**
 * EmailJS template configuration guide
 *
 * Create an EmailJS template with the following variables:
 *
 * Subject: New Contact Form - {{service_interest}}
 *
 * Email Body:
 * ```
 * New contact form submission from your website:
 *
 * Name: {{from_name}}
 * Email: {{from_email}}
 * Phone: {{from_phone}}
 * Service Interest: {{service_interest}}
 * Submission Date: {{submission_date}}
 *
 * Message:
 * {{message}}
 *
 * ---
 * This message was sent from the contact form on cagleslandscaping.com
 * Reply directly to this email to respond to {{from_name}}.
 * ```
 *
 * Auto-Reply Template (optional):
 * ```
 * Subject: Thank you for contacting {{business_name}}
 *
 * Hi {{from_name}},
 *
 * Thank you for reaching out to {{business_name}}! We've received your message about {{service_interest}} and will get back to you within 24 hours.
 *
 * In the meantime, feel free to call us at {{business_phone}} if you have any urgent questions.
 *
 * Your Message:
 * {{message}}
 *
 * Best regards,
 * Josh Cagle
 * {{business_name}}
 * {{business_phone}}
 * {{business_email}}
 * ```
 */

/**
 * Environment variables required in .env.local:
 *
 * NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
 * NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
 * NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
 *
 * Note: These are NEXT_PUBLIC_ variables because EmailJS runs in the browser.
 * They will be visible in the client-side bundle, which is acceptable for EmailJS.
 */