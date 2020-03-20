import React from 'react';

const TOOLTIP_DIMENSIONS = { width: 200, height: 175 };
const POINT_BUFFER = 7;

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      top: 0,
      adjusted: false
    };

    this.ref = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps;
    if (this.props.id === id || !id) {
      // if we're still hovering the same point, don't worry about updating
      return;
    }

    // The following steps insure a tooltip doesn't flow outside of the window bounds:
    // 1] when we hover a new point, we initially render without adjusting the tooltip location
    this.setState({ 
      adjusted: false,
      left: nextProps.x,
      top: nextProps.y
    });
  }

  componentDidUpdate() {
    if (this.state.adjusted || !this.props.id) {
      // 6] location has already been adjusted, so don't trigger a rerender
      return;
    }

    this.adjustPosition();
  }

  adjustPosition() {
    // 3] after the initial render, we have access to the tooltip's DOM node and can tell it's size
    const { width: tooltipWidth, height: tooltipHeight } = this.ref.current.getBoundingClientRect();
    const windowElement = document.getElementById('root');
    const { width: windowWidth, height: windowHeight } = windowElement.getBoundingClientRect();
    
    let { left, top } = this.state;
    // by default, tooltip appears above the point
    top -= (tooltipHeight + POINT_BUFFER);
    if (top < 0) {
      // if it would run off the top of the screen, shift it below the point
      top += tooltipHeight + POINT_BUFFER*2;

      if ((top + tooltipHeight) > windowHeight) {
        // ...unless it would then run off the bottom, in which case set it as high as possible
        top = 1;
      }
    }

    left += POINT_BUFFER;
    if (left + tooltipWidth > windowWidth) {
      // if the tooltip would run off the right of the screen, shift it left of the point
      left -= (tooltipWidth + POINT_BUFFER*2);

      if (left < 0) {
        // ...unless it would then run off the left, in which case set it as far right as possible
        left = windowWidth - (tooltipWidth + 2);
      }
    }

    // 4] record our adjusted coordinates, which will trigger a rerender
    this.setState({ left, top, adjusted: true });
  }
  
  render() {
    const { id, name, location } = this.props;
    if (!id) {
      return null;
    }

    let style = {};
    if (!this.state.adjusted) {
      // 2] hide this initial render so user doesn't see tooltip "jump"
      style = { visibility: 'hidden', left: '0px', top: '0px' };
    } else {
      // 5] finally, our tooltip can be told where to properly render
      style = { left: this.state.left + 'px', top: this.state.top + 'px' };
    }

    return (
      <div className='tooltip' style={style} ref={this.ref}>
        <div className='name'>{name||'(none)'}</div>
        <div className='detail'>
          <p className='location'>Location:</p>
          {location}
        </div>
        <p className='click-hint'>click point for more info</p>
      </div>
    )
  }
}

export default Tooltip;
