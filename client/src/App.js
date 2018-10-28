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
import RobotsWars from './contracts/Robots.json'

class App extends Component {
  constructor() {
    super()
    this.state = {
      view: 'login',
      name: ''
    }
    this.provider = new providers.JsonRpcProvider('https://ropsten.infura.io/v3/dc1be3b516c34da9a010daed42daa947')
    this.sdk = new EthereumIdentitySDK('http://6fa1c2dd.ngrok.io', this.provider)
    this.robotsWarsContractAddress = '0xc545cc75415e397fa3e52e90f738d11e485ce69b'
    this.robotsWarsContract = new Contract(
      this.robotsWarsContractAddress,
      RobotsWars.abi,
      this.provider
    )
    const identity = localStorage.getItem("identity")
    if (identity) {
      this.identity = JSON.parse(identity)
    }
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

  async _go(ensDomain, address, privateKey) {
    if (ensDomain === 'alice.tenz-id.xyz') {
      this.identity = {
        name: ensDomain,
        privateKey: '0x34C09F237DCAA085C301D5148E024B9F04E8FC5603EE3B6E08C39AFE789E423A',
        address: '0x502a1d30edb6e51261eedfcb41f6626c29ee6adc'/*'0x498208d7b2f695bd3f0162fcae6678253f819c2f'*/
      }
    } else {
      this._setIdentity({
        name: ensDomain,
        address,
        privateKey
      })
    }
    localStorage.setItem('identity', JSON.stringify(this.identity))
    this.props.history.push('/')
    // try {
    //   const identityAddress = await this.sdk.identityExist(ensDomain)
    //   if (identityAddress) {
    //     const privateKey = await this.sdk.connect(identityAddress, await this._getLabel())
    //     this.identity = {
    //       name: ensDomain,
    //       privateKey,
    //       address: identityAddress
    //     }
    //   } else {
    //     const [ privateKey, address ] = await this.sdk.create(ensDomain)
    //     this.identity = {
    //       name: ensDomain,
    //       privateKey,
    //       address
    //     }
    //   }
    //   this.props.history.push('/')
    // } catch (error) {
    //   console.error(error)
    // }
  }

  _changeName(name) {
    this.setState({ name })
  }

  _logout() {
    localStorage.removeItem('identity')
    this.identity = null
    this.setState({identity: this.identity})
  }

  _getNameSuggestions() {
    const ensDomains = ['tenz-id.xyz']
    if (this.state.name) {
      return ensDomains.map(domain => `${this.state.name}.${domain}`)
    }
    return []
  }

  _navigateHome() {
    this.props.history.push('/')
  }

  _setIdentity({ name, address, privateKey }) {
    this.identity = {
      name,
      address,
      privateKey
    }
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
                onLogout={this._logout.bind(this)}
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
              identity={this.identity}
              universalLoginSdk={this.sdk}
              provider={this.provider}
            />
          }
        />
      </div>
    )
  }
}

export default withRouter(App)
