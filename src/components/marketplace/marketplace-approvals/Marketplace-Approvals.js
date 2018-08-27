import React, { Component } from 'react'
import Notification from '../../core/notification/Notification'
import './marketplace-approvals.css'

const Approved = (props) => {
  const approvedDisplay = (typeof props.approved !== 'undefined' && props.approved.length === 0) 
    ? <Notification>
        <p>No stores approved</p>
      </Notification> 
    : (props.approved).map((item, i) => {
      return (
        <tr key={`approval-row-${i}`}>
          <td>{item.storeId}</td>
          <td>{item.name}</td>
          <td>Approved</td>
          <td>[Date/time]</td>
          <td>[view store Button]</td>
        </tr>
      )
    })
  return (
    <div>
      {props.approved.length === 0 ? (
        <div>{approvedDisplay}</div>
      ) : (
        <table className="">
          <thead>
            <tr>
              <th>ID</th>
              <th>Store Name</th>
              <th>Status</th>
              <th>Seller Since</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
          {approvedDisplay}
          </tbody>
        </table>
      )}
    </div>
  )
};

const PendingApproval = (props) => {
  const pendingApprovalDisplay = (props.pendingApproval.length === 0) 
    ? <Notification>
        <p>No stores pending approval</p>
      </Notification> 
    : (props.pendingApproval).map((item, i) => {
      return (
        <tr key={`pending-approval-row-${i}`}>
          <td>{item.storeId}</td>
          <td>{item.name}</td>
          <td>Awaiting approval</td>
          <td>[Date/time]</td>
          <td><input type="button" onClick={(e) => props.approveStore(item, e)} value="Approve" /></td>
        </tr>
      )
    })
  return (
    <div>
      {props.pendingApproval.length === 0 ? (
        <div>{pendingApprovalDisplay}</div>
      ) : (
        <table className="">
          <thead>
            <tr>
              <th>ID</th>
              <th>Store Name</th>
              <th>Status</th>
              <th>Seller Since</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
          {pendingApprovalDisplay}
          </tbody>
        </table>
      )}
    </div>
  )
};

class MarketplaceApprovals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      approved: [],
      pendingApproval: []
    }
  }
  componentWillMount() {
    this.storeStatues(this.props.allStores)
  }
  componentWillReceiveProps(nextProps) {
    console.log(' MARKET APPROVEAL nextProps', nextProps)
    this.storeStatues(nextProps.allStores)
  }
  storeStatues = (allStores) => {
    let approved = [];
    let pendingApproval = [];

    if (typeof allStores !== 'undefined') {
      for (let i = 0; i < allStores.length; i++) {
        if (allStores[i].approved) {
          approved = [...approved, allStores[i]];
        } else {
          pendingApproval = [...pendingApproval, allStores[i]]
        }
      }
    }

    this.setState({
      approved,
      pendingApproval
    });
  }
  approveStore = (storeDetails) => {
    this.props.approveApplication(storeDetails);
  }
  render() {
    return(
      <div className="marketplace-approvals">
        <h3>Awaiting approval</h3>
        <PendingApproval 
          pendingApproval={this.state.pendingApproval}
          approveStore={this.approveStore}
        />
        <h3>Approved</h3>
        <Approved 
          approved={this.state.approved}
        />
      </div>
    )
  }
}

export default MarketplaceApprovals
