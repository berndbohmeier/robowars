import React, { Component } from 'react';
import { Box, Heading } from 'grommet';

import Header from '../components/Header';

class Home extends Component {
  render() {
    return (
      <Box>
        <Header />
        <Box pad="medium">
          <Heading level="3">
            Your Robos
          </Heading>
        </Box>
      </Box>
    )
  }
}

export default Home
