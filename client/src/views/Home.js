import React, { Component } from 'react';
import { Box, Heading, Button} from 'grommet';
import Header from '../components/Header';
import RobotCard from '../components/RobotCard';
import PopUpChallenge from '../components/PopUpChallenge';
import PopUpGive from '../components/PopUpGive'
import {RobotService} from '../services/RobotService'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectOpponentModalOpen: false,
      isGiveModalOpen: false,
      robots: [],
      loading: true,
      giveLink: '',
      selectedRobo: ''
    }
    this.roboService = new RobotService(this.props.contract)
  }

  async componentDidMount() {
    this._updateRobos()
    setInterval(() => this._updateRobos(), 2000)
  }

  async _updateRobos() {
    const robotIds = await this.roboService.robotsOf(this.props.identity.address)
    const robots = robotIds
      .map((id) => ({
        id: id,
        owner: this.roboService.ownerOf(id),
        name: `Robo ${id}`
      }))
    this.setState({ robots , loading: false})
    console.log('Updated robos')
  }

  _createGiveLink() {
    const { identity, universalLoginSdk } = this.props
    const tokenAddress = this.props.contract.address
    const tokenId = this.state.selectedRobo.id
    const giveLink = universalLoginSdk.createOnboardingLink(
      'http://946944c6.ngrok.io/invite',
      identity.privateKey,
      identity.name,
      identity.address,
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
              Your Robos,  {this.props.identity.name}
            </Heading>
            <Button onClick={this.props.onLogout}>Logout</Button>
            <Heading level="4">
              <a href={`https://ropsten.etherscan.io/address/${this.props.identity.address}`}>{this.props.identity.address}</a>
            </Heading>
            {this.state.loading && "loading..."}
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
