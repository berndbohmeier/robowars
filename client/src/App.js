import React, { Component } from 'react'
import Login from './views/Login'
import Home from './views/Home'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      view: 'home',
      name: ''
    }
  }

  componentDidMount = async () => {
    try {

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  }

  // Login View functions
  _go() {
    this.setState({ view: 'home' })
  }

  _changeName(event) {
    this.setState({ name: event.target.value })
  }

  

  render() {
    if (this.state.view === 'login') {
      return (
        <Login
          onClickGo={this._go.bind(this)}
          onChangeName={this._changeName.bind(this)}
        />
      )
    } else if (this.state.view === 'home') {
      return <Home />
    }
    return 'Loading...'
  }
}

export default App
