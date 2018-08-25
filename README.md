# Marketplace

## What does it do?

A marketplace smart contract with basic transactions. Admin is the owner of the contract and must approve store applications before they are displayed. Sellers and buyers can create a store (which must be approved by admin) in the marketplace to sell digital assets and can perform browse the marketplace, withdraw Ether from sells made, CRUD information on listed digital assets. 

### Run an Ethereum client

Ganache recommended, download (Ganache)[https://truffleframework.com/ganache] and launch the application. This will generate a blockchain running locally on port 7545.

## Setting up the dapp

```bash
git clone git@github.com:sophiacodes/sweet.git
cd sweet
npm install -g truffle // If not already installed
npm i
truffle compile
truffle migrate
```

## Running the tests

```bash
truffle test
```

### Configure Metamask

The easiest way to interact with our dapp in a browser is through (MetaMask)[https://metamask.io/], a browser extension for both Chrome and Firefox.

Connect MetaMask to the blockchain created by Ganache. Click the menu that shows "Main Network" and select Custom RPC. In the box titled "New RPC URL" enter http://127.0.0.1:7545 and click Save. 

## Running the dapp

```bash
npm start
```
The Dapp will automagically open in a new tab in your browser on `http://localhost:3000`
