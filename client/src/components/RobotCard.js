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
    >
      {props.robot.name}
    </Heading>
    <Box
      direction='row-responsive'
      gap='medium'
      alignSelf='center'
    >
      <Button
        label='Challenge'
        onClick={() => props.onClickChallenge()}
        icon={<Deploy />}
      />
      <Button
        label='Give'
        onClick={() => props.onClickGive(props.robot)}
        primary
        icon={<Gift />}
      />
    </Box>
  </Box>
);

export default RobotCard;