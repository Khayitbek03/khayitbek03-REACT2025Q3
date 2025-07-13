import React, { Component } from 'react';

type Props = {
  name: string;
  height: number;
  weight: number;
};

export default class Card extends Component<Props> {
  render() {
    const { name, height, weight } = this.props;

    return (
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          margin: '12px 0',
          padding: '12px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <h3 style={{ margin: '0 0 8px 0' }}>{name}</h3>
        <p style={{ margin: 0 }}>Height: {height}</p>
        <p style={{ margin: 0 }}>Weight: {weight}</p>
      </div>
    );
  }
}
