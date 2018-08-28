import React from 'react';
import './registration.css'

const Registration = ({...props}) => {
    return (
        <div className="registration">
            <h3>Register</h3>
            {/* {Object.keys(props.registerStatus).length > 0 && (
                <div className={`alert-message ${(props.registerStatus.status || '').toLowerCase()}`}>
                    <p>{props.registerStatus.message}</p>
                </div>
            )} */}
            <p>You do not have an account to sell, please register</p>
            <label htmlFor="storeName"> Enter a store name: </label>
            <input 
                type="text" 
                name="storeName" 
                className="store-name-field"
                onChange={props.storeNameUpdated} 
                maxLength="100"
            />
            <button 
                type="submit"
                className="button medium-button" 
                onClick={props.createStore} 
                disabled={props.disabled}
            >
                Register
            </button>
        </div>
    )
}

export default Registration;