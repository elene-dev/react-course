import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from './ErrorBoundary';
import ErrorTester from './ErrorTester';

describe('ErrorTester', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders test error button', () => {
    render(<ErrorTester />);

    expect(
      screen.getByRole('button', { name: 'Test Error' })
    ).toBeInTheDocument();
  });

  it('shows fallback UI after button is clicked', async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = vi.spyOn(console, 'error');

    consoleErrorSpy.mockImplementation(() => undefined);

    render(
      <ErrorBoundary>
        <ErrorTester />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: 'Test Error' }));

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByText('Refresh the page and try again.')
    ).toBeInTheDocument();
  });
});
