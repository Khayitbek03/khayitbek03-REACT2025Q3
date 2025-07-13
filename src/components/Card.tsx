import { Component } from 'react';

type Props = {
  name: string;
  height: number;
  weight: number;
};

export default class Card extends Component<Props> {
  render() {
    const { name, height, weight } = this.props;

    return (
      <div className="card">
        <h3 className="card__name">{name}</h3>
        <p className="card__info">Height: {height}</p>
        <p className="card__info">Weight: {weight}</p>
      </div>
    );
  }
}
