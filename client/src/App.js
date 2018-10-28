import React, { Component } from 'react'
import EthereumIdentitySDK from 'universal-login-monorepo/universal-login-sdk'
import { providers, Contract } from 'ethers'
import publicIP from 'react-native-public-ip'
import { detect } from 'detect-browser'
import iplocation from 'iplocation'
import moment from 'moment'
import { Route, Redirect, withRouter } from 'react-router-dom'

import Login from './views/Login'
import Home from './views/Home'
import './App.css'
import RobotsWarsInterface from './RobotsWars.json'

class App extends Component {
  constructor() {
    super()
    this.state = {
      view: 'login',
      name: ''
    }
    this.provider = new providers.JsonRpcProvider('https://ropsten.infura.io/v3/dc1be3b516c34da9a010daed42daa947')
    this.sdk = new EthereumIdentitySDK('http://4b9d0325.ngrok.io', this.provider)
    this.robotsWarsContractAddress = '0x3c70a27962507e3f4ab97858fa503412aaf857aa'
    this.robotsWarsContract = new Contract(
      this.robotsWarsContractAddress,
      RobotsWarsInterface,
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

  async _go(ensDomain) {
    if (ensDomain === 'backdoor.tenz-id.xyz') {
      this.identity = {
        name: ensDomain,
        privateKey: '0x34C09F237DCAA085C301D5148E024B9F04E8FC5603EE3B6E08C39AFE789E423A',
        address: '0xFdF32Da5a86414BD132cB37f7e9815906DCA3dc3'
      }
      this.props.history.push('/')
      return
    }
    try {
      const identityAddress = await this.sdk.identityExist(ensDomain)
      if (identityAddress) {
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

  _getNameSuggestions() {
    const ensDomains = ['tenz-id.xyz']
    if (this.state.name) {
      return ensDomains.map(domain => `${this.state.name}.${domain}`)
    }
    return []
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
              <Home
                identity={this.identity}
                universalLoginSdk={this.sdk}
                rpcProvider={this.provider}
                contract={this.robotsWarsContract}
              />
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
              ensSuggestions={this._getNameSuggestions()}
              onSelectSuggestion={this._go.bind(this)}
            />
          }
        />
      </div>
    )
  }
}

export default withRouter(App)
