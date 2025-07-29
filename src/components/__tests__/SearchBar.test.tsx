/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';
import { vi } from 'vitest';

describe('SearchBar Component', () => {
  it('renders input and button', () => {
    render(<SearchBar value="" onChange={vi.fn()} onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('displays the correct input value', () => {
    render(<SearchBar value="pikachu" onChange={vi.fn()} onSearch={vi.fn()} />);
    expect(screen.getByDisplayValue('pikachu')).toBeInTheDocument();
  });

  it('calls onChange when typing in input', async () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search by name/i);

    await userEvent.type(input, 'bulbasaur');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes('bulbasaur'.length);
  });

  it('calls onSearch when clicking the search button', async () => {
    const handleSearch = vi.fn();
    render(<SearchBar value="" onChange={vi.fn()} onSearch={handleSearch} />);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.click(button);

    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
