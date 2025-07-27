import Card from './Card';

type Props = {
  items: { name: string; height: number; weight: number }[];
  onSelect: (name: string) => void;
};

export default function CardList({ items, onSelect }: Props) {
  if (items.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="card-list">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => onSelect(item.name)}
          style={{ cursor: 'pointer' }}
        >
          <Card name={item.name} height={item.height} weight={item.weight} />
        </div>
      ))}
    </div>
  );
}
