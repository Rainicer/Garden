// src/components/NFTComponent.js

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import NFTContractABI from './contracts/NFTContractABI'; // 导入 ABI 文件

const NFTComponent = () => {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokenId, setTokenId] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);

        // 在此处设置智能合约 ABI 和地址
        const contractABI = NFTContractABI;
        const contractAddress = '0x6EDF2D79d4B0708B46e8163c6964383D65621B88'; // 请确保是字符串形式
        const nftContract = new web3Instance.eth.Contract(contractABI, contractAddress);
        setContract(nftContract);
      } else {
        console.error('Web3 not detected. Consider installing MetaMask.');
      }
    };

    initWeb3();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleMint = async () => {
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageBase64 = reader.result.split(',')[1];

        // 调用合约的 mintNFT 函数，传入图片 base64 数据
        await contract.methods.mintNFT(account, imageBase64).send({ from: account });

        alert('NFT Minted successfully!');
      };

      if (imageFile) {
        reader.readAsDataURL(imageFile);
      } else {
        alert('Please select an image.');
      }
    } catch (error) {
      console.error('Error minting NFT:', error.message);
      alert('Error minting NFT. Check the console for details.');
    }
  };

  return (
    <div>
      <h1>NFT Minting</h1>
      <p>Connected Account: {account}</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <br />
      <input
        type="text"
        placeholder="Enter Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <br />
      <button onClick={handleMint}>Mint NFT</button>
    </div>
  );
};

export default NFTComponent;

