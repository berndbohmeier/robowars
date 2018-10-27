import React from 'react'
import { Box, Layer, Heading } from 'grommet'

import RoboList from './RoboList'

const PopUpChallenge = (props) => (
  <Layer
    margin='large'
    onClickOutside={() => props.onClose()}
    onEsc={() => props.onClose()}
  >
    <Box
      overflow='auto'
      border={{ color: 'brand', size: 'large' }}
      pad='large'
      elevation='medium'
    >
      <Heading size='small'>
        Select a opponent
      </Heading>
      <RoboList
        robots={props.robots}
        onClickAttack={(opponentId) => props.onClickAttack(opponentId)}
      />
    </Box>
  </Layer>
)

export default PopUpChallenge
