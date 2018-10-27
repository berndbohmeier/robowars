import React from 'react';
import { Box, Layer, Heading, Button, Text } from 'grommet';
import RoboPic from '../components/RoboPic';
import QRCode from 'qrcode.react';
import CopyToClipboard from 'react-copy-to-clipboard';

const PopUpGive = (props) => (
    <Layer margin="large" onClickOutside={() => {props.onClose()}} onEsc={() => {props.onClose()}}>
        <Box overflow="auto" border={{ color: 'brand', size: 'large' }} pad='medium' elevation = 'medium' 
            basis= 'xlarge' align="center" fill="true" flex='true'>
              <Text size='medium' color="accent-1">Send this link and give this robot to a friend</Text>
              <RoboPic roboId={props.robo.id} />
              <Heading textAlign='center' level={1}>{props.robo.name}</Heading>
              <Box pad='medium'>
              <QRCode value= {props.giveLink} /> 
            </Box>
            <Box>
            <CopyToClipboard onCopy={() => {props.onCopy()}} text= {props.giveLink}>
            <Button label='Copy to clipboard' />
            </CopyToClipboard>
            </Box>
        </Box>
    </Layer>);

export default PopUpGive;