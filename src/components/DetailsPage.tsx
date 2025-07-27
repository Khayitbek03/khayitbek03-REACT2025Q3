import { useEffect, useState } from 'react';

type PokemonDetails = {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
  };
};

type Props = {
  name: string;
  onClose: () => void;
};

export default function DetailsPanel({ name, onClose }: Props) {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error('Failed to fetch details');
        const data: PokemonDetails = await res.json();
        setDetails(data);
      } catch (error) {
        console.error('Failed to load details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [name]);

  return (
    <div
      style={{
        width: '40%',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderLeft: '1px solid #ccc',
        position: 'relative',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          padding: '5px 10px',
          cursor: 'pointer',
        }}
      >
        Close
      </button>

      {loading && <p>Loading...</p>}
      {details && (
        <div>
          <h2>{details.name}</h2>
          <img src={details.sprites.front_default} alt={details.name} />
          <p>Height: {details.height}</p>
          <p>Weight: {details.weight}</p>
          <p>Base Experience: {details.base_experience}</p>
        </div>
      )}
    </div>
  );
}
