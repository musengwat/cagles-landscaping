import { cn } from '@/lib/utils';
import '@testing-library/jest-dom';

describe('Utils Library', () => {
  describe('cn function', () => {
    it('combines class names correctly', () => {
      const result = cn('class1', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('handles conditional classes', () => {
      const result = cn('base-class', true && 'conditional-class', false && 'hidden-class');
      expect(result).toBe('base-class conditional-class');
    });

    it('handles undefined and null values', () => {
      const result = cn('base-class', undefined, null, 'another-class');
      expect(result).toBe('base-class another-class');
    });

    it('handles empty strings', () => {
      const result = cn('base-class', '', 'another-class');
      expect(result).toBe('base-class another-class');
    });

    it('deduplicates classes using tailwind-merge', () => {
      const result = cn('px-4', 'px-8'); // px-8 should override px-4
      expect(result).toBe('px-8');
    });

    it('handles complex Tailwind class conflicts', () => {
      const result = cn(
        'bg-red-500',
        'bg-blue-500', // Should override red
        'text-white',
        'text-black' // Should override white
      );
      expect(result).toBe('bg-blue-500 text-black');
    });

    it('preserves non-conflicting classes', () => {
      const result = cn(
        'flex',
        'items-center',
        'justify-between',
        'px-4',
        'py-2'
      );
      expect(result).toBe('flex items-center justify-between px-4 py-2');
    });

    it('handles array inputs', () => {
      const result = cn(['class1', 'class2'], 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('handles object inputs with conditional values', () => {
      const result = cn({
        'active': true,
        'disabled': false,
        'highlighted': true
      });
      expect(result).toBe('active highlighted');
    });

    it('combines all input types', () => {
      const result = cn(
        'base',
        ['array1', 'array2'],
        {
          'conditional': true,
          'hidden': false
        },
        'final-class'
      );
      expect(result).toBe('base array1 array2 conditional final-class');
    });

    it('returns empty string for no inputs', () => {
      const result = cn();
      expect(result).toBe('');
    });
  });
});