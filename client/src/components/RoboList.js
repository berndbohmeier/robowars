import React from 'react'

import RoboListItem from './RoboListItem'

const RoboList = ({ robots }) => {
  return robots.map(
    robot => <RoboListItem roboId={robot.roboId} />
  )
}

export default RoboList
