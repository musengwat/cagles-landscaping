import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '@/components/ui/Textarea';
import '@testing-library/jest-dom';

describe('Textarea Component', () => {
  it('renders without crashing', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays the correct placeholder text', () => {
    const placeholder = 'Enter your message';
    render(<Textarea placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('handles text input correctly', async () => {
    const user = userEvent.setup();
    render(<Textarea />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Hello World\nMultiple lines');

    expect(textarea).toHaveValue('Hello World\nMultiple lines');
  });

  it('calls onChange handler when value changes', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<Textarea onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'test');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(4); // Once for each character
  });

  it('displays with disabled state', () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('shows required attribute', () => {
    render(<Textarea required />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeRequired();
  });

  it('applies custom className', () => {
    const customClass = 'custom-textarea-class';
    render(<Textarea className={customClass} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(customClass);
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Textarea ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('handles defaultValue prop', () => {
    const defaultValue = 'Default text content';
    render(<Textarea defaultValue={defaultValue} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(defaultValue);
  });

  it('handles controlled value prop', () => {
    const value = 'Controlled value';
    render(<Textarea value={value} onChange={() => {}} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(value);
  });

  it('handles onFocus and onBlur events', async () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const user = userEvent.setup();

    render(<Textarea onFocus={handleFocus} onBlur={handleBlur} />);

    const textarea = screen.getByRole('textbox');

    await user.click(textarea);
    expect(handleFocus).toHaveBeenCalled();

    await user.tab();
    expect(handleBlur).toHaveBeenCalled();
  });

  it('displays error state styling', () => {
    render(<Textarea error />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-red-500'); // Assuming error styling includes red border
  });

  it('shows helper text when provided', () => {
    const helperText = 'This is helper text for textarea';
    render(<Textarea helperText={helperText} />);
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    const errorMessage = 'This field is required';
    render(<Textarea error errorMessage={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('has proper ARIA attributes for accessibility', () => {
    const label = 'Message Content';
    render(<Textarea aria-label={label} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-label', label);
  });

  it('handles maxLength attribute', () => {
    const maxLength = 500;
    render(<Textarea maxLength={maxLength} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('maxLength', maxLength.toString());
  });

  it('handles minLength attribute', () => {
    const minLength = 10;
    render(<Textarea minLength={minLength} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('minLength', minLength.toString());
  });

  it('supports rows attribute for height', () => {
    const rows = 5;
    render(<Textarea rows={rows} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', rows.toString());
  });

  it('supports cols attribute for width', () => {
    const cols = 50;
    render(<Textarea cols={cols} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('cols', cols.toString());
  });

  it('supports readOnly attribute', () => {
    render(<Textarea readOnly />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readOnly');
  });

  it('handles resize property', () => {
    render(<Textarea resize="none" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveStyle('resize: none');
  });

  it('applies different size variants', () => {
    const { rerender } = render(<Textarea size="sm" />);
    let textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('text-sm'); // Assuming small size uses text-sm

    rerender(<Textarea size="lg" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('text-lg'); // Assuming large size uses text-lg
  });

  it('handles multiple CSS classes correctly', () => {
    const customClasses = 'border-2 rounded-lg shadow-md';
    render(<Textarea className={customClasses} />);
    const textarea = screen.getByRole('textbox');

    customClasses.split(' ').forEach(className => {
      expect(textarea).toHaveClass(className);
    });
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Textarea />);

    const textarea = screen.getByRole('textbox');

    await user.tab();
    expect(textarea).toHaveFocus();
  });

  it('handles line breaks correctly', async () => {
    const user = userEvent.setup();
    render(<Textarea />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Line 1{enter}Line 2{enter}Line 3');

    expect(textarea).toHaveValue('Line 1\nLine 2\nLine 3');
  });

  it('displays character count when provided', () => {
    const maxLength = 100;
    render(<Textarea maxLength={maxLength} showCharacterCount />);

    expect(screen.getByText('0/100')).toBeInTheDocument();
  });

  it('updates character count as user types', async () => {
    const user = userEvent.setup();
    const maxLength = 100;
    render(<Textarea maxLength={maxLength} showCharacterCount />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Hello');

    expect(screen.getByText('5/100')).toBeInTheDocument();
  });

  it('handles auto-resize functionality', async () => {
    const user = userEvent.setup();
    render(<Textarea autoResize />);

    const textarea = screen.getByRole('textbox');
    const initialHeight = textarea.style.height;

    // Type multiple lines
    await user.type(textarea, 'Line 1{enter}Line 2{enter}Line 3{enter}Line 4');

    // Height should increase (implementation specific)
    expect(textarea.style.height).not.toBe(initialHeight);
  });

  it('supports spellcheck attribute', () => {
    render(<Textarea spellCheck={false} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('spellcheck', 'false');
  });

  it('handles wrap attribute', () => {
    render(<Textarea wrap="hard" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('wrap', 'hard');
  });

  it('clears textarea when clear button is used', async () => {
    const user = userEvent.setup();
    render(<Textarea clearable />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'text to clear');

    const clearButton = screen.getByRole('button', { name: /clear/i });
    await user.click(clearButton);

    expect(textarea).toHaveValue('');
  });

  it('validates input length correctly', async () => {
    const user = userEvent.setup();
    const maxLength = 10;
    render(<Textarea maxLength={maxLength} />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'This is a very long text that exceeds the limit');

    // Should truncate to maxLength
    expect(textarea.value.length).toBeLessThanOrEqual(maxLength);
  });

  it('handles form submission correctly', () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(
      <form onSubmit={handleSubmit}>
        <Textarea name="message" defaultValue="Test message" />
        <button type="submit">Submit</button>
      </form>
    );

    const form = screen.getByRole('form') || screen.getByTestId('form');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    submitButton.click();
    expect(handleSubmit).toHaveBeenCalled();
  });
});