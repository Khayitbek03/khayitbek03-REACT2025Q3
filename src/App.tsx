/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, type ChangeEvent } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Loader from './components/Loader';
import CardList from './components/CardList';
import { useLocalStorage } from './useLocalStorage';

type Pokemon = {
  name: string;
  height: number;
  weight: number;
};

export default function App() {
  const [searchTerm, setSearchTerm] = useLocalStorage<string>(
    'search-term',
    '',
  );
  const [items, setItems] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [simulateError, setSimulateError] = useState(false);

  const fetchPokemon = async () => {
    setLoading(true);
    setError(null);

    try {
      const term = searchTerm.trim().toLowerCase();

      if (term) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${term}`,
        );
        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const data = await response.json();
        setItems([
          { name: data.name, height: data.height, weight: data.weight },
        ]);
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

        setItems(results);
      }
    } catch (error) {
      console.error('API fetch failed:', error);
      setError('Failed to load Pokémon data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [searchTerm]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchTerm(searchTerm.trim().toLowerCase());
  };

  const throwError = () => {
    setSimulateError(true);
  };

  if (simulateError) {
    throw new Error('Manually triggered error');
  }

  return (
    <div className="app-container">
      <SearchBar
        value={searchTerm}
        onChange={handleInputChange}
        onSearch={handleSearchClick}
      />

      <div className="app-results">
        {loading && <Loader />}
        {error && <div className="app-error">{error}</div>}
        {!loading && !error && <CardList items={items} />}
      </div>

      <div>
        <button className="app-error-trigger" onClick={throwError}>
          Trigger Error
        </button>
      </div>
    </div>
  );
}
