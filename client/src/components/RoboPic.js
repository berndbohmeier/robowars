import React from 'react';
import { Image } from 'grommet'

const RoboPic = (roboId) => (
  <Image src={`https://robohash.org/${roboId}.png`} />
)

export default RoboPic
