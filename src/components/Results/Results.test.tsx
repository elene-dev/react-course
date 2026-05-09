import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Results from './Results';
import type { Character } from '../../models/Character';

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

describe('Results', () => {
  it('shows placeholder image when characters array is empty', () => {
    render(<Results characters={[]} />);

    expect(
      screen.getByRole('img', { name: 'Results placeholder' })
    ).toBeInTheDocument();
  });

  it('renders character cards when characters array is not empty', () => {
    render(<Results characters={characters} />);

    expect(
      screen.getByRole('heading', { name: 'Ichigo Kurosaki' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Sosuke Aizen' })
    ).toBeInTheDocument();
  });

  it('does not show placeholder image when characters exist', () => {
    render(<Results characters={characters} />);

    expect(
      screen.queryByRole('img', { name: 'Results placeholder' })
    ).not.toBeInTheDocument();
  });
});
