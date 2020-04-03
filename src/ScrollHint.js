import React from 'react';
import TriggerIcon, { ICON_TYPE } from './TriggerIcon';

class ScrollHint extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let classes = 'scroll-hint';
    if (this.props.dismissed) {
      classes += ' dismissed';
    }

    return (
      <div className={classes}>
        <p className='content'>SCROLL FOR MORE ⬇️</p>
      </div>
    )
  }
}

export default ScrollHint;
