import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { CheckCircle, AlertCircle, Send, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { sendContactEmail, initEmailJS } from '@/lib/emailjs';
import type { ContactFormData } from '@/types';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  serviceInterest: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  website: z.string().optional(), // Honeypot field
});

type ContactFormInput = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className = '' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  // Initialize EmailJS on component mount
  useEffect(() => {
    initEmailJS();
  }, []);

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const formData: ContactFormData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        serviceInterest: data.serviceInterest,
        message: data.message,
        website: data.website, // Honeypot
      };

      await sendContactEmail(formData);

      setSubmitStatus('success');
      reset(); // Clear form
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try calling us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    { value: '', label: 'Select a service...' },
    { value: 'lawn-care', label: 'Lawn Care & Maintenance' },
    { value: 'landscape-design', label: 'Landscape Design & Installation' },
    { value: 'hardscaping', label: 'Hardscaping & Patios' },
    { value: 'seasonal-cleanup', label: 'Seasonal Cleanup' },
    { value: 'irrigation', label: 'Irrigation Systems' },
    { value: 'tree-care', label: 'Tree & Shrub Care' },
    { value: 'consultation', label: 'Free Consultation' },
    { value: 'other', label: 'Other / Multiple Services' },
  ];

  return (
    <div className={`bg-white rounded-lg shadow-lg p-8 ${className}`}>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
          Get Your Free Estimate
        </h2>
        <p className="text-text-secondary">
          Fill out the form below and we&apos;ll get back to you within 24 hours with a detailed estimate for your project.
        </p>
      </div>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">Message Sent Successfully!</h3>
              <p className="text-green-700">
                Thank you for contacting us. We&apos;ll respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">Error Sending Message</h3>
              <p className="text-red-700">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field - hidden from users */}
        <div className="hidden">
          <input
            {...register('website')}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              {...register('name')}
              type="text"
              id="name"
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              required
              disabled={isSubmitting}
              error={errors.name?.message}
            />
          </div>

          <div>
            <Input
              {...register('email')}
              type="email"
              id="email"
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
              required
              disabled={isSubmitting}
              error={errors.email?.message}
            />
          </div>
        </div>

        {/* Phone and Service Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              {...register('phone')}
              type="tel"
              id="phone"
              name="phone"
              label="Phone Number"
              placeholder="(555) 123-4567"
              required
              disabled={isSubmitting}
              error={errors.phone?.message}
            />
          </div>

          <div>
            <Select
              {...register('serviceInterest')}
              id="serviceInterest"
              name="serviceInterest"
              label="Service Interest"
              options={serviceOptions}
              required
              disabled={isSubmitting}
              error={errors.serviceInterest?.message}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <Textarea
            {...register('message')}
            id="message"
            name="message"
            label="Project Details"
            rows={5}
            placeholder="Tell us about your project, property size, timeline, and any specific requirements..."
            required
            disabled={isSubmitting}
            error={errors.message?.message}
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </div>

        {/* Privacy Note */}
        <p className="text-sm text-text-secondary text-center">
          By submitting this form, you agree to our privacy policy. We&apos;ll only use your information to respond to your inquiry.
        </p>
      </form>

      {/* Contact Information */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="font-semibold text-text-primary mb-4">
          Prefer to contact us directly?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium text-text-primary">(520) 358-2221</div>
              <div className="text-sm text-text-secondary">Call or text anytime</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium text-text-primary">Caglejosh4@gmail.com</div>
              <div className="text-sm text-text-secondary">Email us directly</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium text-text-primary">Fayetteville, AR</div>
              <div className="text-sm text-text-secondary">Serving Northwest Arkansas</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium text-text-primary">Mon-Sat: 7AM-6PM</div>
              <div className="text-sm text-text-secondary">Emergency services available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}