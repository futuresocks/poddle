import React from 'react';
import PodDetails from './PodDetails';

const PodList = (props) => {

  const podcastNodes = props.podcasts.map((podcast) => {
    return <PodDetails data={podcast} />
  })

    return (
      <div className='podlist'>
        {podcastNodes}
      </div>
    )
}

export default PodList;
