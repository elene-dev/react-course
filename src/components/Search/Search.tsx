import { Component, type ChangeEvent } from 'react';
import './Search.css';

type SearchState = {
  name: string;
};

type SearchProps = {
  handleSearch: (query: string) => void;
};

class Search extends Component<SearchProps, SearchState> {
  state: SearchState = {
    name: '',
  };

  searchName = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: e.target.value,
    });
  };

  componentDidMount() {
    const savedSearch = localStorage.getItem('lastSearch');

    if (savedSearch !== null) {
      this.setState({
        name: savedSearch,
      });
    }
  }

  handleClick = () => {
    const trimName = this.state.name.trim();

    if (!trimName) return;

    localStorage.setItem('lastSearch', trimName);

    this.setState({
      name: trimName,
    });

    this.props.handleSearch(trimName);
  };

  render() {
    return (
      <section className="search-section">
        <div className="search-box">
          <img src="/images/apple.png" alt="" className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={this.state.name}
            onChange={this.searchName}
          />
          <button type="button" onClick={this.handleClick}>
            Search
          </button>
        </div>
      </section>
    );
  }
}

export default Search;
