import { render } from '@testing-library/react';
import CardList from '../CardList';

describe('CardList Component', () => {
  const sampleItems = [
    { name: 'Pikachu', height: 4, weight: 40 },
    { name: 'Charmander', height: 6, weight: 78 },
  ];

  it('renders the correct number of cards', () => {
    const { container } = render(<CardList items={sampleItems} />);
    const cards = container.querySelectorAll('.card');
    expect(cards.length).toBe(2);
  });

  it('renders nothing when the items is an empty array', () => {
    const { container } = render(<CardList items={[]}></CardList>);
    const cards = container.querySelectorAll('.card');
    expect(cards.length).toBe(0);
  });
});
