import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Search from './Search';
import userEvent from '@testing-library/user-event';

describe('Search', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders search input and button', () => {
    render(<Search handleSearch={vi.fn()} />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('shows saved search from localstorage', () => {
    localStorage.setItem('lastSearch', 'light');

    render(<Search handleSearch={vi.fn()} />);

    expect(screen.getByPlaceholderText('Search...')).toHaveValue('light');
  });

  it('changes input value when user types', async () => {
    const user = userEvent.setup();

    render(<Search handleSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText('Search...');

    await user.type(input, 'misa');

    expect(input).toHaveValue('misa');
  });

  it('saves and searches trimmed input value', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();

    render(<Search handleSearch={handleSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, '  misa  ');
    await user.click(button);

    expect(localStorage.getItem('lastSearch')).toBe('misa');
    expect(handleSearch).toHaveBeenCalledWith('misa');
  });

  it('disables search when value matches last submission', () => {
    localStorage.setItem('lastSearch', 'light');
    const handleSearch = vi.fn();

    render(<Search handleSearch={handleSearch} />);

    const button = screen.getByRole('button', { name: 'Search' });

    expect(button).toBeDisabled();
    expect(handleSearch).not.toHaveBeenCalled();
  });
});
