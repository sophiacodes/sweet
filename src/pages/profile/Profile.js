import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import RegistrationPending from '../../components/user/registration-pending/RegistrationPending'
import Registration from '../../../src/components/user/registration/Registration'
import CreateAsset from '../../components/marketplace/create-asset/CreateAsset'
import ActiveListings from '../../components/marketplace/active-listings/Active-Listings'
import SoldListings from '../../components/marketplace/sold-listings/Sold-Listings'
import ProfileBalance from '../../components/user/profile-balance/ProfileBalance'

class Profile extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
    this.state = {
      hasStoreAccount: null,
      allAssets: [],
      inProgress: this.props.utilState.callInProgress,
      createAssetStatus: {},
      withdrawStatus:{},
      registerStatus: {}
    };
    this.account = {from: this.props.accounts[0]};
  }

  componentDidMount() {
    this.checkAdminRights();
    this.getSeller();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      storeData: nextProps.profileState.sellerStore.storeData,
      hasStoreAccount: nextProps.profileState.accountStatus,
      allAssets: nextProps.profileState.allAssets,
      inProgress: nextProps.utilState.callInProgress
    });
  }

  checkAdminRights = async () => {
    const admin = await this.contracts.Marketplace.methods.admin().call(this.account);
    if (admin && admin === this.props.accounts[0]) {
      this.props.router.push('/admin');
    }
  }

  createStore = async (e) => {
    e.preventDefault();
    this.setState({
      disableRegistration: true,
      registerStatus: {
        status: 'PENDING',
        message: 'Please confirm the transaction in MetaMask'
      }
    })
    await this.contracts.Marketplace.methods.createStore(this.state.storeName).send(this.account)
      .then((data) => {
          this.props.callInProgress(true);
          // HasAccount set to true, update store
          this.props.hasAccount(true);
          this.setState({
            disableRegistration: true,
            registerStatus: {
              status: 'SUCCESS',
              message: 'Registration successful'
            }
          })
      })
      .catch((error) => {
          this.props.hasAccount(false);
          this.setState({
            disableRegistration: false,
            registerStatus: {
              status: 'ERROR',
              message: error.message
            }
          })
      });
      this.props.callInProgress(false);
  }

  createAsset = async (e) => {
    this.setState({
      disableCreateAsset: true,
      createAssetStatus: {}
    })
    const { assetName, assetDescription, assetPrice, assetAddress } = e;
    const toWeiAssetPriceConversion = (parseFloat(assetPrice)) * 1000000000000000000;
    await this.contracts.Marketplace.methods.createAsset(assetName, assetAddress, assetDescription, toWeiAssetPriceConversion).send()
    .then((data) => {
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
      this.setState({
        disableCreateAsset: false,
        createAssetStatus: {
          status: 'SUCCESS',
          message: 'Item created successfully!'
        }
      })
    })
    .catch((error) => {
      // return error;
      this.setState({
        disableCreateAsset: false,
        createAssetStatus: {
          status: 'ERROR',
          message: error.message
        }
      })
    });
  }

  getStoreBalance = async () => {
    if (this.state.hasStoreAccount) {
      await this.contracts.Marketplace.methods.getSellerBalance().call()
        .then((result) => {
          const toEtherConversion = (parseFloat(result)) / 1000000000000000000;
          this.setState({
            balance: toEtherConversion || 0,
            disabled: !(toEtherConversion > 0)
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

  storeNameUpdated = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  getAssets = async () => {
    const assetCount = await this.contracts.Marketplace.methods.assetIdCounter().call();
    let allAssets = [];
    for (let i = 0; i < assetCount; i++) {
      const data = await this.contracts.Marketplace.methods.asset(i).call();
      if (data.storeOwner === this.props.accounts[0]) {
        const toEtherConversion = data.price / 1000000000000000000;
        const asset = {
          storeOwner: data.storeOwner,
          name: data.name,
          description: data.description,
          price: parseFloat(toEtherConversion).toFixed(3),
          assetId: data.assetId,
          buyer: data.buyer,
          sold: data.sold
        };
        allAssets = [ ...allAssets, asset ];
      }
    }
    this.props.createAsset(allAssets);
  }

  withdrawFunds = async () => {
    this.setState({
      disabled: true,
      withdrawStatus: {
        status: 'PENDING',
        message: 'Withdraw in progress...please confirm the transaction in MetaMask'
      }
    })
    const sendParams = {
      gas: 3000000
    };
    await this.contracts.Marketplace.methods.withdrawBalance().send(sendParams)
    .then((receipt) => {
      this.setState({
        balance: 0,
        disabled: true,
        withdrawStatus: {
          status: 'SUCCESS',
          message: 'Withdraw successful!'
        }
      })
      return receipt;
    })
    .catch((error) => {
      this.setState({
        disabled: false,
        withdrawStatus: {
          status: 'ERROR',
          message: error.message
        }
      })
      return error;
    });
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
                <Tab><h2>Active Assets</h2></Tab>
                <Tab><h2>Sold Assets</h2></Tab>
                <Tab><h2>Bought Assets</h2></Tab>
              </TabList>

              <TabPanel>
                <ProfileBalance
                  withdrawBalance={this.withdrawFunds}
                  balance={this.state.balance}
                  disabled={this.state.disabled}
                  withdrawStatus={this.state.withdrawStatus}
                />
              </TabPanel>
              <TabPanel>
                {this.state.hasStoreAccount ? (
                  <div>
                    {this.state.storeData.approved ? (
                      <div>
                        <CreateAsset 
                          disabled={this.state.disableCreateAsset}
                          onClick={this.createAsset}
                          createAssetStatus={this.state.createAssetStatus}
                        />
                      </div>
                    ) : (
                      <RegistrationPending />
                    )}
                  </div>
                ) : (
                  <Registration
                    disabled={this.state.disableRegistration}
                    createStore={this.createStore}
                    storeNameUpdated={this.storeNameUpdated}
                    registerStatus={this.state.registerStatus}
                  />
                )}    
              </TabPanel>
              <TabPanel>
                <ActiveListings
                  allAssets={this.state.allAssets}
                />
              </TabPanel>
              <TabPanel>
                <SoldListings
                  allAssets={this.state.allAssets}
                />
              </TabPanel>
              <TabPanel>
                <h2>TODO</h2>
                {/* <p>List of assets bought by the address with details of transaction etc</p> */}
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
