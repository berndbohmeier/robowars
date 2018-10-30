import React from 'react';
import { Box, Heading, Button } from 'grommet';

const Header = (props) => (
  <Box
    tag='header'
    background='brand'
    pad='small'
    elevation='small'
    justify='between'
    direction='row'
    align='center'
    flex={false}
  >
    <Heading level={3} margin='none'>
      <strong>Robo Wars</strong>
    </Heading>
    <Button
      onClick={() => props.onClickLogout()}
    >
      Logout
    </Button>
  </Box>
);

export default Header;