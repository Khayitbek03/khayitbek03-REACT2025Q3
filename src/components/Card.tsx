import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { toggleSelectItem } from '../store/selecteditemsSlice';

type Props = {
  name: string;
  height: number;
  weight: number;
};

export default function Card({ name, height, weight }: Props) {
  const dispatch = useDispatch();
  const isSelected = useSelector((state: RootState) =>
    state.selectedItems.items.some((item) => item.name === name),
  );

  const handleCheckboxChange = () => {
    dispatch(toggleSelectItem({ name, height, weight }));
  };

  return (
    <div className={`card ${isSelected ? 'selected' : ''}`} data-testid="card">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
      />
      <h3 className="card__name">{name}</h3>
      <p className="card__info">Height: {height}</p>
      <p className="card__info">Weight: {weight}</p>
    </div>
  );
}
