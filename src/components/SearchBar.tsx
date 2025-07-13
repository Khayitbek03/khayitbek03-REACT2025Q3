import { Component } from 'react';
import type { Props } from '../types';

export default class SearchBar extends Component<Props> {
  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          className="search-bar__input"
          value={this.props.value}
          onChange={this.props.onChange}
          placeholder="Search by name ..."
        />
        <button className="search-bar__button" onClick={this.props.onSearch}>
          Search
        </button>
      </div>
    );
  }
}
