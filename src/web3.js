// src/web3.js

import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // Use MetaMask's provider
  web3 = new Web3(window.ethereum);
  window.ethereum.enable(); // Request account access if needed
} else {
  // Fallback to a local Ethereum provider
  const provider = new Web3.providers.HttpProvider('http://localhost:8545');
  web3 = new Web3(provider);
}

export default web3;

