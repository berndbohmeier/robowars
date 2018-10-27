import React, { Component } from 'react'
import { Box, Button, TextInput, Heading, Text } from 'grommet'
import { User, Gift } from 'grommet-icons'

import RoboPic from '../components/RoboPic'

import getQueryStringParams from '../utils/getQueryStringParams'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queryParams: getQueryStringParams(props.queryStringParams)
    }
  }

  componentDidMount() {
    this.setState({
      queryParams: getQueryStringParams(this.props.queryStringParams),
      isClaimed: false
    })
  }

  _isUserInvited() {
    const requiredQueryParams = [
      'sigA',
      'sigB'
    ]
    for (const requiredParam of requiredQueryParams) {
      if (!this.state.queryParams[requiredParam]) {
        return false
      }
    }
    return true
  }

  claim() {
    this.setState({ isClaimed: true })
    setTimeout(() => this.props.onClickGo(), 2000)
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
          pad="xlarge"
          align="center"
          background={{ color: "light-1" }}
          round
          gap="large"
          elevation="medium"
        >
          {!this.state.isClaimed ? (
            <Heading size="small">
              You received a gift!
            </Heading>
          ) : (
            <Heading size="small">
              Successfully claimed gift!
            </Heading>
          )}
          <Box animation="fadeIn" height="small">
            {!this.state.isClaimed ? (
              <Gift size="xlarge" />
            ) : (
              <RoboPic roboId="test" />
            )}
          </Box>
          <Text size="large">
            {!this.state.isClaimed ? 'Enter your name and click button to claim your gift.' : '  '}
          </Text>
          <TextInput
            placeholder="Enter a name"
            onInput={(event) => this.props.onChangeName(event.target.value)}
          />
          <Button
            label="Claim"
            onClick={this.claim.bind(this)}
            disabled={this.state.isClaimed}
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
          />
          <Button
            label="Let's go"
            onClick={this.props.onClickGo.bind(this)}
          />
        </Box>
      )}
      </Box>
    )
  }
}

export default Login
