import React, { Component } from 'react';
import { Box, Heading } from 'grommet';
import Header from '../components/Header';
import RobotCard from '../components/RobotCard';
import PopUpChallenge from '../components/PopUpChallenge';
import PopUpGive from '../components/PopUpGive'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectOpponentModalOpen: false,
      isGiveModalOpen: false,
      robots: [
        { name: 'Robo 1', id: 1, owner: 'Owner 1' },
        { name: 'Robo 2', id: 2, owner: 'Owner 2' },
        { name: 'Robo 3', id: 3, owner: 'Owner 3' },
        { name: 'Robo 4', id: 4, owner: 'Owner 4' }
      ]
    }
  }

  _challenge(id) {
    this.setState({ isSelectOpponentModalOpen: true })
  }

  _give(robo) {
    this.setState({
      isGiveModalOpen: true,
      robo
    })
  }

  _close() {
    this.setState({
      isSelectOpponentModalOpen: false,
      isGiveModalOpen: false
    })
  }

  render() {
    return (
      <Box>
        <Header />
          <Box pad="medium">
            <Heading level="3">
              Your Robos
            </Heading>
            <Box direction= 'row-responsive' wrap>
              {this.state.robots.map(robot=> (
                <RobotCard
                  key={robot.id}
                  robot={robot}
                  onClickChallenge={this._challenge.bind(this)}
                  onClickGive={this._give.bind(this)}
                />
              ))}
            </Box>
          </Box>
          {this.state.isSelectOpponentModalOpen && (
            <PopUpChallenge
              onClose={this._close.bind(this)}
              robots={this.state.robots}
            />
          )}
          {this.state.isGiveModalOpen && (
            <PopUpGive
              robo={this.state.robo}
              onClose={this._close.bind(this)}
            />
          )}
      </Box>
    )
  }
}
export default Home
