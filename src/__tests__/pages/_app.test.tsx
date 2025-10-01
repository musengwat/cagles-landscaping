import { render } from '@testing-library/react';
import MyApp from '@/pages/_app';
import type { AppProps } from 'next/app';
import '@testing-library/jest-dom';

// Mock the Layout and performance components
jest.mock('@/lib/performance', () => ({
  initWebVitals: jest.fn(),
  reportWebVitals: jest.fn(),
}));

const mockAppProps: AppProps = {
  Component: () => <div>Test Component</div>,
  pageProps: {},
};

describe('_app', () => {
  it('renders without crashing', () => {
    render(<MyApp {...mockAppProps} />);
    expect(document.body).toBeInTheDocument();
  });

  it('renders the component', () => {
    const { container } = render(<MyApp {...mockAppProps} />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});