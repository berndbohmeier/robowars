import React from 'react'

import RoboListItem from './RoboListItem'

const RoboList = ({ robots }) => {
  return robots.map(
    robot => <RoboListItem robotId={robot.id} />
  )
}

export default RoboList
