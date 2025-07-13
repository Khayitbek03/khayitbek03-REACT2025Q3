import { Component, type ChangeEvent } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Loader from './components/Loader';
import CardList from './components/CardList';

type Pokemon = {
  name: string;
  height: number;
  weight: number;
};

type State = {
  searchTerm: string;
  items: Pokemon[];
  loading: boolean;
  error: string | null;
  simulateError: boolean;
};

const LOCAL_STORAGE_KEY = 'search-term';

export default class App extends Component<Record<string, never>, State> {
  state: State = {
    searchTerm: '',
    items: [],
    loading: false,
    error: null,
    simulateError: false,
  };

  componentDidMount(): void {
    const savedTerm = localStorage.getItem(LOCAL_STORAGE_KEY) || '';
    this.setState({ searchTerm: savedTerm }, this.fetchPokemon);
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearchClick = () => {
    const trimmed = this.state.searchTerm.trim().toLowerCase();
    localStorage.setItem(LOCAL_STORAGE_KEY, trimmed);
    this.setState({ searchTerm: trimmed }, this.fetchPokemon);
  };

  fetchPokemon = async () => {
    this.setState({ loading: true, error: null });

    try {
      const term = this.state.searchTerm;

      if (term) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${term}`,
        );
        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const data = await response.json();
        const item: Pokemon = {
          name: data.name,
          height: data.height,
          weight: data.weight,
        };
        this.setState({ items: [item], loading: false });
      } else {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10',
        );
        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const data = await response.json();

        const results: Pokemon[] = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }) => {
            const res = await fetch(pokemon.url);
            const detail = await res.json();
            return {
              name: detail.name,
              height: detail.height,
              weight: detail.weight,
            };
          }),
        );

        this.setState({ items: results, loading: false });
      }
    } catch (error) {
      console.error('API fetch failed:', error);
      this.setState({
        error: 'Failed to load Pokémon data. Please try again later.',
        loading: false,
      });
    }
  };

  throwError = () => {
    this.setState({ simulateError: true });
  };

  render() {
    const { searchTerm, items, loading, error, simulateError } = this.state;

    if (simulateError) {
      throw new Error('Manually triggered error');
    }

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <SearchBar
          value={searchTerm}
          onChange={this.handleInputChange}
          onSearch={this.handleSearchClick}
        />

        <div style={{ marginTop: '30px' }}>
          {loading && <Loader />}
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {!loading && !error && <CardList items={items} />}
        </div>

        <div style={{ marginTop: '30px' }}>
          <button onClick={this.throwError}>Trigger Error</button>
        </div>
      </div>
    );
  }
}
