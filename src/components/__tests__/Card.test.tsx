/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card Component', () => {
  it('renders the name, height, and weight', () => {
    render(<Card name="Charmander" height={6} weight={85}></Card>);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    expect(screen.getByText(/height: 6/i)).toBeInTheDocument();
    expect(screen.getByText(/weight: 85/i)).toBeInTheDocument();
  });
  it('handles props with zero values', () => {
    render(<Card name="NoName" height={0} weight={0}></Card>);
    expect(screen.getByText(/noname/i)).toBeInTheDocument();
    expect(screen.getByText(/height: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/weight: 0/i)).toBeInTheDocument();
  });
});
