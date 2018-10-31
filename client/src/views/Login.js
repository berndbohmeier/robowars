import React, { Component } from 'react'
import { Box, TextInput, Heading, Text, Button } from 'grommet'
import { User } from 'grommet-icons'

import RoboPic from '../components/RoboPic'
import robo from '../images/robo.png'
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

  async _claim(selectedName) {
    const {
      privateKey,
      signature,
      tokenAddress,
      tokenId,
      senderName,
      senderAddress
    } = this.state.queryParams
    this.setState({ isClaiming: true, selectedName: selectedName })
    const [ privateKeyNew, txHash ] = await this.props.universalLoginSdk.claimOnboardingLink(
      privateKey,
      signature,
      tokenAddress,
      tokenId,
      senderName,
      senderAddress
    )
    this.setState({ txHash })
    this._checkTxHash(privateKeyNew)
  }

  _checkTxHash(privateKeyNew) {
    try {
      this.props.provider.once(this.state.txHash, (tx) => {
        console.log(tx)
        const address = '0x'+ tx.logs[tx.logs.length-1].topics[2].substr(26, 66)
        console.log(address)
        setTimeout(() => this.props.onSelectSuggestion(this.state.selectedName, address, privateKeyNew), 2000)
        this.setState({ isClaimed: true })
      }) 
    } catch (error) {
      this.setState({ error })
    }
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
        height='full'
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
          round
          gap="large"
          elevation="medium"
          border={{
            color: 'brand',
            size: 'medium'
          }}
        >
          <Heading size="medium">
            Robo Wars
          </Heading>
          <img src={robo} height='150'/>
          <TextInput
            placeholder="Enter your name"
            onInput={(event) => this.props.onChangeName(event.target.value)}
            suggestions={this.props.ensSuggestions}
            onSelect={({ suggestion }) => this.props.onSelectSuggestion(suggestion)}
          />
          <Button
            onClick={() => this.props.onClickGo()}
            disabled={!this.props.isNameSet}
            primary={this.props.isNameSet}
            label='Login'
          />
        </Box>
      )}
      </Box>
    )
  }
}

export default Login
