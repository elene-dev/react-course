import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { getChars } from './api/jikan';
import {
  bleachCharacters,
  bleachCharactersWithPagination,
} from './test-utils/mockCharacters';

vi.mock('./api/jikan', () => ({
  getChars: vi.fn(),
}));

const mockedGetChars = vi.mocked(getChars);

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    mockedGetChars.mockReset();
  });

  it('loads characters from localStorage with saved search', async () => {
    localStorage.setItem('lastSearch', 'ichigo');
    mockedGetChars.mockResolvedValue(bleachCharacters);

    render(<App />);

    expect(mockedGetChars).toHaveBeenCalledWith('ichigo');

    expect(
      await screen.findByRole('heading', { name: 'Ichigo Kurosaki' })
    ).toBeInTheDocument();
  });

  it('shows spinner when characters are loading', () => {
    mockedGetChars.mockImplementation(() => new Promise(() => {}));

    render(<App />);

    expect(screen.getByAltText('loading')).toBeInTheDocument();
  });

  it('loads first page when there is no saved search', async () => {
    mockedGetChars.mockResolvedValue(bleachCharacters);

    render(<App />);

    expect(mockedGetChars).toHaveBeenCalledWith('');

    expect(
      await screen.findByRole('heading', { name: 'Ichigo Kurosaki' })
    ).toBeInTheDocument();
  });

  it('shows error message when loading characters fails', async () => {
    mockedGetChars.mockRejectedValue(new Error('API error'));

    render(<App />);

    expect(
      await screen.findByText('Something went wrong. Please try again.')
    ).toBeInTheDocument();
  });

  it('searches characters typed by the user', async () => {
    const user = userEvent.setup();

    mockedGetChars.mockResolvedValueOnce([]);
    mockedGetChars.mockResolvedValueOnce(bleachCharacters);

    render(<App />);

    await screen.findByAltText('Results placeholder');

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, 'ichigo');
    await user.click(button);

    expect(mockedGetChars).toHaveBeenLastCalledWith('ichigo');

    expect(
      await screen.findByRole('heading', { name: 'Ichigo Kurosaki' })
    ).toBeInTheDocument();
  });

  it('does not repeat search when search has not changed', async () => {
    const user = userEvent.setup();

    localStorage.setItem('lastSearch', 'ichigo');
    mockedGetChars.mockResolvedValue(bleachCharacters);

    render(<App />);

    await screen.findByRole('heading', { name: 'Ichigo Kurosaki' });

    const button = screen.getByRole('button', { name: 'Search' });

    expect(button).toBeDisabled();

    await user.click(button);

    expect(mockedGetChars).toHaveBeenCalledTimes(1);
  });

  it('changes character list when buttons for pagination are clicked', async () => {
    const user = userEvent.setup();

    mockedGetChars.mockResolvedValue(bleachCharactersWithPagination);

    render(<App />);

    expect(
      await screen.findByRole('heading', { name: 'Ichigo Kurosaki' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Sosuke Aizen' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Rukia Kuchiki' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Renji Abarai' })
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(
      screen.getByRole('heading', { name: 'Renji Abarai' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Ichigo Kurosaki' })
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Previous' }));

    expect(
      screen.getByRole('heading', { name: 'Ichigo Kurosaki' })
    ).toBeInTheDocument();
  });
});
