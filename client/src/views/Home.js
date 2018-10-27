import React, { Component } from 'react';
import { Box, Heading, Layer } from 'grommet';
import Header from '../components/Header';
import RobotCard from '../components/RobotCard';
 
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ismodelOpen: false, robots: [{name: 'Robo 1', id: 1}, {name: 'Robo 2', id: 2}, {name: 'Robo 3', id: 3}, {name: 'Robo 4', id: 4}]};
  }

  _challenge(id) {
    this.setState({ismodelOpen: true});
  }

  render() {
    return (
      <Box>
        <Header />
          <Box pad="medium">
            <Heading level="3">
              Your Robos
            </Heading>
              <Box direction= 'row-responsive' wrap= 'true'>
    {this.state.robots.map(robot=><RobotCard robot={robot} onClickChallenge={this._challenge.bind(this)} />)}
              </Box>
        </Box>
        {this.state.ismodelOpen ? (
            <Layer margin="large">
            <Box overflow="auto">
              <Box pad="xlarge">text</Box>
              <Box pad="xlarge">text</Box>
              <Box pad="xlarge">text</Box>
              <Box pad="xlarge">text</Box>
              <Box pad="xlarge">text</Box>
              <Box pad="xlarge">text</Box>
            </Box>
            </Layer>
        ) : null}
      </Box>
    )
  }
}
export default Home
