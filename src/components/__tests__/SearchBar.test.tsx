import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  it('renders input and button', () => {
    render(
      <SearchBar value="" onChange={() => {}} onSearch={() => {}}></SearchBar>,
    );
    expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
  it('displays the correct input value', () => {
    render(
      <SearchBar
        value="pikachu"
        onChange={() => {}}
        onSearch={() => {}}
      ></SearchBar>,
    );
    expect(screen.getByDisplayValue('pikachu')).toBeInTheDocument();
  });
  it('calls onChange when typing in input', () => {
    const handleChange = vi.fn();
    render(
      <SearchBar
        value=""
        onChange={handleChange}
        onSearch={() => {}}
      ></SearchBar>,
    );
    fireEvent.change(screen.getByPlaceholderText(/search by name/i), {
      target: { value: 'bulbasaur' },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  it('calls onSearch when clicking the search button', () => {
    const handleSearch = vi.fn();
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        onSearch={handleSearch}
      ></SearchBar>,
    );

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
