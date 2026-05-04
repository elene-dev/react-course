import { Component } from 'react';
import Card from './Card';
import type { Character } from '../../models/Character';

type CardListProps = {
  characters: Character[];
};

class CardList extends Component<CardListProps> {
  render() {
    const { characters } = this.props;

    return (
      <div className="card-list">
        {characters.map((character) => (
          <Card key={character.mal_id} {...character} />
        ))}
      </div>
    );
  }
}

export default CardList;
