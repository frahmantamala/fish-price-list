import React from 'react';

interface CardProps {
  id: string;
  title: string;
  desc?: string;
  image?: string;
  price: string;
  address?: string;
  size?: string;
}


class CardComponent extends React.Component<CardProps, {}> {
  constructor(props: CardProps) {
    super(props)
  }

  render() {
    return (
      <div className="card-containers">
        <div className="card">
          <img src="images/card/no-images.svg" alt="Items" />
          <div className="card-details">
            <h5>{this.props.title}</h5>
            <span>Rp {this.props.price}</span>
            <span>{this.props.size}g</span>
            <p>{this.props.address}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default CardComponent;