import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { AccountData } from 'drizzle-react-components'
import CreateAsset from '../../components/marketplace/create-asset/CreateAsset'
import ActiveListings from '../../components/marketplace/active-listings/Active-Listings'
import SoldListings from '../../components/marketplace/sold-listings/Sold-Listings'

class Profile extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
    this.state = {
      hasStoreAccount: null,
      allAssets: []
    };
    this.account = {from: this.props.accounts[0]};
    this.contractAddress = this.contracts.Marketplace.address;
    console.log('contract address', this.contracts.Marketplace.address)
  }

  componentDidMount() {
    this.checkAdminRights();
    // const sellerExists = 
    this.getSeller();
    // console.log('sellerExists', sellerExists)
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)

    this.setState({
      storeData: nextProps.profileState.sellerStore.storeData,
      hasStoreAccount: nextProps.profileState.accountStatus,
      allAssets: nextProps.profileState.allAssets
    });
  }

  checkAdminRights = async () => {
    const admin = await this.contracts.Marketplace.methods.admin().call(this.account);
    console.log('called admin again...', admin);
    if (admin && admin === this.props.accounts[0]) {
      console.log('is admin, go to /admin page')
      this.props.router.push('/admin');
    }
  }

  getStoreBalance = async () => {
    if (this.state.hasStoreAccount) {
      await this.contracts.Marketplace.methods.store(this.props.accounts[0]).call()
        .then((result) => {
          const toEtherConversion = (parseFloat(result.balance)) / 1000000000000000000;
          this.setState({
            balance: toEtherConversion || 0
          })
        });
    }
  }

  getSeller = async () => {
    // sellerExists = 
    await this.contracts.Marketplace.methods.store(this.props.accounts[0]).call({from: this.props.accounts[0]})
      .then((response) => {
        // Update to redux-store
        this.props.getSellerStore({ storeData: response });
        this.props.hasAccount(response.owner === this.props.accounts[0]);
        // return response;
        if (response.owner === this.props.accounts[0]) {
          this.getAssets(); // Only if user has a store
          this.getStoreBalance(); // Get store balance
        }
      })
      .catch((error) => {
        console.error(error);
        // return error;
      });
    // return sellerExists;
  }

  sendApplication = async (e) => {
    e.preventDefault();

    await this.contracts.Marketplace.methods.createStore(this.state.storeName).send(this.account)
      .then((data) => {
          // HasAccount set to true, update store
          this.props.hasAccount(true);
      })
      .catch((error) => {
          this.props.hasAccount(false);
          console.error(error);
      });
  }

  storeNameUpdated = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  createItem = async (e) => {
    console.log('createItem', e)
    const { assetName, assetDescription, assetPrice, assetAddress } = e;
    // const assetCreated = 
    const toWeiAssetPriceConversion = (parseInt(assetPrice)) * 1000000000000000000;
    await this.contracts.Marketplace.methods.createAsset(assetName, assetAddress, assetDescription, toWeiAssetPriceConversion).send().then((data) => {
      console.log('assetCreated', data);
      // this.getAllAsset();
      // return data;
      const asset = {
        storeOwner: this.account,
        name: assetName,
        description: assetDescription,
        price: toWeiAssetPriceConversion,
        assetId: assetAddress,
        buyer: '0x0000000000000000000000000000000000000000',
        sold: false
      };
      let allAssets = this.state.allAssets;
      if (this.state.allAssets.length > 0) {
        allAssets = [...allAssets, asset];
      }
      this.props.createAsset(allAssets);
    })
    .catch((error) => {
      // return error;
      console.error(error);
    });
  }

  getAssets = async () => {
    const assetCount = await this.contracts.Marketplace.methods.assetIdCounter().call();
    let allAssets = [];
    for (let i = 0; i < assetCount; i++) {
      const data = await this.contracts.Marketplace.methods.asset(i).call();
      if (data.storeOwner === this.props.accounts[0]) {
        const asset = {
          storeOwner: data.storeOwner,
          name: data.name,
          description: data.description,
          price: data.price,
          assetId: data.assetId,
          buyer: data.buyer,
          sold: data.sold
        };
        allAssets = [ ...allAssets, asset ];
      }
    }
    // this.setState({
    //   allAssets
    // });
    this.props.createAsset(allAssets);
    // console.log('thi.s', this.state)
  }

  onChangeWithdrawFunds = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  withdrawFunds = async () => { console.log('WITHDRAW ETHER, to', this.state['receiver-address'], 'amount', this.state['withdrawal-amount'])
    const receiver = this.state['receiver-address'];
    const amount = parseFloat(this.state['withdrawal-amount']);
    // // const withdrawalStatus = 
    // await this.contracts.Marketplace.methods.withdrawFunds(receiver, amount).send(this.props.accounts[0])
    // .then((receipt) => {
    //   console.log('withdrawalStatus', receipt);
    //   // this.getAllStores();
    //   return receipt;
    // })
    // .catch((error) => {
    //   return error;
    // });  
    console.log('************** WITHDRAW ****************')
    const toWeiAssetPriceConversion = parseFloat(amount) * 1000000000000000000;
    // const contractAddress = await this.contracts.Marketplace.methods.admin().call();
    const sendParams = {
      from: this.contractAddress, // wrong not admin.. should be contract address 
      to: this.props.accounts[0], // receiver,
      gas: 3000000,
      value: toWeiAssetPriceConversion
    };
    console.log('************** START WITHDRAW ****************')
    await this.contracts.Marketplace.methods.withdrawFunds(sendParams.to, sendParams.value).send(sendParams)
    .then((receipt) => {
      console.log('RECEPIT: withdrawalStatus', receipt);
      // this.getAllStores();
      return receipt;
    })
    .catch((error) => {
      console.log('ERROR: withdrawalStatus', error);
      return error;
    });
    console.log('************** END WITHDRAW ****************')
  }
  render() {
    const defaultTab = (this.state.hasStoreAccount) ? 0 : 1;
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <Tabs className="tabs" defaultIndex={defaultTab}>
              <TabList className="tab-list">
                <Tab><h2>Your EthBay Account</h2></Tab>
                <Tab><h2>Sell Assets</h2></Tab>
                <Tab><h2>Bought Assets</h2></Tab>
              </TabList>

              <TabPanel>
                <h3>Your wallet details</h3>
                <AccountData accountIndex="0" units="ether" precision="3" />
                
                <hr />
                <h3>EthBay balance</h3>
                {this.state.balance || 0} ether
                <br />
                Receiver Ether Address: <input type="text" name="receiver-address" onChange={this.onChangeWithdrawFunds} />
                Ether withdrawal amount: <input type="text" name="withdrawal-amount" onChange={this.onChangeWithdrawFunds}/>
                <button type="button" onClick={this.withdrawFunds}>Withdraw funds</button>
              </TabPanel>
              <TabPanel>
                {this.state.hasStoreAccount ? (
                  <div>
                    {this.state.storeData.approved ? (
                      <div>
                        <ActiveListings
                          allAssets={this.state.allAssets}
                        />
                        <hr />
                        <SoldListings
                          allAssets={this.state.allAssets}
                        />
                        <hr />
                        <CreateAsset 
                          onClick={this.createItem}
                        />
                      </div>
                    ) : (
                      <div>
                        <h3>Register</h3>
                        <p>Thank you for your application</p>
                        <p>Your application is pending approval</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <h3>Register</h3>
                    
                    <p>You do not have an account to sell. Please register to sell</p>
                    - store name 
                    {/* <ContractForm contract="Store" method="createStore" labels={['Enter your store name']} onClick={this.testSubmit} /> */}
                    - owner name/nickname <br />
                    <input type="text" name="storeName" onChange={this.storeNameUpdated} />
                    <button type="submit" onClick={this.sendApplication}>Register</button>
                  </div>
                )}
                
              </TabPanel>
              <TabPanel>
                <h2>My Items</h2>
                <p>List of assets bought - details of transaction etc for each</p>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </main>
    )
  }
}

Profile.contextTypes = {
  drizzle: PropTypes.object
};

export default Profile
