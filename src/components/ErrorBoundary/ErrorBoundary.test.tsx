import { Component, type ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

class ErrorComponent extends Component {
  render(): ReactNode {
    const throwError = true;

    if (throwError) {
      throw new Error('Test error');
    }

    return null;
  }
}

describe('ErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children normally when there is no error', () => {
    render(
      <ErrorBoundary>
        <p>App content</p>
      </ErrorBoundary>
    );

    expect(screen.getByText('App content')).toBeInTheDocument();
  });

  it('shows fallback UI when a child throws an error', () => {
    const silenceError = () => undefined;
    const consoleErrorSpy = vi.spyOn(console, 'error');

    consoleErrorSpy.mockImplementation(silenceError);

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByText('Refresh the page and try again.')
    ).toBeInTheDocument();
  });

  it('logs the error when a child throws it', () => {
    const silenceError = () => undefined;
    const consoleErrorSpy = vi.spyOn(console, 'error');

    const consoleError = consoleErrorSpy.mockImplementation(silenceError);

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(consoleError).toHaveBeenCalled();
  });
});
