import React, { Component } from 'react';
import { Box, Heading } from 'grommet';
import { Button } from 'grommet';
import RoboPic from '../components/RoboPic';


const RobotCard = (props) => (
    <Box border={{ color: 'brand', size: 'large' }} pad='xlarge' elevation = 'medium' 
        animation = 'slideDown' allyTitle = 'Nice Box' basis= 'auto'>
        <RoboPic roboId={props.robot.id} />
        <Heading textAlign='center' level={1}>{props.robot.name}</Heading>
        <Box direction= 'row-responsive' gap= 'medium' alignSelf= 'center'>
            <Button label='Challange' onClick={() => {props.onClickChallenge()}} />
            <Button label='Give Away' onClick={() => {}} />
    </Box>
</Box>);

export default RobotCard;