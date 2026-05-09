import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import type { Character } from '../../models/Character';

const characters: Character[] = [
  {
    mal_id: 1,
    name: 'Light Yagami',
    description: 'A student who finds the Death Note.',
    name_kanji: '夜神月',
    nicknames: ['Kira'],
    role: 'Character',
    favorites: 50000,
    image_url:
      'https://upload.wikimedia.org/wikipedia/en/0/0c/Light_from_Death_Note.jpg',
  },
  {
    mal_id: 2,
    name: 'Misa Amane',
    description: 'A model who owns a Death Note.',
    name_kanji: '弥海砂',
    nicknames: ['Second Kira'],
    role: 'Character',
    favorites: 25000,
    image_url:
      'https://static.wikia.nocookie.net/deathnote/images/0/0c/Misa_amane.jpg/revision/latest?cb=20130526210643',
  },
];

describe('CardList', () => {
  it('renders all character cards', () => {
    render(<CardList characters={characters} />);

    expect(screen.getByText('Light Yagami')).toBeInTheDocument();
    expect(screen.getByText('Misa Amane')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(2);
  });
});
