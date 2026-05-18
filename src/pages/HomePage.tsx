/* eslint-disable import/no-unresolved */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import CardList from '../components/CardList';
import DetailsPanel from '../components/DetailsPage';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Pokemon = { name: string; height: number; weight: number };

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useLocalStorage<string>(
    'search-term',
    '',
  );
  const [items, setItems] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const selected = searchParams.get('details');
  const limit = 10;

  const fetchPokemon = async (term: string, currentPage: number) => {
    setLoading(true);
    setError(null);

    try {
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
        const offset = (currentPage - 1) * limit;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
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
    } catch (err) {
      console.error('API fetch failed:', err);
      setError('Failed to load Pokémon data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(searchTerm, page);
  }, [searchTerm, page]);

  const handleSearch = () => {
    const trimmed = searchTerm.trim().toLowerCase();
    setSearchTerm(trimmed);
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), details: selected || '' });
  };

  const handleSelect = (name: string) => {
    setSearchParams({ page: page.toString(), details: name });
  };

  const handleCloseDetails = () => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={handleSearch}
        />

        <div className="app-results">
          {loading && <Loader />}
          {error && <div className="app-error">{error}</div>}
          {!loading && !error && (
            <>
              <CardList items={items} onSelect={handleSelect} />
              <div className="pagination">
                <button
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </button>
                <span>Page {page}</span>
                <button onClick={() => handlePageChange(page + 1)}>Next</button>
              </div>
            </>
          )}
        </div>
      </div>

      {selected && (
        <DetailsPanel name={selected} onClose={handleCloseDetails} />
      )}
    </div>
  );
}
