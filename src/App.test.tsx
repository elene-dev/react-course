import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { getChars } from './api/jikan';
import type { Character } from './models/Character';

vi.mock('./api/jikan', () => ({
  getChars: vi.fn(),
}));

const characters: Character[] = [
  {
    mal_id: 1,
    name: 'Ichigo Kurosaki',
    description: 'A substitute Soul Reaper who protects the living world.',
    name_kanji: '黒崎一護',
    nicknames: ['Strawberry'],
    role: 'Character',
    favorites: 50000,
    image_url:
      'https://upload.wikimedia.org/wikipedia/en/1/1e/IchigoKurosakiBleach.jpg',
  },
  {
    mal_id: 2,
    name: 'Sosuke Aizen',
    description: 'A former captain with powerful illusion abilities.',
    name_kanji: '藍染惣右介',
    nicknames: ['Aizen'],
    role: 'Character',
    favorites: 25000,
    image_url: 'https://i.redd.it/pk48nwd6j39d1.jpeg',
  },
];

const manyCharacters: Character[] = [
  ...characters,
  {
    mal_id: 3,
    name: 'Rukia Kuchiki',
    description: 'A Soul Reaper from the Kuchiki clan.',
    name_kanji: '朽木ルキア',
    nicknames: ['Rukia'],
    role: 'Character',
    favorites: 20000,
    image_url:
      'https://upload.wikimedia.org/wikipedia/en/0/0c/RukiaKuchikiKubo.jpg',
  },
  {
    mal_id: 4,
    name: 'Renji Abarai',
    description: 'A lieutenant of the sixth division.',
    name_kanji: '阿散井恋次',
    nicknames: ['Renji'],
    role: 'Character',
    favorites: 15000,
    image_url:
      'https://static.wikia.nocookie.net/bleach/images/8/81/Ep320RenjiProfile.png/revision/latest/scale-to-width/360?cb=20231105054609&path-prefix=en',
  },
];

const mockedGetChars = vi.mocked(getChars);

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    mockedGetChars.mockReset();
  });

  it('loads characters from localStorage with saved search', async () => {
    localStorage.setItem('lastSearch', 'ichigo');
    mockedGetChars.mockResolvedValue(characters);

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
    mockedGetChars.mockResolvedValue(characters);

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
    mockedGetChars.mockResolvedValueOnce(characters);

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
    mockedGetChars.mockResolvedValue(characters);

    render(<App />);

    await screen.findByRole('heading', { name: 'Ichigo Kurosaki' });

    const button = screen.getByRole('button', { name: 'Search' });

    expect(button).toBeDisabled();

    await user.click(button);

    expect(mockedGetChars).toHaveBeenCalledTimes(1);
  });

  it('changes character list when buttons for pagination are clicked', async () => {
    const user = userEvent.setup();

    mockedGetChars.mockResolvedValue(manyCharacters);

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
