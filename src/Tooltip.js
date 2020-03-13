import React from 'react';

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { id, name, location, x, y } = this.props;
    if (!id) return null;

    return (
        <div className='tooltip' style={{left: x+'px', top: y+5+'px'}}>
            <div>Name: {name||'(none)'}</div>
            <div>Location: {location}</div>
            <h6>click point for more info</h6>
        </div>
    )
  }
}

export default Tooltip;
