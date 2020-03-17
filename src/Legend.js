import React from 'react';

class Legend extends React.Component {
  render() {
    return (
      <div className='legend'>
          <div><i className='past' />Past Experiments</div>
          <div><i className='ongoing' />Ongoing Experiments</div>
          <div><i className='proposed' />Proposed Experiments</div>
      </div>
    )
  }
}

export default Legend;
