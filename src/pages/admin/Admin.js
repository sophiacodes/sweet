import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Notification from '../../../src/components/core/notification/Notification'
import MarketplaceApprovals from '../../../src/components/marketplace/marketplace-approvals/Marketplace-Approvals';

class Admin extends Component {

  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
    this.state = {
      allStores: [],
      approvalStatus: {}
    }
  }

  componentWillMount() {
    this.props.messageStatus({})
    this.props.fetchAllStores(this.contracts)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allStores: nextProps.allStores || [],
      approvalStatus: nextProps.message || {},
      disableApproval: (nextProps.status === 'SUCCESS') || false
    })
    if (nextProps.allStores !== undefined && this.state.storeToApprove !== undefined) {
      for (const value of nextProps.allStores) {
        if ((value.owner === this.state.storeToApprove.owner) && !value.approved) {
          this.props.fetchAllStores(this.contracts)
          // TODO: Need to handle the updating of the button while fetching
        }
      }
    }
  }

  approveApplication = (storeDetails) => {
    this.setState({
      disableApproval: true,
      storeToApprove: storeDetails
    })
    const { owner } = storeDetails
    const { Marketplace } = this.contracts
    this.props.approveStore( { owner, Marketplace } )
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h2 className="page-title">Admin</h2>
            {(typeof this.state.allStores !== 'undefined' && this.state.allStores.length === 0) ? (
              <Notification>
                <p><strong>No stores available</strong></p>
                <p>(When stores are created they will appear here for approval)</p>
              </Notification>
            ) : (
              <div>
                <MarketplaceApprovals
                  approveApplication={this.approveApplication} 
                  allStores={this.state.allStores}
                  disableApproval={this.state.disableApproval}
                  approvalStatus={this.state.approvalStatus}
                />
              </div>
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
