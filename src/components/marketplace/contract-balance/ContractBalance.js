import React from 'react';
import './contract-balance.css';

const ContractBalance = ({...props}) => {
    // To Ether from Wei conversion
    const contractBalance = (parseFloat(props.balance)) / 1000000000000000000;
    return (
        <div>
            <p>Contract balance</p>
            &Xi; {contractBalance}
        </div>
    )
}

export default ContractBalance;