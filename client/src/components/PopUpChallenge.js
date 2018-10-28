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
      border={{ color: 'brand', size: 'large' }}
      pad='large'
      elevation='medium'
      overflow='auto'
    >
      <Heading size='small'>
        Select a opponent
      </Heading>
      <Box
        overflow='scroll'
      >
        <RoboList
          robots={props.robots}
          onClickAttack={(opponentId) => props.onClickAttack(opponentId)}
        />
      </Box>
    </Box>
  </Layer>
)

export default PopUpChallenge
