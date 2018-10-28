import React from 'react';
import { Box, Heading } from 'grommet';
import { Button } from 'grommet';
import RoboPic from '../components/RoboPic';


const RobotCard = (props) => (
  <Box
    border={{ color: 'brand', size: 'large' }}
    pad='xlarge'
    elevation='medium' 
    animation='slideDown'
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
      />
      <Button
        label='Give'
        onClick={() => props.onClickGive(props.robot)}
      />
    </Box>
  </Box>
);

export default RobotCard;