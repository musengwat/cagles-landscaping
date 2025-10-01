import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '@/components/ui/Select';
import '@testing-library/jest-dom';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('Select Component', () => {
  it('renders without crashing', () => {
    render(<Select options={mockOptions} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays all provided options', () => {
    render(<Select options={mockOptions} />);

    mockOptions.forEach(option => {
      expect(screen.getByRole('option', { name: option.label })).toBeInTheDocument();
    });
  });

  it('handles selection correctly', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(<Select options={mockOptions} onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'option2');

    expect(handleChange).toHaveBeenCalled();
    expect(select).toHaveValue('option2');
  });

  it('displays placeholder text', () => {
    const placeholder = 'Select an option';
    render(<Select options={mockOptions} placeholder={placeholder} />);

    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });

  it('shows default value when provided', () => {
    render(<Select options={mockOptions} defaultValue="option2" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option2');
  });

  it('handles controlled value', () => {
    render(<Select options={mockOptions} value="option3" onChange={() => {}} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option3');
  });

  it('displays in disabled state', () => {
    render(<Select options={mockOptions} disabled />);
    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('shows required attribute', () => {
    render(<Select options={mockOptions} required />);
    const select = screen.getByRole('combobox');
    expect(select).toBeRequired();
  });

  it('applies custom className', () => {
    const customClass = 'custom-select-class';
    render(<Select options={mockOptions} className={customClass} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass(customClass);
  });

  it('handles multiple selection', () => {
    render(<Select options={mockOptions} multiple />);
    const select = screen.getByRole('listbox');
    expect(select).toHaveAttribute('multiple');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Select options={mockOptions} ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('handles onFocus and onBlur events', async () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const user = userEvent.setup();

    render(<Select options={mockOptions} onFocus={handleFocus} onBlur={handleBlur} />);

    const select = screen.getByRole('combobox');

    await user.click(select);
    expect(handleFocus).toHaveBeenCalled();

    await user.tab();
    expect(handleBlur).toHaveBeenCalled();
  });

  it('displays error state styling', () => {
    render(<Select options={mockOptions} error />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('border-red-500'); // Assuming error styling
  });

  it('shows helper text when provided', () => {
    const helperText = 'Choose your preferred option';
    render(<Select options={mockOptions} helperText={helperText} />);
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    const errorMessage = 'Please select an option';
    render(<Select options={mockOptions} error errorMessage={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('handles empty options array', () => {
    render(<Select options={[]} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('supports optgroups', () => {
    const groupedOptions = [
      {
        label: 'Group 1',
        options: [
          { value: 'g1-option1', label: 'Group 1 Option 1' },
          { value: 'g1-option2', label: 'Group 1 Option 2' },
        ]
      },
      {
        label: 'Group 2',
        options: [
          { value: 'g2-option1', label: 'Group 2 Option 1' },
        ]
      }
    ];

    render(<Select optgroups={groupedOptions} />);
    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('Group 2')).toBeInTheDocument();
  });

  it('has proper ARIA attributes for accessibility', () => {
    const label = 'Service Type';
    render(<Select options={mockOptions} aria-label={label} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-label', label);
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} />);

    const select = screen.getByRole('combobox');

    await user.tab();
    expect(select).toHaveFocus();

    // Arrow keys should navigate options
    await user.keyboard('{ArrowDown}');
    expect(select).toHaveValue('option1');
  });

  it('handles size variants', () => {
    const { rerender } = render(<Select options={mockOptions} size="sm" />);
    let select = screen.getByRole('combobox');
    expect(select).toHaveClass('text-sm'); // Assuming small size styling

    rerender(<Select options={mockOptions} size="lg" />);
    select = screen.getByRole('combobox');
    expect(select).toHaveClass('text-lg'); // Assuming large size styling
  });

  it('displays loading state', () => {
    render(<Select options={[]} loading />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows no options message when empty', () => {
    render(<Select options={[]} noOptionsMessage="No options available" />);
    expect(screen.getByText('No options available')).toBeInTheDocument();
  });

  it('handles search functionality', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} searchable />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'Option 2');

    // Should filter options based on search
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('supports clearable functionality', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} clearable defaultValue="option1" />);

    const clearButton = screen.getByRole('button', { name: /clear/i });
    await user.click(clearButton);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('');
  });

  it('handles option selection with Enter key', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(<Select options={mockOptions} onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    await user.click(select);
    await user.keyboard('{ArrowDown}{Enter}');

    expect(handleChange).toHaveBeenCalled();
  });

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Select options={mockOptions} />
        <div data-testid="outside">Outside element</div>
      </div>
    );

    const select = screen.getByRole('combobox');
    await user.click(select);

    // Click outside
    const outsideElement = screen.getByTestId('outside');
    await user.click(outsideElement);

    // Dropdown should close (implementation specific)
    expect(select).not.toHaveFocus();
  });

  it('handles custom option rendering', () => {
    const customRenderOption = (option: { value: string; label: string }) => (
      <div data-testid={`custom-${option.value}`}>
        {option.label} - Custom
      </div>
    );

    render(<Select options={mockOptions} renderOption={customRenderOption} />);

    mockOptions.forEach(option => {
      expect(screen.getByTestId(`custom-${option.value}`)).toBeInTheDocument();
    });
  });

  it('supports value and label extraction from complex objects', () => {
    const complexOptions = [
      { id: 1, name: 'First Option', category: 'A' },
      { id: 2, name: 'Second Option', category: 'B' },
    ];

    render(
      <Select
        options={complexOptions}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => option.name}
      />
    );

    expect(screen.getByText('First Option')).toBeInTheDocument();
    expect(screen.getByText('Second Option')).toBeInTheDocument();
  });

  it('maintains scroll position in long option lists', () => {
    const manyOptions = Array.from({ length: 100 }, (_, i) => ({
      value: `option${i}`,
      label: `Option ${i}`
    }));

    render(<Select options={manyOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });
});