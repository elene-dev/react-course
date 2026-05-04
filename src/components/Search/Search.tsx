import { Component, type ChangeEvent } from 'react';
import './Search.css';

type SearchState = {
  name: string;
  lastSubmittedName: string;
};

type SearchProps = {
  handleSearch: (query: string) => void;
};

class Search extends Component<SearchProps, SearchState> {
  state: SearchState = {
    name: '',
    lastSubmittedName: '',
  };

  componentDidMount() {
    const savedSearch = localStorage.getItem('lastSearch') ?? '';

    this.setState({
      name: savedSearch,
      lastSubmittedName: savedSearch.trim(),
    });
  }

  searchName = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleClick = () => {
    const trimmedName = this.state.name.trim();

    if (trimmedName === this.state.lastSubmittedName) return;

    localStorage.setItem('lastSearch', trimmedName);

    this.setState({
      name: trimmedName,
      lastSubmittedName: trimmedName,
    });

    this.props.handleSearch(trimmedName);
  };

  render() {
    const trimmedName = this.state.name.trim();
    const isSearchDisabled = trimmedName === this.state.lastSubmittedName;

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

          <button
            type="button"
            onClick={this.handleClick}
            disabled={isSearchDisabled}
          >
            Search
          </button>
        </div>
      </section>
    );
  }
}

export default Search;
