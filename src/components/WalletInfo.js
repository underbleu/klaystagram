import React, { Component } from 'react'
import { cav } from 'klaytn/caver'
import { KLAY_FAUCET } from 'constants/url'
import Input from 'components/Input'
import './WalletInfo.scss'

class WalletInfo extends Component {
  state = {
    balance: '0',
  }

  componentDidMount() {
    this.getBalance()
  }

  getBalance = (address = this.props.address) => {
    if (!address) return
    cav.klay.getBalance(address).then((balance) => {
      this.setState({
        balance: cav.utils.fromWei(balance, 'ether'),
      })
    })
  }

  render() {
    return (
      <div className="WalletInfo">
        <Input
          className="WalletInfo__address"
          name="address"
          label="Wallet Address"
          value={this.props.address}
          readOnly
        />
        <Input
          className="WalletInfo__balance"
          name="balance"
          label="Balance"
          value={`${this.state.balance} KLAY`}
          readOnly
        />
        <p className="WalletInfo__faucet">
          If you need small amount of Klay for testing.
          <a
            className="WalletInfo__link"
            href={KLAY_FAUCET}
            target="_blank"
            rel="noreferrer noopener"
          >
            Run Klay Faucet
          </a>
        </p>
      </div>
    )
  }
}


export default WalletInfo
