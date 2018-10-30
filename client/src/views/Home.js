import React, { Component } from 'react';
import { Box, Heading } from 'grommet';
import Header from '../components/Header';
import RobotCard from '../components/RobotCard';
import PopUpChallenge from '../components/PopUpChallenge';
import PopUpGive from '../components/PopUpGive'
import { RobotService } from '../services/RobotService'
import config from '../config'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectOpponentModalOpen: false,
      isGiveModalOpen: false,
      myRobots: [],
      allRobots: [],
      loading: true,
      giveLink: '',
      selectedRobo: ''
    }
    this.roboService = new RobotService(this.props.contract)
  }

  async componentDidMount() {
    this._updateRobos()
    this.interval = setInterval(() => this._updateRobos(), 5000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  async _updateRobos() {
    const myRobotIds = await this.roboService.robotsOf(this.props.identity.address)
    const myRobots = myRobotIds
      .map((id) => ({
        id: id,
        name: `Robo ${id}`
      }))
    this.setState({ myRobots , loading: false})
    console.log('Updated robos')
  }

  _createGiveLink() {
    const { identity, universalLoginSdk } = this.props
    const tokenAddress = this.props.contract.address
    const tokenId = this.state.selectedRobo.id
    const giveLink = universalLoginSdk.createOnboardingLink(
      `${config.frontend}/invite`,
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

  async _openSelectOpponentModal() {
    const allRobotIds = await this.roboService.getAllRobots(this.props.identity.address)
    const allRobots = allRobotIds
      .map(id => ({
        id,
        name: `Robo ${id}`
      }))
    this.setState({
      isSelectOpponentModalOpen: true,
      allRobots
    })
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
        <Header onClickLogout={this.props.onLogout} />
        <Box pad="medium">
          <Heading level="3">
            Hello  {this.props.identity.name}!
          </Heading>
          <Heading level="4">
            <a href={`https://ropsten.etherscan.io/address/${this.props.identity.address}`}>{this.props.identity.address}</a>
          </Heading>
          {this.state.loading && "Loading Robots..."}
          <Box direction= 'row-responsive' wrap>
            {this.state.myRobots.map(robot=> (
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
            robots={this.state.allRobots}
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
