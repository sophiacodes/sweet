# Marketplace dApp

## What does it do?

A marketplace smart contract with basic transactions. Admin is the owner of the contract and must approve store applications before stores appear in the marketplace. Sellers and buyers can create a store (which must be approved by admin) in the marketplace to sell digital assets and can browse the marketplace, withdraw Ether from sells made, perform CRUD operations on their listed digital assets. 

### Run an Ethereum client

Ganache recommended, download [Ganache](https://truffleframework.com/ganache) and launch the application. This will generate a blockchain running locally on port 7545.

Or you can use [Ganache CLI](https://github.com/trufflesuite/ganache-cli) by `npm install -g ganache-cli` (if not already installed) and then `ganache-cli <options>`, which will run on port 8545. 

## Setting up the dApp

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

Interact with the dApp in a browser is using [MetaMask](https://metamask.io/), a browser extension for both Chrome and Firefox.

Connect MetaMask to the local blockchain created by Ganache. Click the menu that shows "Main Network" and select Custom RPC. In the box titled "New RPC URL" enter `http://127.0.0.1:7545` (if using Ganache Application) or enter `http://127.0.0.1:8545` (if using Ganache-CLI) and click Save. 

## Running the dApp

```bash
npm start
```
The dApp will automagically open in a new tab in your browser on `http://localhost:3000`

![alt text](https://github.com/sophiacodes/sweet/blob/master/public/images/home-page-screenshot.png)

![alt text](https://github.com/sophiacodes/sweet/blob/master/public/images/asset-page-screenshot.png)

By default in MetaMask the first account will belong to admin, you'll need to import other accounts who will be buyers/sellers. 

## Additional information

Image source [CryptoKittes](https://www.cryptokitties.co/)

This dApp is a demo which is WIP, thus incomplete and is NOT FOR PRODUCTION.