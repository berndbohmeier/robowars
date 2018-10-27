import React from 'react'
import { Box, Text } from 'grommet'
import RoboPic from './RoboPic'

const RoboListItem = (props) => (
  <Box direction='row-responsive' justify='start'>
    <Box width='small'>
      <RoboPic roboId={props.robo.id} />
    </Box>
    <Box align='center'>
      <Text size='large'>{props.robo.owner}</Text>
    </Box>
  </Box>
)

export default RoboListItem
