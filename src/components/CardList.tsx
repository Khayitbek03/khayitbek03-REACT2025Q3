import Card from './Card';

type Props = {
  items: { name: string; height: number; weight: number }[];
};

export default function CardList({ items }: Props) {
  return (
    <div className="card-list">
      {items.map((item, index) => (
        <Card
          key={index}
          name={item.name}
          height={item.height}
          weight={item.weight}
        />
      ))}
    </div>
  );
}
