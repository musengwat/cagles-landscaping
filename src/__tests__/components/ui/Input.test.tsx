import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/Input';
import '@testing-library/jest-dom';

describe('Input Component', () => {
  it('renders without crashing', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays the correct placeholder text', () => {
    const placeholder = 'Enter your name';
    render(<Input placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('handles text input correctly', async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'Hello World');

    expect(input).toHaveValue('Hello World');
  });

  it('calls onChange handler when value changes', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(4); // Once for each character
  });

  it('displays with disabled state', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('shows required attribute', () => {
    render(<Input required />);
    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  it('handles different input types', () => {
    const { rerender } = render(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" />);
    expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'password');

    rerender(<Input type="tel" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
  });

  it('applies custom className', () => {
    const customClass = 'custom-input-class';
    render(<Input className={customClass} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(customClass);
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('handles defaultValue prop', () => {
    const defaultValue = 'Default text';
    render(<Input defaultValue={defaultValue} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(defaultValue);
  });

  it('handles controlled value prop', () => {
    const value = 'Controlled value';
    render(<Input value={value} onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(value);
  });

  it('handles onFocus and onBlur events', async () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const user = userEvent.setup();

    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);

    const input = screen.getByRole('textbox');

    await user.click(input);
    expect(handleFocus).toHaveBeenCalled();

    await user.tab();
    expect(handleBlur).toHaveBeenCalled();
  });

  it('displays error state styling', () => {
    render(<Input error />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500'); // Assuming error styling includes red border
  });

  it('shows helper text when provided', () => {
    const helperText = 'This is helper text';
    render(<Input helperText={helperText} />);
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    const errorMessage = 'This field is required';
    render(<Input error errorMessage={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('has proper ARIA attributes for accessibility', () => {
    const label = 'Email Address';
    render(<Input aria-label={label} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-label', label);
  });

  it('handles maxLength attribute', () => {
    const maxLength = 10;
    render(<Input maxLength={maxLength} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxLength', maxLength.toString());
  });

  it('handles minLength attribute', () => {
    const minLength = 5;
    render(<Input minLength={minLength} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('minLength', minLength.toString());
  });

  it('supports autoComplete attribute', () => {
    render(<Input autoComplete="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('autoComplete', 'email');
  });

  it('handles pattern attribute for validation', () => {
    const pattern = '[0-9]{3}-[0-9]{3}-[0-9]{4}';
    render(<Input pattern={pattern} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('pattern', pattern);
  });

  it('supports readOnly attribute', () => {
    render(<Input readOnly />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readOnly');
  });

  it('handles step attribute for number inputs', () => {
    render(<Input type="number" step="0.01" />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('step', '0.01');
  });

  it('handles min and max attributes for number inputs', () => {
    render(<Input type="number" min="0" max="100" />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
  });

  it('applies different size variants', () => {
    const { rerender } = render(<Input size="sm" />);
    let input = screen.getByRole('textbox');
    expect(input).toHaveClass('text-sm'); // Assuming small size uses text-sm

    rerender(<Input size="lg" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('text-lg'); // Assuming large size uses text-lg
  });

  it('handles multiple CSS classes correctly', () => {
    const customClasses = 'border-2 rounded-lg shadow-md';
    render(<Input className={customClasses} />);
    const input = screen.getByRole('textbox');

    customClasses.split(' ').forEach(className => {
      expect(input).toHaveClass(className);
    });
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole('textbox');

    await user.tab();
    expect(input).toHaveFocus();
  });

  it('handles special characters in input', async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole('textbox');
    const specialText = '!@#$%^&*()_+[]{}|;:,.<>?';
    await user.type(input, specialText);

    expect(input).toHaveValue(specialText);
  });

  it('clears input when clear button is used', async () => {
    const user = userEvent.setup();
    render(<Input clearable />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'text to clear');

    const clearButton = screen.getByRole('button', { name: /clear/i });
    await user.click(clearButton);

    expect(input).toHaveValue('');
  });
});