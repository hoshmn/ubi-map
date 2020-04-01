import React from 'react';
import TriggerIcon, { ICON_TYPE } from './TriggerIcon';

class Legend extends React.Component {
  constructor(props) {
    super(props);

    this.state = { expanded: true };

    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  render() {
    let classes = 'legend';
    if (!this.state.expanded) {
      classes += ' hidden';
    }

    const iconType = this.state.expanded ? ICON_TYPE.COLLAPSE : ICON_TYPE.EXPAND;
    return (
      <div className={classes}>
          <TriggerIcon onClick={this.toggleExpand} inBrackets={true} iconType={iconType} />
          <div className='content'>
            <div><i className='past' />Past Experiments</div>
            <div><i className='ongoing' />Ongoing Experiments</div>
            <div><i className='proposed' />Proposed Experiments</div>
          </div>
      </div>
    )
  }
}

export default Legend;
