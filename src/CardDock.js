import React from 'react';

class CardDock extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const cards = this.props.cardData.map(c => <div>{JSON.stringify(c)}</div>)
    return (
        <div className='card-dock'>
            {cards}
        </div>
    )
  }
}

export default CardDock;
