import { Link } from 'react-router-dom';
import type { ChangeEvent } from 'react';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

export default function SearchBar({ value, onChange, onSearch }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        padding: '15px 30px',
        backgroundColor: '#282c34',
      }}
      className="search-bar"
    >
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          className="search-bar__input"
          value={value}
          onChange={onChange}
          placeholder="Search by name ..."
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <button
          className="search-bar__button"
          onClick={onSearch}
          style={{
            padding: '8px 16px',
            background: '#61dafb',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>

      <nav>
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: '20px',
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
