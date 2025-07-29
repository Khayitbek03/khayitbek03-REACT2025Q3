/// <reference types="vitest/globals" />
import { render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../ErrorBoundary';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('App Component', () => {
  it('loads and displays Pokemon list when no search term in localStorage', async () => {
    const mockedListResponse = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
    };
    const mockPokemonDetail = {
      name: 'bulbasaur',
      height: 7,
      weight: 69,
    };
    const globalFetch = fetch as unknown as ReturnType<typeof vi.fn>;
    globalFetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockedListResponse })
      .mockResolvedValueOnce({ ok: true, json: async () => mockPokemonDetail });

    render(<App />);

    expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    });
  });

  it('searches and showss a specific pokemon when user submits search', async () => {
    const mockDefaultList = {
      results: [],
    };

    const mockPokemon = {
      name: 'pikachu',
      height: 4,
      weight: 60,
    };

    const globalFetch = fetch as unknown as ReturnType<typeof vi.fn>;
    globalFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockDefaultList,
    });

    globalFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemon,
    });

    render(<App />);

    const input = screen.getByPlaceholderText(/search by name/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'pikachu');
    await userEvent.click(button);

    expect(localStorage.getItem('search-term')).toBe('pikachu');

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
      expect(screen.getByText(/height: 4/i)).toBeInTheDocument();
      expect(screen.getByText(/weight: 60/i)).toBeInTheDocument();
    });
  });

  it('displays error message when fetch fails', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText(/failed to load pokémon data/i),
      ).toBeInTheDocument();
    });
  });

  it('throws error when simulateError is true', async () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>,
    );

    const triggerButton = screen.getByText(/trigger error/i);
    await userEvent.click(triggerButton);

    expect(
      await screen.findByText(/the intentional error happened/i),
    ).toBeInTheDocument();
  });
});
