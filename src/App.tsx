import { Component } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Results from './components/Results/Results';
import type { Character } from './models/Character';

type AppState = {
  query: string;
  characters: Character[];
};

class App extends Component<unknown, AppState> {
  state: AppState = {
    characters: [],
    query: '',
  };

  handleSearch = (query: string) => {
    this.setState({
      query,
    });
  };

  render() {
    return (
      <main>
        <Search handleSearch={this.handleSearch} />
        <Results characters={this.state.characters} />
      </main>
    );
  }
}

export default App;
