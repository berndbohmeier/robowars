import React from 'react';
import { Image } from 'grommet'

const RoboPic = (props) => (
  <Image
    src={`https://robohash.org/${props.roboId}.png`}
    fit='contain'
  />
)

export default RoboPic
