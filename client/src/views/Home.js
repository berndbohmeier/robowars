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
      ], 
      giveLink: '',
      selectedRobo: ''
    }
  }

  _createGiveLink() {
    const { identity, universalLoginSdk } = this.props
    const tokenAddress = '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d'
    const tokenId = this.state.selectedRobo.id
    const giveLink = universalLoginSdk.createOnboardingLink(
      'http://localhost:3000/invite',
      identity.privateKey,
      identity.name,
      tokenAddress,
      tokenId
    )
    this.setState({
      isGiveModalOpen: true,
      giveLink
    })
  }

  _openSelectOpponentModal() {
    this.setState({ isSelectOpponentModalOpen: true })
  }

  _attackOpponent(opponentId) {
    console.log('ATTACK', opponentId)
  }

  _openGiveModal(selectedRobo) {
    this.setState({ selectedRobo }, () => {
      this._createGiveLink()
    })
  }

  _copyGiveLink(){
    this.setState({ copied: true });
  }

  _closeModal() {
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
                  onClickChallenge={this._openSelectOpponentModal.bind(this)}
                  onClickGive={this._openGiveModal.bind(this)}
                />
              ))}
            </Box>
          </Box>
          {this.state.isSelectOpponentModalOpen && (
            <PopUpChallenge
              onClose={this._closeModal.bind(this)}
              robots={this.state.robots}
              onClickAttack={this._attackOpponent.bind(this)}
            />
          )}
          {this.state.isGiveModalOpen && (
            <PopUpGive
              robo={this.state.selectedRobo}
              giveLink={this.state.giveLink}
              onCopy={this._copyGiveLink.bind(this)}              
              onClose={this._closeModal.bind(this)}
            />
          )}
      </Box>
    )
  }
}
export default Home
