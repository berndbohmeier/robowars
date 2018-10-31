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

  async _claim() {
    const selectedEnsName = this.props.name + '.tenz-id.xyz'
    const {
      privateKey,
      signature,
      tokenAddress,
      tokenId,
      senderName,
      senderAddress
    } = this.state.queryParams
    this.setState({ isClaiming: true, selectedName: selectedEnsName })
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
        setTimeout(() => this.props.onClickGo(this.state.selectedName, privateKeyNew, address), 2000)
        this.setState({ isClaimed: true })
      }) 
    } catch (error) {
      console.log(error)
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
          background={{ color: 'white' }}
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
          />
          <Button
            onClick={() => this._claim()}
            disabled={!this.props.name}
            primary={this.props.name !== ''}
            label='Claim gift'
          />
        </Box>
      ) : ( 
        <Box
          animation="fadeIn"
          basis='1/3'
          height='large'
          align="center"
          round
          gap="medium"
          elevation="medium"
          border={{
            color: 'brand',
            size: 'small'
          }}
          justify='between'
          background={{ color: 'white' }}
          pad={{ bottom: 'medium' }}
        >
          <Box align='center'>
            <Heading size='medium' color='brand'>
              Robo Wars
            </Heading>
            <Text size='large'>
              Fight & share robots with your friends
            </Text>
          </Box>
          <img src={robo} height='200' />
          <Box>
            <TextInput
              placeholder="Enter your name"
              onInput={(event) => this.props.onChangeName(event.target.value)}
            />
            <Box pad='small'>
              <Text size='small'>
                Tip: Your username gives you access to all dapps
              </Text>
            </Box>
          </Box>
          <Button
            onClick={() => this.props.onClickGo()}
            disabled={!this.props.name}
            primary={this.props.name !== ''}
            label='Confirm'
          />
          <Text size='small'>
            Powered by <a href='https://robohash.org/' target='_blank'>Robohash</a>
          </Text>
        </Box>
      )}
      </Box>
    )
  }
}

export default Login
