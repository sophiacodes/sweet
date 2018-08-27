import React from 'react';
import { AccountData } from 'drizzle-react-components'
import './profile-balance.css'

const ProfileBalance = ({...props}) => {
    return (
        <div className="profile-balance">
            <h3>Your wallet details</h3>
            {Object.keys(props.withdrawStatus).length > 0 && (
                <div className={`alert-message ${(props.withdrawStatus.status || '').toLowerCase()}`}>
                    <p>{props.withdrawStatus.message}</p>
                </div>
            )}
            <AccountData accountIndex="0" units="ether" precision="3" />
            <hr />
            <div className="withdraw-container">
            <h3>EthBay balance</h3>
                <p>{props.balance || 0} Ether</p>
                <button 
                    type="button" 
                    className="withdraw-button button"
                    onClick={props.withdrawBalance} 
                    disabled={props.disabled}>
                    Withdraw funds
                </button>
            </div>
        </div>
    )
}

export default ProfileBalance;