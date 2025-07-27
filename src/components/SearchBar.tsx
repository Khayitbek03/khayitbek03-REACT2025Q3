import type { ChangeEvent } from 'react';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

export default function SearchBar({ value, onChange, onSearch }: Props) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        value={value}
        onChange={onChange}
        placeholder="Search by name ..."
      />
      <button className="search-bar__button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}
