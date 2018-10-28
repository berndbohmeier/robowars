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

  _claim(ensName) {
    this.setState({ isClaimed: true })
    setTimeout(() => this.props.onSelectSuggestion(ensName), 2000)
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
          {!this.state.isClaimed ? (
            <Heading size="small">
              {this._getName()} sent you a gift!
            </Heading>
          ) : (
            <Heading size="small">
              Successfully claimed your gift!
            </Heading>
          )}
          <Box animation="fadeIn" height="small">
            <RoboPic roboId={this.state.queryParams.tokenId} />
          </Box>
          <Text size="large">
            {!this.state.isClaimed ? 'Enter your name and click button to claim your gift.' : '  '}
          </Text>
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
