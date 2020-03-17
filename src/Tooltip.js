import React from 'react';

class Tooltip extends React.Component {
  render() {
    const { id, name, location, x, y } = this.props;
    if (!id) return null;

    return (
      <div className='tooltip' style={{left: x+'px', top: y+5+'px'}}>
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
