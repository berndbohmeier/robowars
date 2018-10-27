import React from 'react';
import { Box, Layer, Heading } from 'grommet';
import RoboPic from '../components/RoboPic';
import QRCode from 'qrcode.react';

const PopUpGive = (props) => (
    <Layer margin="large" onClickOutside={() => {props.onClose()}} onEsc={() => {props.onClose()}}>
        <Box overflow="auto" border={{ color: 'brand', size: 'large' }} pad='medium' elevation = 'medium' 
            basis= 'xlarge' align="center" fill="true" flex='true'>
              <RoboPic roboId={props.robo.id} />
              <Heading textAlign='center' level={1}>{props.robo.name}</Heading>
              <Box pad='medium'>
              <QRCode value='adadad' /> 
            </Box>
        </Box>
    </Layer>);

export default PopUpGive;