import React from 'react'
import { Box, Text, Button } from 'grommet'
import RoboPic from './RoboPic'

const RoboListItem = (props) => (
  <Box
    direction='row-responsive'
    justify='center'
    border='all'
    round
    height='medium'
  >
    <Box width='small'>
      <RoboPic roboId={props.robo.id} />
    </Box>
    <Box align='center'>
      <Text size='large'>{props.robo.name}</Text>
      <Button
        primary
        onClick={() => props.onClickAttack(props.robo.id)}
      >
        Attack
      </Button>
    </Box>
  </Box>
)

export default RoboListItem
