import { Component } from 'react';
import type { Props } from '../types';

export default class SearchBar extends Component<Props> {
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.value}
          onChange={this.props.onChange}
          placeholder="Search by name ..."
        ></input>
        <button onClick={this.props.onSearch}>Search</button>
      </div>
    );
  }
}
