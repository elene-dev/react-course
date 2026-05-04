import { Component } from 'react';
import type { Character } from '../../models/Character';
import './Card.css';

class Card extends Component<Character> {
  render() {
    const {
      name,
      description,
      name_kanji,
      nicknames,
      role,
      favorites,
      image_url,
    } = this.props;
    return (
      <article className="card">
        <div className="card-image-box">
          <img src={image_url} alt={name} className="card-image" />
        </div>

        <div className="card-content">
          <h2 className="card-title">{name}</h2>

          <div className="card-details">
            <p>Kanji: {name_kanji}</p>
            <p>
              Nicknames:{' '}
              {nicknames.length > 0
                ? nicknames.join(', ')
                : 'No Nickname Found'}
            </p>
            <p>Role: {role}</p>
            <p>Favorites: {favorites.toLocaleString()}</p>
            <p>{description}</p>
          </div>
        </div>
      </article>
    );
  }
}

export default Card;
