import React from 'react';

const PodDetails = (props) => {

    return (
      <h1 className='poddetails'>
        {props.data.title}
      </h1>
    )
}

export default PodDetails;
