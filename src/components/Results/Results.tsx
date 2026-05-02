import { Component } from 'react';
import './Results.css';
import CardList from './CardList';
import type { Character } from '../../models/Character';

type ResultsProps = {
  characters: Character[];
};

class Results extends Component<ResultsProps> {
  render() {
    const { characters } = this.props;

    return (
      <section className="results-section">
        <div className="results-box">
          {characters.length === 0 ? (
            <img
              src="/images/results-appear.png"
              alt="Results placeholder"
              className="empty-state"
            />
          ) : (
            <CardList characters={characters} />
          )}
        </div>
      </section>
    );
  }
}

export default Results;
