import React from 'react';

const PROPERTY_LIST = [
    'Implementation Dates',
    'Location',
    'Number of Recipients',
    'Implementing Agency',
    'Research Agency',
    'Funding Agency',
    'Type of Targeting',
    'Unit of Recipient',
    'Amount of Transfer',
    'Frequency of Payment',
    'Method of Evaluation',
    'Additional Notes of Interest',
    'Link to Website',
    'Links to Related Resources'
];

const EXPANDIBLE_LIST = [
    'Location',
    'Implementing Agency',
    'Research Agency',
    'Funding Agency',
    'Type of Targeting',
    'Unit of Recipient',
    'Amount of Transfer',
    'Frequency of Payment',
    'Method of Evaluation',
    'Additional Notes of Interest',
    'Link to Website',
    'Links to Related Resources'
];

// TODO: make more robust
const convertProperty = property => {
    return property.split('').map(ltr => {
        if (ltr === ' ') {
            return '';
        } else {
            return ltr.toLowerCase();
        }
    }).join('');
}

class CardDock extends React.Component {
  constructor(props) {
    super(props);

    this.state = { minimized: true, expandedProperties: {} };
  }
  
  render() {
    const cards = this.props.cardData.map(c => <div>{JSON.stringify(c)}</div>);

    const names = this.props.cardData.map(card => (
        <th className="name">{card.name||'(none)'}</th>
    ));

    const propertyRows = PROPERTY_LIST.map(property => {
        const propertyCells = this.props.cardData.map(card => (
            <td className="property-cell">
                <p className="property-name">{property}</p>
                <p className="property-value">{card[convertProperty(property)]||'(none)'}</p>
            </td>
        ));
        return <tr className="property-row">{propertyCells}</tr>;
    });

    return (
        <table className='card-dock'>
            <thead>
                {names}
            </thead>
            <tbody>
                {propertyRows}
            </tbody>
        </table>
    )
  }
}

export default CardDock;
