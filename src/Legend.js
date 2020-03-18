import React from 'react';

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
    return (
      <div className={classes}>
          <p onClick={this.toggleExpand} className='expand-icon'>[{this.state.expanded ? '-' : '+'}]</p>
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
