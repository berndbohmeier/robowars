import React, { Component } from 'react'
import EthereumIdentitySDK from 'universal-login-monorepo/universal-login-sdk'
import { providers, Wallet, Contract } from 'ethers'
import publicIP from 'react-native-public-ip'
import { detect } from 'detect-browser'
import iplocation from 'iplocation'
import moment from 'moment'
import { Route, Redirect, withRouter } from 'react-router-dom'

import Clicker from 'universal-login-monorepo/universal-login-example/build/Clicker'
import Login from './views/Login'
import Home from './views/Home'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      view: 'login',
      name: ''
    }
    this.provider = new providers.JsonRpcProvider('http://localhost:18545')
    this.sdk = new EthereumIdentitySDK('http://localhost:3311', this.provider)
    this.clickerContractAddress = '0x87bB498DA0C18af128180b761680fb47D6FB365d'
    this.clickerContract = new Contract(
      this.clickerContractAddress,
      Clicker.interface,
      this.provider
    )
  }

  componentDidMount = async () => {
    try {
      await this.sdk.start()
    } catch (error) {
      console.log(error);
    }
  }

  // Login View functions
  async _getLabel() {
    const ipAddress = await publicIP()
    const browser = detect()
    const { city } = await iplocation(ipAddress)
    return {
      ipAddress,
      name: browser.name,
      city,
      time: moment().format('h:mm'),
      os: browser.os,
      version: browser.version
    }
  }

  async _go() {
    try {
      const ensDomain = `${this.state.name}.mylogin.eth`
      const identityAddress = await this.sdk.identityExist(ensDomain)
      if (identityAddress) {
        this.setState({ view: 'connecting' })
        const privateKey = await this.sdk.connect(identityAddress, await this._getLabel())
        this.identity = {
          name: ensDomain,
          privateKey,
          address: identityAddress
        }
      } else {
        const [ privateKey, address ] = await this.sdk.create(ensDomain)
        this.identity = {
          name: ensDomain,
          privateKey,
          address
        }
      }
      this.props.history.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  _changeName(name) {
    this.setState({ name })
  }

  render() {
    return (
      <div>
        <Route
          exact
          path='/'
          render={() => (
            !this.identity ? (
              <Redirect to='/login'/>
            ) : (
              <Home />
            )
          )}
        />
        <Route
          path='/invite'
          render={() => <Redirect to={`/login${this.props.location.search}`} />}
        />
        <Route
          path='/login'
          render={() =>
            <Login
              queryStringParams={this.props.location.search}
              onClickGo={this._go.bind(this)}
              onChangeName={this._changeName.bind(this)}
            />
          }
        />
      </div>
    )
  }
}

export default withRouter(App)
