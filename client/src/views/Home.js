import React, { Component } from 'react';
import { Box, Heading, Layer } from 'grommet';
import Header from '../components/Header';
import RobotCard from '../components/RobotCard';
import PopUpChallenge from '../components/PopUpChallenge';
import PopUpGive from '../components/PopUpGive';

 
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isChallenge: false, isGive: false, robots: [{name: 'Robo 1', id: 1}, {name: 'Robo 2', id: 2}, {name: 'Robo 3', id: 3}, {name: 'Robo 4', id: 4}]};
  }

  _challenge(id) {
    this.setState({isChallenge: true});
  }
  _give(robo) {
    this.setState({isGive: true, robo});
    
  }
  _close() {this.setState({isChallenge: false, isGive: false});
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
                {this.state.robots.map(robot=><RobotCard robot={robot} onClickChallenge={this._challenge.bind(this)} onClickGive={this._give.bind(this)}/>)}
              </Box>
          </Box>
            {this.state.isChallenge ? (<PopUpChallenge onClose={this._close.bind(this)} />) : null}
            {this.state.isGive ? (<PopUpGive robo={this.state.robo} onClose={this._close.bind(this)} />) : null}

      </Box>
    )
  }
}
export default Home
