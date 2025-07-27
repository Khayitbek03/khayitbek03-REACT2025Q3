/// <reference types="vitest/globals" />
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import DetailsPanel from '../DetailsPage';

describe('DetailsPanel Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loading initially', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: 'pikachu',
        height: 4,
        weight: 60,
        base_experience: 112,
        sprites: { front_default: 'pikachu.png' },
      }),
    });

    render(<DetailsPanel name="pikachu" onClose={() => {}} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });
  });

  it('displays details after successful fetch', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        base_experience: 64,
        sprites: { front_default: 'bulbasaur.png' },
      }),
    });

    render(<DetailsPanel name="bulbasaur" onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      expect(screen.getByText(/height: 7/i)).toBeInTheDocument();
      expect(screen.getByText(/weight: 69/i)).toBeInTheDocument();
      expect(screen.getByText(/base experience: 64/i)).toBeInTheDocument();
      expect(screen.getByAltText(/bulbasaur/i)).toHaveAttribute(
        'src',
        'bulbasaur.png',
      );
    });
  });

  it('handles fetch error gracefully', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
    });

    render(<DetailsPanel name="missingno" onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('calls onClose when the close button is clicked', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: 'charmander',
        height: 6,
        weight: 85,
        base_experience: 62,
        sprites: { front_default: 'charmander.png' },
      }),
    });

    const onCloseMock = vi.fn();
    render(<DetailsPanel name="charmander" onClose={onCloseMock} />);

    const closeButton = await screen.findByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
