/* eslint-disable import/no-unresolved */
import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';
import { renderWithRouter } from '../../test-utils';

describe('SearchBar Component', () => {
  it('renders input and button', () => {
    renderWithRouter(
      <SearchBar value="" onChange={() => {}} onSearch={() => {}} />,
    );
    expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('displays the correct input value', () => {
    renderWithRouter(
      <SearchBar value="pikachu" onChange={() => {}} onSearch={() => {}} />,
    );
    expect(screen.getByDisplayValue('pikachu')).toBeInTheDocument();
  });

  it('calls onChange when typing in input', () => {
    const handleChange = vi.fn();
    renderWithRouter(
      <SearchBar value="" onChange={handleChange} onSearch={() => {}} />,
    );
    fireEvent.change(screen.getByPlaceholderText(/search by name/i), {
      target: { value: 'bulbasaur' },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when clicking the search button', () => {
    const handleSearch = vi.fn();
    renderWithRouter(
      <SearchBar value="" onChange={() => {}} onSearch={handleSearch} />,
    );
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
