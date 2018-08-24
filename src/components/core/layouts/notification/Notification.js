import React from 'react'
import './notification.css'

const Notification = ({...props}) => {
    return (
        <div className="notification">
          {props.children}
        </div>
    )
}

export default Notification;