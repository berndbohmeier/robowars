import React from 'react'
import { Box, Layer, Heading, Button } from 'grommet'
import QRCode from 'qrcode.react'
import CopyToClipboard from 'react-copy-to-clipboard'
import RoboPic from '../components/RoboPic'

const PopUpGive = (props) => (
  <Layer
    margin='medium'
    onClickOutside={() => props.onClose()}
    onEsc={() => props.onClose()}
  >
    <Box
      overflow='auto'
      border={{ color: 'brand', size: 'medium' }}
      pad='large'
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
      <QRCode size={240} value={props.giveLink} />
      <Box pad='small'>
        <CopyToClipboard
          onCopy={() => props.onCopy()}
          text={props.giveLink}
        >
          <Button
            primary
            label='Copy link'
          />
        </CopyToClipboard>
      </Box>
    </Box>
  </Layer>
);

export default PopUpGive;