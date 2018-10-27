import React from 'react'

import RoboListItem from './RoboListItem'

const RoboList = ({ robots }) => {
  return robots.map(
    robo => <RoboListItem robo={robo} />
  )
}

export default RoboList
