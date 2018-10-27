import React from 'react'

import RoboListItem from './RoboListItem'

const RoboList = ({ robots, onClickAttack }) => {
  return robots.map(
    robo => (
      <RoboListItem
        key={robo.id}
        robo={robo}
        onClickAttack={(opponentId) => onClickAttack(opponentId)}
      />
    )
  )
}

export default RoboList
