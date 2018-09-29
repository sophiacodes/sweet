import React, { Component } from 'react'
import { Link } from 'react-router'
import Notification from '../../common/notification/Notification'
import './marketplace-approvals.css'

const Approved = (props) => {
  const approvedDisplay = (typeof props.approved !== 'undefined' && props.approved.length === 0) 
    ? <Notification>
        <p>There are stores awaiting approval</p>
      </Notification> 
    : (props.approved).map((item, i) => {
      return (
        <tr key={`approval-row-${i}`}>
          <td>{item.storeId}</td>
          <td>{item.name}</td>
          <td>Approved</td>
          <td>{item.timestamp}</td>
          <td className="view-store">
            <Link className="store-link" to={`/store/${item.owner}`}>View store <span className="chevron">&gt;</span></Link>
          </td>
        </tr>
      )
    })
  return (
    <div>
      {props.approved.length === 0 ? (
        <div>{approvedDisplay}</div>
      ) : (
        <table className="approved-stores">
          <thead>
            <tr>
              <th>ID</th>
              <th>Store Name</th>
              <th>Status</th>
              <th>Seller Since</th>
              <th></th>
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
          <td>{item.timestamp}</td>
          <td className="approve">
            <input 
              type="button" 
              className="button small-button" 
              onClick={(e) => props.approveStore(item, e)} 
              value="Approve"
              disabled={props.disableApproval}
            />
          </td>
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
              <th></th>
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
    this.storeStatues(nextProps.allStores)
  }

  storeStatues = (allStores) => {
    let approved = [];
    let pendingApproval = [];

    if (typeof allStores !== 'undefined') {
      for (const store of allStores) {
        if (store.approved) {
          approved = [...approved, store];
        } else {
          pendingApproval = [...pendingApproval, store]
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
        {Object.keys(this.props.approvalStatus).length > 0 && (
          <div className={`alert-message ${(this.props.approvalStatus.status || '').toLowerCase()}`}>
            <p>{this.props.approvalStatus.message}</p>
          </div>
        )}
        <PendingApproval 
          pendingApproval={this.state.pendingApproval}
          approveStore={this.approveStore}
          disableApproval={this.props.disableApproval}
        />
        <hr />
        <h3>Approved</h3>
        <Approved 
          approved={this.state.approved}
        />
      </div>
    )
  }
}

export default MarketplaceApprovals
