import React from 'react'
import "./user-bar.css"

const UserBar = () => {
    return (
        <div className='userBar'>
            <span className='userBarWelcome'>Username</span>
            <img className="headerIcon" src="./icons/user.png" alt="user icon"/>
        </div>
    )
}

export default UserBar