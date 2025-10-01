import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/features/ContactForm';
import '@testing-library/jest-dom';

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  send: jest.fn(),
  init: jest.fn(),
}));

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service interest/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project details/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('displays validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/project details.*required/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'invalid-email');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('validates phone number format', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const phoneInput = screen.getByLabelText(/phone number/i);
    await user.type(phoneInput, '123');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument();
    });
  });

  it('shows loading state during form submission', async () => {
    const emailjs = jest.requireActual('@emailjs/browser');
    const { send } = emailjs;
    send.mockResolvedValue({ status: 200 });

    const user = userEvent.setup();
    render(<ContactForm />);

    // Fill out the form
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    expect(screen.getByText(/sending/i)).toBeInTheDocument();
  });

  it('shows success message on successful submission', async () => {
    const emailjs = jest.requireActual('@emailjs/browser');
    const { send } = emailjs;
    send.mockResolvedValue({ status: 200 });

    const user = userEvent.setup();
    render(<ContactForm />);

    // Fill out the form with valid data
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '555-123-4567');
    await user.selectOptions(screen.getByLabelText(/service type/i), 'Lawn Care');
    await user.selectOptions(screen.getByLabelText(/property type/i), 'Residential');
    await user.type(screen.getByLabelText(/message/i), 'I need landscaping services');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
    });
  });

  it('shows error message on failed submission', async () => {
    const emailjs = jest.requireActual('@emailjs/browser');
    const { send } = emailjs;
    send.mockRejectedValue(new Error('Network error'));

    const user = userEvent.setup();
    render(<ContactForm />);

    // Fill out the form with valid data
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/sorry, there was an error/i)).toBeInTheDocument();
    });
  });

  it('has proper form accessibility attributes', () => {
    render(<ContactForm />);

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    // Check that all inputs have proper labels
    const requiredFields = ['First Name', 'Last Name', 'Email Address', 'Message'];
    requiredFields.forEach(fieldName => {
      const input = screen.getByLabelText(new RegExp(fieldName, 'i'));
      expect(input).toBeRequired();
    });
  });

  it('resets form after successful submission', async () => {
    const emailjs = jest.requireActual('@emailjs/browser');
    const { send } = emailjs;
    send.mockResolvedValue({ status: 200 });

    const user = userEvent.setup();
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const emailInput = screen.getByLabelText(/email address/i);

    // Fill out the form
    await user.type(firstNameInput, 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
    });

    // Check that form fields are reset
    expect(firstNameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
  });
});