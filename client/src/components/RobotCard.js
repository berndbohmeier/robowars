import React from 'react'
import { Box, Heading, Button } from 'grommet'
import { Deploy, Gift } from 'grommet-icons'

import RoboPic from '../components/RoboPic'


const RobotCard = (props) => (
  <Box
    border={{ color: 'brand', size: 'medium' }}
    pad='large'
    margin='small'
    elevation='medium' 
    animation='fadeIn'
    basis='auto'
  >
    <RoboPic roboId={props.robot.id} />
    <Heading
      textAlign='center'
      level={1}
      size='medium'
    >
      {props.robot.name}
    </Heading>
    <Box
      direction='row-responsive'
      gap='medium'
      alignSelf='center'
    >
      <Button
        label='Fight'
        onClick={() => props.onClickChallenge()}
      />
      <Button
        label='Give'
        onClick={() => props.onClickGive(props.robot)}
        primary
      />
    </Box>
  </Box>
);

export default RobotCard;