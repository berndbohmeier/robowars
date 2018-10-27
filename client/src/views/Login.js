import React, { Component } from 'react';
import { Box, Button, TextInput } from 'grommet';
import { User } from 'grommet-icons';

class Login extends Component {
  constructor(props) {
    super(props)
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
            // color="primary"
            label="Let's go"
            onClick={this.props.onClickGo.bind(this)}
          />
        </Box>
      </Box>
    )
  }
}

export default Login
