import React from 'react';
import { Image } from 'grommet'

const RoboPic = (props) => (
  <Image
    src={`https://robohash.org/${props.id}.png`}
    fit='contain'
  />
)

export default RoboPic
