type Props = {
  name: string;
  height: number;
  weight: number;
};

export default function Card({ name, height, weight }: Props) {
  return (
    <div className="card" data-testid="card">
      <h3 className="card__name">{name}</h3>
      <p className="card__info">Height: {height}</p>
      <p className="card__info">Weight: {weight}</p>
    </div>
  );
}
