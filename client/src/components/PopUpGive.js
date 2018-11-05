import React from 'react'
import { Box, Layer, Heading, Button } from 'grommet'
import { Close } from 'grommet-icons'
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
      pad='medium'
      elevation='medium' 
      align='center'
      flex
    >
      <Button
        onClick={() => props.onClose()}
        style={{
          position: 'absolute',
          right: 10,
          top: 10
        }}
        border={{
          width: 0
        }}
        icon={<Close color='black' />}
      />
      <Box height='small'>
        <RoboPic roboId={props.robo.id} />
      </Box>
      <Heading
        textAlign='center'
        level={1}
      >
        {props.robo.name}
      </Heading> 
      <QRCode size={200} value={props.giveLink} />
      <Box margin='medium'>
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