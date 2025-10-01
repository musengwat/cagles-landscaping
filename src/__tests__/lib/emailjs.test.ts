import {
  initEmailJS,
  sendContactForm,
  validateEmailJSConfig,
  EmailJSResponse,
  ContactFormData
} from '@/lib/emailjs';
import { send, init } from '@emailjs/browser';

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  send: jest.fn(),
  init: jest.fn(),
}));

const mockSend = send as jest.MockedFunction<typeof send>;
const mockInit = init as jest.MockedFunction<typeof init>;

// Mock console methods
const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

// Mock environment variables
const originalEnv = process.env;

describe('EmailJS Library', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_EMAILJS_SERVICE_ID: 'test_service_id',
      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: 'test_template_id',
      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: 'test_public_key',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    consoleSpy.mockClear();
    consoleErrorSpy.mockClear();
  });

  describe('validateEmailJSConfig', () => {
    it('returns true when all environment variables are present', () => {
      const result = validateEmailJSConfig();
      expect(result).toBe(true);
    });

    it('returns false when service ID is missing', () => {
      delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const result = validateEmailJSConfig();
      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'EmailJS configuration missing: NEXT_PUBLIC_EMAILJS_SERVICE_ID'
      );
    });

    it('returns false when template ID is missing', () => {
      delete process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const result = validateEmailJSConfig();
      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'EmailJS configuration missing: NEXT_PUBLIC_EMAILJS_TEMPLATE_ID'
      );
    });

    it('returns false when public key is missing', () => {
      delete process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      const result = validateEmailJSConfig();
      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'EmailJS configuration missing: NEXT_PUBLIC_EMAILJS_PUBLIC_KEY'
      );
    });

    it('returns false when multiple variables are missing', () => {
      delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      delete process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

      const result = validateEmailJSConfig();
      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
    });

    it('handles empty string environment variables', () => {
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = '';

      const result = validateEmailJSConfig();
      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'EmailJS configuration missing: NEXT_PUBLIC_EMAILJS_SERVICE_ID'
      );
    });
  });

  describe('initEmailJS', () => {
    it('initializes EmailJS when configuration is valid', () => {
      initEmailJS();

      expect(mockInit).toHaveBeenCalledWith('test_public_key');
      expect(consoleSpy).toHaveBeenCalledWith('EmailJS initialized successfully');
    });

    it('does not initialize when configuration is invalid', () => {
      delete process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      initEmailJS();

      expect(mockInit).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'EmailJS configuration missing: NEXT_PUBLIC_EMAILJS_PUBLIC_KEY'
      );
    });

    it('handles initialization errors', () => {
      mockInit.mockImplementationOnce(() => {
        throw new Error('Initialization failed');
      });

      initEmailJS();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to initialize EmailJS:',
        expect.any(Error)
      );
    });
  });

  describe('sendContactForm', () => {
    const mockFormData: ContactFormData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-123-4567',
      serviceInterest: 'Lawn Care',
      propertyType: 'Residential',
      message: 'I need landscaping services for my yard.',
    };

    it('sends email successfully with valid data', async () => {
      const mockResponse: EmailJSResponse = {
        status: 200,
        text: 'OK',
        size: 0,
        timeout: 5000,
      };

      mockSend.mockResolvedValueOnce(mockResponse);

      const result = await sendContactForm(mockFormData);

      expect(mockSend).toHaveBeenCalledWith(
        'test_service_id',
        'test_template_id',
        {
          from_name: 'John Doe',
          from_email: 'john.doe@example.com',
          from_phone: '555-123-4567',
          service_interest: 'Lawn Care',
          property_type: 'Residential',
          message: 'I need landscaping services for my yard.',
          to_name: 'Josh Cagle',
          submission_date: expect.any(String),
        }
      );

      expect(result).toEqual(mockResponse);
      expect(consoleSpy).toHaveBeenCalledWith('Contact form sent successfully');
    });

    it('handles missing optional fields', async () => {
      const incompleteFormData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        message: 'Quick question about pricing.',
      };

      const mockResponse: EmailJSResponse = {
        status: 200,
        text: 'OK',
        size: 0,
        timeout: 5000,
      };

      mockSend.mockResolvedValueOnce(mockResponse);

      const result = await sendContactForm(incompleteFormData);

      expect(mockSend).toHaveBeenCalledWith(
        'test_service_id',
        'test_template_id',
        {
          from_name: 'Jane Smith',
          from_email: 'jane@example.com',
          from_phone: undefined,
          service_interest: undefined,
          property_type: undefined,
          message: 'Quick question about pricing.',
          to_name: 'Josh Cagle',
          submission_date: expect.any(String),
        }
      );

      expect(result).toEqual(mockResponse);
    });

    it('throws error when configuration is invalid', async () => {
      delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;

      await expect(sendContactForm(mockFormData)).rejects.toThrow(
        'EmailJS is not properly configured'
      );

      expect(mockSend).not.toHaveBeenCalled();
    });

    it('handles EmailJS send failure', async () => {
      const error = new Error('Network error');
      mockSend.mockRejectedValueOnce(error);

      await expect(sendContactForm(mockFormData)).rejects.toThrow('Network error');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to send contact form:',
        error
      );
    });

    it('formats submission date correctly', async () => {
      const mockResponse: EmailJSResponse = {
        status: 200,
        text: 'OK',
        size: 0,
        timeout: 5000,
      };

      mockSend.mockResolvedValueOnce(mockResponse);

      await sendContactForm(mockFormData);

      const callArgs = mockSend.mock.calls[0][2];
      expect(callArgs.submission_date).toMatch(/\d{1,2}\/\d{1,2}\/\d{4} at \d{1,2}:\d{2} (AM|PM)/);
    });

    it('combines first and last name correctly', async () => {
      const formDataWithNames = {
        ...mockFormData,
        firstName: 'John',
        lastName: 'Doe',
      };

      const mockResponse: EmailJSResponse = {
        status: 200,
        text: 'OK',
        size: 0,
        timeout: 5000,
      };

      mockSend.mockResolvedValueOnce(mockResponse);

      await sendContactForm(formDataWithNames);

      const callArgs = mockSend.mock.calls[0][2];
      expect(callArgs.from_name).toBe('John Doe');
    });

    it('handles single name when lastName is missing', async () => {
      const formDataSingleName = {
        ...mockFormData,
        firstName: 'John',
        lastName: '',
      };

      const mockResponse: EmailJSResponse = {
        status: 200,
        text: 'OK',
        size: 0,
        timeout: 5000,
      };

      mockSend.mockResolvedValueOnce(mockResponse);

      await sendContactForm(formDataSingleName);

      const callArgs = mockSend.mock.calls[0][2];
      expect(callArgs.from_name).toBe('John');
    });

    it('sanitizes form data before sending', async () => {
      const formDataWithScripts = {
        ...mockFormData,
        firstName: '<script>alert("xss")</script>John',
        message: 'Message with <script>malicious code</script>',
      };

      const mockResponse: EmailJSResponse = {
        status: 200,
        text: 'OK',
        size: 0,
        timeout: 5000,
      };

      mockSend.mockResolvedValueOnce(mockResponse);

      await sendContactForm(formDataWithScripts);

      const callArgs = mockSend.mock.calls[0][2];
      expect(callArgs.from_name).not.toContain('<script>');
      expect(callArgs.message).not.toContain('<script>');
    });

    it('validates email format', async () => {
      const formDataInvalidEmail = {
        ...mockFormData,
        email: 'invalid-email-format',
      };

      await expect(sendContactForm(formDataInvalidEmail)).rejects.toThrow();
    });

    it('validates required fields', async () => {
      const incompleteData = {
        firstName: 'John',
        // Missing required fields
      };

      await expect(sendContactForm(incompleteData)).rejects.toThrow();
    });

    it('handles very long messages', async () => {
      const longMessage = 'x'.repeat(5000);
      const formDataLongMessage = {
        ...mockFormData,
        message: longMessage,
      };

      const mockResponse: EmailJSResponse = {
        status: 200,
        text: 'OK',
        size: 0,
        timeout: 5000,
      };

      mockSend.mockResolvedValueOnce(mockResponse);

      const result = await sendContactForm(formDataLongMessage);

      expect(result).toEqual(mockResponse);
      const callArgs = mockSend.mock.calls[0][2];
      expect(callArgs.message).toHaveLength(5000);
    });

    it('handles special characters in form data', async () => {
      const formDataSpecialChars = {
        ...mockFormData,
        firstName: 'José',
        lastName: 'García',
        message: 'Message with émojis 🌿 and special chars: ñáéíóú',
      };

      const mockResponse: EmailJSResponse = {
        status: 200,
        text: 'OK',
        size: 0,
        timeout: 5000,
      };

      mockSend.mockResolvedValueOnce(mockResponse);

      const result = await sendContactForm(formDataSpecialChars);

      expect(result).toEqual(mockResponse);
      const callArgs = mockSend.mock.calls[0][2];
      expect(callArgs.from_name).toBe('José García');
      expect(callArgs.message).toContain('émojis 🌿');
    });

    it('retries on temporary failures', async () => {
      // First call fails, second succeeds
      mockSend
        .mockRejectedValueOnce(new Error('Temporary failure'))
        .mockResolvedValueOnce({
          status: 200,
          text: 'OK',
          size: 0,
          timeout: 5000,
        });

      const result = await sendContactForm(mockFormData);

      expect(mockSend).toHaveBeenCalledTimes(2);
      expect(result.status).toBe(200);
    });

    it('fails after maximum retry attempts', async () => {
      const error = new Error('Persistent failure');
      mockSend.mockRejectedValue(error);

      await expect(sendContactForm(mockFormData)).rejects.toThrow('Persistent failure');

      expect(mockSend).toHaveBeenCalledTimes(3); // Initial + 2 retries
    });
  });

  describe('Rate limiting', () => {
    it('prevents spam submissions', async () => {
      const mockResponse: EmailJSResponse = {
        status: 200,
        text: 'OK',
        size: 0,
        timeout: 5000,
      };

      mockSend.mockResolvedValue(mockResponse);

      // Send first email
      await sendContactForm(mockFormData);

      // Try to send second email immediately
      await expect(sendContactForm(mockFormData)).rejects.toThrow(/rate limit/i);

      expect(mockSend).toHaveBeenCalledTimes(1);
    });
  });
});