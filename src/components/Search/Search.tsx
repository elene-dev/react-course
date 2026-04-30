import { Component } from 'react';
import './Search.css';

class Search extends Component {
  render() {
    return (
      <section className="search-section">
        <div className="search-box">
          <img src="/images/apple.png" alt="" className="search-icon" />
          <input type="text" placeholder="Search..." />
          <button type="button">Search</button>
        </div>
      </section>
    );
  }
}

export default Search;
