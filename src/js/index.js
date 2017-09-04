import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import web3Manager from './Web3Manager';
import constants from './constants';
import '../css/index.css';
import Web3Suggester from './Web3Suggester';
import App from './App';

window.addEventListener('load', (evt) => {
  web3Manager.web3 = window.web3 || new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('http://localhost:8545'));
  const web3Object = web3Manager.web3;
  web3Object.version.getNetwork((err, networkId) => {
    if (err) {
      ReactDOM.render(<Web3Suggester isInBlockChain='0' />, document.getElementById('root'));
    } else {
      networkId = networkId.toString();
      switch(networkId) {
        case '765':
          web3Object.eth.getCoinbase((err, activeAddress) => {
            if (err) {
              ReactDOM.render(<Web3Suggester isInBlockChain='1' />, document.getElementById('root'));
            } else {
              activeAddress = activeAddress.toString().toLowerCase();
              if (activeAddress !== '')
                ReactDOM.render(<App address={ activeAddress } network={ constants.networks[networkId] } />, document.getElementById('root')); 
              else
                ReactDOM.render(<Web3Suggester isInBlockChain='1' />, document.getElementById('root'));
            }
          });
        break;

        default:
          ReactDOM.render(<Web3Suggester isInBlockChain='0' />, document.getElementById('root'));
      }
    }
  });
});
