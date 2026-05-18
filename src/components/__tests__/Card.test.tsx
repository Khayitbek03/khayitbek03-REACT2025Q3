/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card Component', () => {
  describe('renders correct values', () => {
    it('renders the name', () => {
      render(<Card name="Charmander" height={6} weight={85} />);
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    });

    it('renders the height', () => {
      render(<Card name="Charmander" height={6} weight={85} />);
      expect(screen.getByText(/height: 6/i)).toBeInTheDocument();
    });

    it('renders the weight', () => {
      render(<Card name="Charmander" height={6} weight={85} />);
      expect(screen.getByText(/weight: 85/i)).toBeInTheDocument();
    });
  });

  describe('handles zero values correctly', () => {
    it('renders the name as NoName', () => {
      render(<Card name="NoName" height={0} weight={0} />);
      expect(screen.getByText(/noname/i)).toBeInTheDocument();
    });

    it('renders height as 0', () => {
      render(<Card name="NoName" height={0} weight={0} />);
      expect(screen.getByText(/height: 0/i)).toBeInTheDocument();
    });

    it('renders weight as 0', () => {
      render(<Card name="NoName" height={0} weight={0} />);
      expect(screen.getByText(/weight: 0/i)).toBeInTheDocument();
    });
  });
});
