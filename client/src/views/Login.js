import React, { Component } from 'react'
import { Box, TextInput, Heading, Text } from 'grommet'
import { User } from 'grommet-icons'

import RoboPic from '../components/RoboPic'

import getQueryStringParams from '../utils/getQueryStringParams'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queryParams: getQueryStringParams(props.queryStringParams),
      generatingRobot: false,
      isClaimed: false
    }
  }

  componentDidMount() {
    this.setState({
      queryParams: getQueryStringParams(this.props.queryStringParams)
    })
  }

  _isUserInvited() {
    const requiredQueryParams = [
      'privateKey',
      'signature',
      'tokenAddress',
      'tokenId',
      'senderAddress',
      'senderName'
    ]
    for (const requiredParam of requiredQueryParams) {
      if (!this.state.queryParams[requiredParam]) {
        return false
      }
    }
    return true
  }

  _getName() {
    const ensDomain = this.state.queryParams.senderName
    return ensDomain.split('.')[0]
  }

  async _claim() {
    const {
      privateKey,
      signature,
      tokenAddress,
      tokenId,
      senderName,
      senderAddress
    } = this.state.queryParams
    this.setState({ isClaiming: true })
    const [ privateKeyNew, txHash ] = await this.props.universalLoginSdk.claimOnboardingLink(
      privateKey,
      signature,
      tokenAddress,
      tokenId,
      senderName,
      senderAddress
    )
    this.setState({ txHash })
    this._checkTxHash()
  }

  _checkTxHash() {
    this.props.provider.once(this.state.txHash, (tx) => {
      console.log(tx)
      this.setState({ isClaimed: true })
    })
  }

  _getClaimHeading() {
    if (this.state.isClaimed) {
      return 'Successfully claimed your gift!'
    } else if (this.state.isClaiming) {
      return 'Robot being claimed...'
    } else if (!this.state.isClaimed && !this.state.isClaiming) {
      return `${this._getName()} sent you a gift!`
    }
  }

  _getClaimText() {
    if (this.state.isClaimed) {
      return (
        <Text>
          Congratulations to your new robot! Check your tx on <a href={`https://ropsten.etherscan.io/tx/${this.state.txHash}`} target='_blank'>etherscan</a>
        </Text>
      )
    } else if (this.state.isClaiming) {
      return (
        <Text>
          Check your tx on <a href={`https://ropsten.etherscan.io/tx/${this.state.txHash}`} target='_blank'>etherscan</a>
        </Text>
      )
    } else if (!this.state.isClaimed && !this.state.isClaiming) {
      return (
        <Text>Enter your name and click button to claim your gift.</Text>
      )
    }
  }

  render() {
    return (
      <Box
        direction="row-responsive"
        justify="center"
        align="center"
        pad="xlarge"
        gap="medium"
      >
      {this._isUserInvited() ? (
        <Box
          animation='fadeIn'
          basis="large"
          pad="large"
          align="center"
          background={{ color: "light-1" }}
          round
          gap="large"
          elevation="medium"
        >
          <Heading size="small">
            {this._getClaimHeading()}
          </Heading>
          <Box animation="fadeIn" height="small">
            <RoboPic roboId={this.state.queryParams.tokenId} />
          </Box>
          {this._getClaimText()}
          <TextInput
            placeholder="Enter a name"
            onInput={(event) => this.props.onChangeName(event.target.value)}
            suggestions={this.props.ensSuggestions}
            onSelect={({ suggestion }) => this._claim(suggestion)}
          />
        </Box>
      ) : (
        <Box
          animation="fadeIn"
          basis="medium"
          pad="large"
          align="center"
          background={{ color: "light-2", opacity: "strong" }}
          round
          gap="large"
          elevation="medium"
        >
          <Heading size="small">
            Welcome!
          </Heading>
          <User size="large" />
          <TextInput
            placeholder="Enter your name"
            onInput={(event) => this.props.onChangeName(event.target.value)}
            suggestions={this.props.ensSuggestions}
            onSelect={({ suggestion }) => this.props.onSelectSuggestion(suggestion)}
          />
        </Box>
      )}
      </Box>
    )
  }
}

export default Login
