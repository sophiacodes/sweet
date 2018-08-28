import React from 'react';
import Notification from '../../core/notification/Notification'
import './registration-pending.css'

const RegistrationPending = ({...props}) => {
    return (
        <div className="registration-pending">
            <h3>Register</h3>
            {/* {Object.keys(props.registerStatus).length > 0 && (
                <div className={`alert-message ${(props.registerStatus.status || '').toLowerCase()}`}>
                    <p>{props.registerStatus.message}</p>
                </div>
            )} */}
            <Notification>
                <p>Thank you for your application</p>
                <p>Your application is pending approval</p>
            </Notification>
        </div>
    )
}

export default RegistrationPending;