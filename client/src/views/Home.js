import React, { Component } from 'react';
import { Box, Heading } from 'grommet';
import Header from '../components/Header';
import RobotCard from '../components/RobotCard';
 
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { play: true , robots: [{name: 'Robo 1', id: 1}, {name: 'Robo 2', id: 2}, {name: 'Robo 3', id: 3}, {name: 'Robo 4', id: 4}]};
    this.urlChallenge = "http://www.downloadfreesound.com/wp-content/uploads/2014/07/Laser_Shoot_Long2.mp3";
    this.urlAccept = "http://www.downloadfreesound.com/wp-content/uploads/2014/07/Laser_Shoot_Long6.mp3";
    this.audioChallenge = new Audio(this.urlChallenge);
    this.audioAccept = new Audio(this.urlAccept);
    this.toggleChallenge = this.toggleChallenge.bind(this);
    this.toggleAccept = this.toggleAccept.bind(this);
  }

  toggleChallenge() {
    this.setState({ play: !this.state.play });
    console.log(this.audioChallenge);
    this.state.play ? this.audioChallenge.play() : this.audioChallenge.pause();
  }
  toggleAccept() {
    this.setState({ play: !this.state.play });
    console.log(this.audioAccept);
    this.state.play ? this.audioAccept.play() : this.audioAccept.pause();
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
    {this.state.robots.map(robot=><RobotCard robot={robot} />)}
              </Box>
        </Box>
      </Box>
    )
  }
}
export default Home
