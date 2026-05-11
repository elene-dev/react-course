import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { deathNoteCharacters } from '../../test-utils/mockCharacters';

describe('CardList', () => {
  it('renders all character cards', () => {
    render(<CardList characters={deathNoteCharacters} />);

    expect(screen.getByText('Light Yagami')).toBeInTheDocument();
    expect(screen.getByText('Misa Amane')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(2);
  });
});
