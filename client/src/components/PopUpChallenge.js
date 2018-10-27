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
      pad='medium'
      elevation='medium'
    >
      <Heading size='small'>
        Select a opponent
      </Heading>
      <RoboList robots={props.robots} />
    </Box>
  </Layer>
)

export default PopUpChallenge
