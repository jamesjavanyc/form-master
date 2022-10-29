import { AuthContext } from 'context/authentication/auth-context'
import React, { useContext, useState } from 'react'
import "./user-bar.css"
import { Link, useNavigate } from 'react-router-dom';
import AccountEditWidget from 'component/edit-account/AccountEditWidget';
import axiosService from 'axios-config';

const UserBar = () => {

    const [display, setDisplay] = useState({
        showMenu: false,
        editAccount: false
    })

    const navigate = useNavigate()

    const { user, dispatch } = useContext(AuthContext)

    const showMenu = () => {
        setDisplay(display => ({ ...display, showMenu: true }))
    }
    const hideMenu = () => {
        setDisplay(display => ({ ...display, showMenu: false }))
    }

    const actionHandler = async (action) => {
        switch (action) {
            case "Account":
                setDisplay({ ...display, editAccount: true })
                return
            case "Logout":
                axiosService.post("api/auth/logout")
                dispatch({ type: "LOGOUT" });
                navigate("../login", { replace: true })
                return
            default:
                return
        }
    }

    const closeEditAccount = () => {
        setDisplay({ ...display, editAccount: false })
    }

    return (
        <>
            <div className='userBar' onMouseOver={showMenu} onMouseLeave={hideMenu}>
                <span className='userBarUsername'>{user.username}</span>
                <img className="headerIcon userIcon"
                    src={user.profileImage?user.profileImage:"./icons/user.png"} alt="user icon" />
                <ul className='userBarMenu' style={{ display: display.showMenu ? "block" : "none" }}
                    onClick={(e) => actionHandler(e.target.innerText)}>
                    <Link to="/dashboard" >
                        <li >
                            Dashboard
                        </li>
                    </Link>
                    <Link><li >
                        Account
                    </li></Link>
                    {user.authorization.indexOf("ADMIN") === -1 ? <></> :
                        <Link to="/admin" >
                            <li>
                                Admin
                            </li>
                        </Link>}
                    {user.authorization.indexOf("HUMAN_RESOURCE") === -1 ? <></> :
                        <Link to="/human-resource" >
                            <li>
                                Human Resource
                            </li>
                        </Link>}
                    <Link><li >
                        Logout
                    </li></Link>
                </ul>
            </div>
            {display.editAccount ? <AccountEditWidget closeWidget={closeEditAccount}></AccountEditWidget> : <></>}
        </>
    )
}

export default UserBar