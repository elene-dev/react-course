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
    image_url: 'https://deathnote.com/light.jpg',
  },
  {
    mal_id: 2,
    name: 'Misa Amane',
    description: 'A model who owns a Death Note.',
    name_kanji: '弥海砂',
    nicknames: ['Second Kira'],
    role: 'Character',
    favorites: 25000,
    image_url: 'https://deathnote.com/misa.jpg',
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
