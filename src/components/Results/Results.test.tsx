import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Results from './Results';
import { bleachCharacters } from '../../test-utils/mockCharacters';

describe('Results', () => {
  it('shows placeholder image when characters array is empty', () => {
    render(<Results characters={[]} />);

    expect(
      screen.getByRole('img', { name: 'Results placeholder' })
    ).toBeInTheDocument();
  });

  it('renders character cards when characters array is not empty', () => {
    render(<Results characters={bleachCharacters} />);

    expect(
      screen.getByRole('heading', { name: 'Ichigo Kurosaki' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Sosuke Aizen' })
    ).toBeInTheDocument();
  });

  it('does not show placeholder image when characters exist', () => {
    render(<Results characters={bleachCharacters} />);

    expect(
      screen.queryByRole('img', { name: 'Results placeholder' })
    ).not.toBeInTheDocument();
  });
});
