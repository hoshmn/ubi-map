import React from 'react';
// import { useTransition, animated } from 'react-spring'

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
  'Amount of Transfer',
  'Additional Notes of Interest',
  'Link to Website',
  'Links to Related Resources'
];


// TODO: make more robust (stab)
const convertProperty = property => {
  return property.split('').map(ltr => {
    if (ltr === ' ') {
      return '';
    } else {
      return ltr.toLowerCase();
    }
  }).join('');
}

// pure component? (shallow compare map features?) (perf)
class CardDock extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { minimized: true, expandedProperties: {} };

    this.removeCard = this.removeCard.bind(this);
    this.slideDock = this.slideDock.bind(this);
    this.minimizeDock = this.minimizeDock.bind(this);
    this.toggleProperty = this.toggleProperty.bind(this);
  }

  removeCard(id) {
    this.props.removeCard(id);
  }

  slideDock(e) {
    if (e.deltaY && e.deltaY > 0) {
      this.setState({ minimized: false });
    }
  }

  minimizeDock() {
    // TODO: call toggle? or remove, make only scroll-controlled
    this.setState(state => ({ minimized: !this.state.minimized }));
  }

  toggleProperty(property, expanded) {
    const expandedProperties = {...this.state.expandedProperties};
    expandedProperties[property] = !expanded;
    this.setState({ expandedProperties });
  }

  getNames() {
    // TODO: don't bind in render (perf)
    return this.props.cardData.map(cards => (
      <td key={'name'+cards[0].eid} className='name'>
        {cards[0].name||'(none)'}
        <p onClick={this.removeCard.bind(this, cards[0].eid)} className='remove'>✕</p>
      </td>
    ));
  }

  getRows() {
    return PROPERTY_LIST.map(property => {
      const expandible = EXPANDIBLE_LIST.includes(property);
      const expanded = !!this.state.expandedProperties[property];

      let expandIcon = null;
      if (expandible) {
        // TODO: also don't bind in render (perf)
        expandIcon = (
          <p
            onClick={this.toggleProperty.bind(this, property, expanded)}
            className='expand-icon'
          >
            {expanded ? '-' : '+'}
          </p>
        );
      }

      let cellClass = 'property-cell';
      if (expandible) {
        cellClass += ' expandible';
      }
  
      let valueClass = 'property-value';
      if (expanded) {
        valueClass += ' expanded';
      }

      const propertyCells = this.props.cardData.map(cards => (
        <td className={cellClass} key={property+'-td-'+cards[0].eid}>
          <div className='property-name'>{property}{expandIcon}</div>
          <p className={valueClass}>{cards[0][convertProperty(property)]||'(none)'}</p>
        </td>
      ));
      return <tr className='property-row' key={property}>{propertyCells}</tr>;
    });
  }
    
  render() {
    let classes = 'card-dock';
    const cardCount = String(this.props.cardData.length);
    classes += ` card-count-${cardCount}`;
    if (!this.state.minimized) {
      classes += ' maximized';
    }

    return (
      <div onWheel={this.slideDock} onDoubleClick={this.minimizeDock}>
        <table className={classes}>
          <thead>
            <tr>{this.getNames()}</tr>
          </thead>
          <tbody>
            {this.getRows()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default CardDock;
