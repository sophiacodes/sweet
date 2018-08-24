import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Notification from '../../../src/components/core/layouts/notification/Notification'
import MarketplaceApprovals from '../../../src/components/marketplace/layouts/marketplace-approvals/Marketplace-Approvals';

class Admin extends Component {
  constructor(props, context, { authData }) {
    super(props)
    authData = this.props
    this.contracts = context.drizzle.contracts;
    this.state = {
      storeArr: []
    }
    // this.test = context.TESTREDUCER
    // IMPORTANT: Check if admin.. if not redirect to /profile
  }
// *** DETECT CHANGE WHEN WALLET ADDRESS CHANGES ***
  componentWillMount() {
    // console.log('TESTREDUCER', this.test)
    this.checkAdminRights();
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps - nextProps', nextProps)
    this.setState({
      storeArr: nextProps.marketplaceState.allStores
    });
  }
  checkAdminRights = async () => {
    const admin = await this.contracts.Marketplace.methods.admin().call();
    console.log('called admin again...', admin);
    if (admin && admin !== this.props.accounts[0]) {
      console.log('is admin, go to /admin page')
      this.props.router.push('/profile');
    } else {
      // Get all stores for approval
      this.getAllStores();
    }
  }

  getAllStores = async () => {console.log(this.contracts)
    const getStores = await this.contracts.Marketplace.methods.getAllStores().call();


    console.log('** all stores...', getStores);
    let allStores = [];
    for (let i = 0; i < getStores.length; i++) {
      const data = await this.contracts.Marketplace.methods.store(getStores[i]).call();
      const store = {
        approved: data.approved,
        balance: data.balance,
        name: data.name,
        owner: data.owner,
        storeId: data.storeId
      };
      allStores = [ ...allStores, store ];
    }

    console.log('storeArr', allStores);
    this.props.getStores(allStores);
    // if (admin && admin !== this.props.accounts[0]) {
    //   console.log('is admin, go to /admin page')
    //   this.props.router.push('/profile');
    // }
  }

  approveApplication = async (storeDetails) => {
    /*
    // JUST AN EXAMPLE
    let payload = {
      name: "my layout",
      pictures: 12,
      medium: { charcoal: "yes", paper: "60LBS" }
    };
    // Dispatch the saga action to add a new layout!
    // dispatch({type: "LAYOUT_ADD"}, payload);
    this.props.approve(payload); 
    */
    const approvedStatus = await this.contracts.Marketplace.methods.approveApplication(storeDetails[1]).send().then((data) => {
        console.log('approvedStatus', data);
        this.getAllStores();
        return data;
      })
      .catch((error) => {
        return error;
      });
  }
  // checkAdminRights = async () => {
  //   const admin = await this.contracts.Admin.methods.admin().call().then((data) => {
  //     console.log('call admin addr', data);
  //     return data;
  //   })
  //   .catch((error) => {
  //     return error;
  //   });
  //   console.log( this.props.accounts[0])
  //   if (admin && admin !== this.props.accounts[0]) {
  //     this.props.router.push('/profile');
  //   } else {
  //     // Get number of stores
  //     const numOfStores = await this.contracts.Store.methods.storeIdCounter().call().then((data) => {
  //       console.log('numOfStores', data);
  //       return data;
  //     })
  //     .catch((error) => {
  //       return error;
  //     });
  //     console.log('numOfStores', numOfStores)
  //     // Get applications for approvel
  //   }
  // }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h2 className="page-title">Admin</h2>
            {this.state.storeArr.length === 0 ? (
              <Notification>
                <p><strong>No stores available</strong></p>
                <p>(When stores are created they will appear here for approval)</p>
              </Notification>
            ) : (
              <MarketplaceApprovals
                approveApplication={this.approveApplication} 
                allStores={this.state.storeArr}
              />
            )}
          </div>
        </div>
      </main>
    )
  }
}

Admin.contextTypes = {
  drizzle: PropTypes.object
};

export default Admin
