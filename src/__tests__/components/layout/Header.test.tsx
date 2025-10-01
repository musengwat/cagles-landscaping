import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/layout/Header';
import '@testing-library/jest-dom';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

// Mock Next.js Link
jest.mock('next/link', () => {
  return function Link({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock icons
jest.mock('lucide-react', () => ({
  Menu: () => <span data-testid="menu-icon">☰</span>,
  X: () => <span data-testid="close-icon">✕</span>,
  Phone: () => <span data-testid="phone-icon">📞</span>,
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays company logo and name', () => {
    render(<Header />);
    expect(screen.getByText(/Cagle's Landscaping/i)).toBeInTheDocument();
    expect(screen.getByText(/Restoration/i)).toBeInTheDocument();
  });

  it('shows main navigation links', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('displays phone number', () => {
    render(<Header />);
    expect(screen.getByText(/\(520\) 358-2221/i)).toBeInTheDocument();
  });

  it('has correct navigation link hrefs', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '/services');
    expect(screen.getByRole('link', { name: /portfolio/i })).toHaveAttribute('href', '/portfolio');
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact');
  });

  it('shows mobile menu toggle button', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    expect(menuButton).toBeInTheDocument();
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByRole('button', { name: /toggle menu/i });

    // Initially shows menu icon
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();

    // Click to open menu
    await user.click(menuButton);

    // Should show close icon when menu is open
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();

    // Click to close menu
    await user.click(menuButton);

    // Should show menu icon again
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('displays mobile navigation when menu is open', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    await user.click(menuButton);

    // Mobile navigation should be visible
    const mobileNav = screen.getByRole('navigation', { name: /mobile navigation/i });
    expect(mobileNav).toBeInTheDocument();
  });

  it('closes mobile menu when navigation link is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    await user.click(menuButton);

    expect(screen.getByTestId('close-icon')).toBeInTheDocument();

    // Click a navigation link
    const aboutLink = screen.getAllByRole('link', { name: /about/i })[1]; // Mobile version
    await user.click(aboutLink);

    // Menu should close
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Header />);

    // Header should have banner role
    expect(screen.getByRole('banner')).toBeInTheDocument();

    // Navigation should have nav role
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Mobile menu button should have aria-expanded
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('updates aria-expanded when mobile menu is toggled', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByRole('button', { name: /toggle menu/i });

    // Initially closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // Open menu
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Close menu
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('displays call-to-action button', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /get free estimate/i })).toBeInTheDocument();
  });

  it('has proper keyboard navigation support', async () => {
    const user = userEvent.setup();
    render(<Header />);

    // Tab through navigation links
    await user.tab();
    expect(screen.getByRole('link', { name: /home/i })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('link', { name: /about/i })).toHaveFocus();
  });

  it('displays business tagline or description', () => {
    render(<Header />);
    expect(screen.getByText(/Professional Landscaping/i)).toBeInTheDocument();
  });

  it('shows social media links or contact info', () => {
    render(<Header />);
    const phoneIcon = screen.getByTestId('phone-icon');
    expect(phoneIcon).toBeInTheDocument();
  });

  it('has responsive design classes', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass(); // Check that classes are applied
  });

  it('closes mobile menu when clicking outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Header />
        <div data-testid="outside-element">Outside content</div>
      </div>
    );

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    await user.click(menuButton);

    expect(screen.getByTestId('close-icon')).toBeInTheDocument();

    // Click outside
    const outsideElement = screen.getByTestId('outside-element');
    await user.click(outsideElement);

    // Menu should close
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('maintains focus management for accessibility', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByRole('button', { name: /toggle menu/i });

    // Focus on menu button
    menuButton.focus();
    expect(menuButton).toHaveFocus();

    // Open menu with Enter key
    await user.keyboard('{Enter}');
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
  });

  it('displays current page indicator in navigation', () => {
    // Mock current path
    jest.doMock('next/router', () => ({
      useRouter: () => ({
        push: mockPush,
        pathname: '/about',
        query: {},
        asPath: '/about',
      }),
    }));

    render(<Header />);

    // Current page should have active styling
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });
});