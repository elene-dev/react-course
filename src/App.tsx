import { Component } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Results from './components/Results/Results';
import type { Character } from './models/Character';
import { getChars } from './api/jikan';
import ErrorTester from './components/ErrorBoundary/ErrorTester';

type AppState = {
  query: string;
  characters: Character[];
  currentPage: number;
  charactersPerPage: number;
  loading: boolean;
  error: string;
  hasLoaded: boolean;
};

class App extends Component<unknown, AppState> {
  state: AppState = {
    characters: [],
    query: '',
    currentPage: 1,
    charactersPerPage: 3,
    loading: false,
    error: '',
    hasLoaded: false,
  };

  handleSearch = async (query: string) => {
    const trimmedQuery = query.trim();

    if (trimmedQuery === this.state.query && this.state.hasLoaded) return;

    this.setState({
      loading: true,
      error: '',
    });

    try {
      const characters = await getChars(trimmedQuery);

      this.setState({
        query: trimmedQuery,
        characters,
        currentPage: 1,
        charactersPerPage: 3,
        hasLoaded: true,
      });
    } catch {
      this.setState({
        error: 'Something went wrong. Please try again.',
        characters: [],
        hasLoaded: true,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  componentDidMount() {
    const savedQuery = localStorage.getItem('lastSearch')?.trim() ?? '';
    void this.handleSearch(savedQuery);
  }

  render() {
    const { characters, currentPage, charactersPerPage, loading } = this.state;

    const pageCount = Math.ceil(characters.length / charactersPerPage);

    const start = (currentPage - 1) * charactersPerPage;
    const end = start + charactersPerPage;
    const visibleCharacters = characters.slice(start, end);

    return (
      <main>
        <Search handleSearch={this.handleSearch} />

        {loading ? (
          <img src="/images/spinner.png" className="spinner" alt="loading" />
        ) : this.state.error ? (
          <section className="results-section">
            <div className="results-box empty">
              <p className="error">{this.state.error}</p>
            </div>
          </section>
        ) : (
          <Results characters={visibleCharacters} />
        )}

        {!loading && pageCount > 1 && (
          <div className="pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => this.setState({ currentPage: currentPage - 1 })}
            >
              Previous
            </button>

            <button
              type="button"
              disabled={currentPage === pageCount}
              onClick={() => this.setState({ currentPage: currentPage + 1 })}
            >
              Next
            </button>
          </div>
        )}

        {!loading && <ErrorTester />}
      </main>
    );
  }
}

export default App;
