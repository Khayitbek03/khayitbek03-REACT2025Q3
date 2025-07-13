import React, { Component } from 'react';
import Card from './Card';

type Props = {
  items: { name: string; height: number; weight: number }[];
};

export default class CardList extends Component<Props> {
  render() {
    return (
      <div>
        {this.props.items.map((item, index) => (
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
}
