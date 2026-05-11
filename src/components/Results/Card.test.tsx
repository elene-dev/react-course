import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import type { Character } from '../../models/Character';
import { lightCharacter } from '../../test-utils/mockCharacters';

describe('Card', () => {
  it('displays full information of the character', () => {
    render(<Card {...lightCharacter} />);

    expect(
      screen.getByRole('heading', { name: 'Light Yagami' })
    ).toBeInTheDocument();
    expect(screen.getByText('Kanji: 夜神月')).toBeInTheDocument();
    expect(
      screen.getByText('A student who finds the Death Note.')
    ).toBeInTheDocument();
    expect(screen.getByText('Nicknames: Kira')).toBeInTheDocument();
    expect(screen.getByText('Role: Character')).toBeInTheDocument();
    expect(screen.getByText('Favorites: 50,000')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Light Yagami' })).toHaveAttribute(
      'src',
      'https://upload.wikimedia.org/wikipedia/en/0/0c/Light_from_Death_Note.jpg'
    );
  });

  it('shows No Nickname Found if nicknames array is empty', () => {
    const noNicknameCharacter: Character = {
      ...lightCharacter,
      nicknames: [],
    };

    render(<Card {...noNicknameCharacter} />);

    expect(
      screen.getByText('Nicknames: No Nickname Found')
    ).toBeInTheDocument();
  });

  it('shows formatted nicknames when character has several', () => {
    const severalNicknameCharacter: Character = {
      ...lightCharacter,
      nicknames: ['Kira', 'God of the New World'],
    };

    render(<Card {...severalNicknameCharacter} />);

    expect(
      screen.getByText('Nicknames: Kira, God of the New World')
    ).toBeInTheDocument();
  });
});
