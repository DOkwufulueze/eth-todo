import React, { Component } from 'react';
import stateChangeManager from './StateChangeManager';
import '../css/web3-suggester.css';
import metamaskLogo from '../images/download-metamask-dark.png';

class Web3Suggester extends Component {
  constructor() {
    super();
    this.state = stateChangeManager.web3SuggesterState;
  }

  render() {
    const inBlockchainMessage = <div className='message'>Your browser is Web3-injected.<br /><br />Please log into a blockchain address of your choice to get started.</div>;
    const outOfBlockchainMessage = (<div className='message'>It appears you're not on the blockchain.<br /><br />Please install a Web3 injector like <a href='https://metamask.io'>MetaMask</a> to get started.<br /><a href='https://metamask.io'><img className='metamask-logo' src={ metamaskLogo } alt='Metamask' /></a></div>);
    return (
      <div className='wrapper'>
        { this.props.isInBlockchain === '1' ? inBlockchainMessage : outOfBlockchainMessage }
      </div>
    );
  }
}

export default Web3Suggester;
