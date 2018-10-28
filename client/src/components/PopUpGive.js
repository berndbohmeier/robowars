import React from 'react';
import { Box, Layer, Heading, Button } from 'grommet';
import RoboPic from '../components/RoboPic';
import QRCode from 'qrcode.react';
import CopyToClipboard from 'react-copy-to-clipboard';

const PopUpGive = (props) => (
  <Layer
    margin="large"
    onClickOutside={() => props.onClose()}
    onEsc={() => props.onClose()}
  >
    <Box
      overflow='auto'
      border={{ color: 'brand', size: 'large' }}
      pad='medium'
      elevation='medium' 
      align='center'
    >
      <Box
        direction='row-responsive'
        align='end'
        fill='horizontal'
      >
        <Button
          label='X'
          onClick={() => props.onClose()}
        />
      </Box>
      <RoboPic roboId={props.robo.id} />
      <Heading
        textAlign='center'
        level={1}
      >
        {props.robo.name}
      </Heading>
      <Box pad='medium'>
        <QRCode value= {props.giveLink} /> 
      </Box>
      <Box>
        <CopyToClipboard
          onCopy={() => props.onCopy()}
          text={props.giveLink}
        >
          <Button label='Copy to clipboard' />
        </CopyToClipboard>
      </Box>
    </Box>
  </Layer>
);

export default PopUpGive;