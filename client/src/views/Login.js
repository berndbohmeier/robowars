import React, { Component } from 'react'
import { Box, Button, TextInput, Heading, Text } from 'grommet'
import { User, Gift } from 'grommet-icons'

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
      queryParams: getQueryStringParams(this.props.queryStringParams)
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
          <Heading size="small">
            You received a gift!
          </Heading>
          <Gift size="xlarge" />
          <Text size="large">
            Enter your name and click button to claim your gift.
          </Text>
          <TextInput
            onInput={(event) => this.props.onChangeName(event.target.value)}
          />
          <Button
            label="Claim"
            onClick={this.props.onClickGo.bind(this)}
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
          <User size="large" />
          <TextInput
            placeholder="Enter a name"
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
