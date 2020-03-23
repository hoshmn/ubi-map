import React from 'react';
import _ from 'lodash';

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

const FORCE_UNIFORM_VALUE = [];

// TODO: make more robust (stab)
const convertToSpreadsheetFormat = property => {
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
    return this.props.cardData.map(experimentCardSet => (
      <td key={'name'+experimentCardSet[0].eid} className='name'>
        {experimentCardSet[0].name||'(none)'}
        <p onClick={this.removeCard.bind(this, experimentCardSet[0].eid)} className='remove'>✕</p>
      </td>
    ));
  }

  getRows() {
    return PROPERTY_LIST.map(property => {
      const expandible = this.getIsExpandible(property);
      // const expandible = true;
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

      // include property name as class for selective styling
      let cellClass = 'property-cell ' + property;
      if (expandible) {
        cellClass += ' expandible';
      }
  
      let valueClass = 'property-value';
      if (expanded) {
        valueClass += ' expanded';
      }

      const propertyCells = this.props.cardData.map(experimentCardSet => {
        
        const cellContent = this.getCellContent(experimentCardSet, property);
        return (
          <td className={cellClass} key={property+'-td-'+experimentCardSet[0].eid}>
            <div className='property-name'>{property}{expandIcon}</div>
            <div className={valueClass}>{cellContent}</div>
          </td>
      )});
      return <tr className='property-row' key={property}>{propertyCells}</tr>;
    });
  }

  getIsExpandible(property) {
    if (property === 'Location') {
      // if any experimint in the card dock has multiple locations, the cell should be expandible
      return _.some(this.props.cardData, expCardSet => expCardSet.length > 1);
    }
    return EXPANDIBLE_LIST.includes(property);
  }

  getCellContent(experimentCardSet, property) {
    const spreadsheetProperty = convertToSpreadsheetFormat(property);

    const [locationOneData, ...otherLocationsData] = experimentCardSet;
    const firstValue = locationOneData[spreadsheetProperty];
    const uniformValue = _.every(otherLocationsData, l => l[spreadsheetProperty] === firstValue);
    
    let cellContent;
    if (uniformValue) {
      cellContent = firstValue;
    } else {
      cellContent = experimentCardSet.map(locationData => {
        return (
          <div key={`cell-content-${spreadsheetProperty}-${locationData.eid}-${locationData.location}`}>
            {property !== 'Location' && <div className='property-location-title'>{locationData.location}</div>}
            {locationData[spreadsheetProperty]}
          </div>
        )
      })
    }

    return <>{cellContent}</>;
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
