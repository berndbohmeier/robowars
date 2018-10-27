import React from 'react'
import { Box, Text } from 'grommet'
import RoboPic from './RoboPic'

const RoboListItem = (props) => (
  <Box direction='row-responsive'>
    <Box height='xsmall'>
      <RoboPic roboId={props.id} />
    </Box>
    <Box align='center'>
      <Text size='large'>{props.owner}</Text>
    </Box>
  </Box>
)

export default RoboListItem
