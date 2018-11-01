import React, { Component } from 'react'
import { Box, TextInput, Heading, Text, Button, Meter } from 'grommet'
import RoboPic from '../components/RoboPic'
import robo from '../images/robo.png'
import getQueryStringParams from '../utils/getQueryStringParams'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queryParams: getQueryStringParams(props.queryStringParams),
      isClaimed: false,
      isClaiming: false,
      progress: 0
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
    this._startProgress()
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
      return 'Robot ready for fight'
    } else if (this.state.isClaiming) {
      return 'Almost fit for fight'
    } else if (!this.state.isClaimed && !this.state.isClaiming) {
      // return `You received a robot from ${this._getName()}`
      return `You received a robot`
    }
  }

  _startProgress() {
    setTimeout(() => this.setState({ progress: 10 }), 1000)
    setTimeout(() => this.setState({ progress: 15 }), 2000)
    setTimeout(() => this.setState({ progress: 23 }), 3000)
    setTimeout(() => this.setState({ progress: 25 }), 4000)
    setTimeout(() => this.setState({ progress: 30 }), 5000)
    setTimeout(() => this.setState({ progress: 70 }), 7000)
    setTimeout(() => this.setState({ progress: 90 }), 10000)
  }

  _getClaimMidSection() {
    if (this.state.isClaimed) {
      return (
        <Text size='medium'>
          Congratulations to your new robot
        </Text>
      )
    } else if (this.state.isClaiming) {
      return (
        <Box align='center'>
          <Meter
            values={[{
              value: this.state.progress,
              color: '#7D4CDB'
            }]}
          />
          <Box pad='medium'>
            <Text size='small'>
              View on <a href={`https://ropsten.etherscan.io/tx/${this.state.txHash}`} target='_blank'>etherscan</a>
            </Text>
          </Box>
        </Box>
      )
    } else if (!this.state.isClaimed && !this.state.isClaiming) {
      return (
        <Box align='center'>
          <Box pad='medium'>
            <Text>
              Enter your username to check it out
            </Text>
          </Box>
          <TextInput
            onInput={(event) => this.props.onChangeName(event.target.value)}
          />
          <Box pad='small'>
            <Text size='small' color='brand'>
              Tip: Your username gives you access to all dapps
            </Text>
          </Box>
        </Box>
      )
    }
  }

  render() {
    return (
      <Box
        justify="center"
        align="center"
        pad="xlarge"
        gap="medium"
        height='full'
      >
      {this._isUserInvited() ? (
        <Box
          animation="fadeIn"
          align="center"
          round
          gap="small"
          elevation="medium"
          border={{
            color: 'brand',
            size: 'small'
          }}
          justify='between'
          background={{ color: 'white' }}
          pad='large'
          flex
        >
          <Heading size='small' color='brand'>
            {this._getClaimHeading()}
          </Heading>
          <Box animation="fadeIn" height="small">
            <RoboPic roboId={this.state.queryParams.tokenId} />
          </Box>
          {this._getClaimMidSection()}
          {!this.state.isClaimed && !this.state.isClaiming ? (
            <Button
              onClick={() => this._claim()}
              disabled={!this.props.name}
              primary={this.props.name !== ''}
              label='Confirm'
            />
          ): null}
          <Text size='small'>
            Pictures by <a href='https://robohash.org/' target='_blank'>Robohash</a>
          </Text>
        </Box>
      ) : ( 
        <Box
          animation="fadeIn"
          align="center"
          round
          gap="small"
          elevation="medium"
          border={{
            color: 'brand',
            size: 'small'
          }}
          justify='between'
          background={{ color: 'white' }}
          pad='large'
          flex
        >
          <Box align='center'>
            <Heading size='medium' color='brand'>
              Onbotting
            </Heading>
            <Text size='large' weight='bold'>
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
              <Text size='small' color='brand'>
                Tip: Your username gives you access to all dapps
              </Text>
            </Box>
          </Box>
          <Button
            onClick={() => this.props.onClickGo()}
            disabled={!this.props.name}
            primary={this.props.name !== ''}
            label='Confirm'
            pad='medium'
          />
          <Text size='small'>
            Pictures by <a href='https://robohash.org/' target='_blank'>Robohash</a>
          </Text>
        </Box>
      )}
      </Box>
    )
  }
}

export default Login
