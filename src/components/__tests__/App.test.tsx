/* eslint-disable import/no-unresolved */
/// <reference types="vitest/globals" />
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../../App';
import { renderWithRouter } from '../../test-utils';

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
    const mockPokemonDetail = { name: 'bulbasaur', height: 7, weight: 69 };
    const globalFetch = fetch as unknown as ReturnType<typeof vi.fn>;
    globalFetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockedListResponse })
      .mockResolvedValueOnce({ ok: true, json: async () => mockPokemonDetail });

    renderWithRouter(<App />);

    expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument(),
    );
  });

  it('displays error message when fetch fails', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    renderWithRouter(<App />);

    await waitFor(() =>
      expect(
        screen.getByText(/failed to load pokémon data/i),
      ).toBeInTheDocument(),
    );
  });
});
