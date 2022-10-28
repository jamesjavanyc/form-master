import axios from 'axios'
import axiosService from 'axios-config'
import { AuthContext } from 'context/authentication/auth-context'
import React, { useContext, useState } from 'react'
import "./login.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const{ dispatch} = useContext(AuthContext)

    const navigate  = useNavigate()

    const [userInfo, setUserInfo] = useState({
        username: localStorage.getItem("username")?localStorage.getItem("username"):"",
        password: ""
    })

    const guestHandler = (e) => {
        e.preventDefault()
        navigate("../guest",{replace:true})
    }

    const loginHandler = async(e) => {
        e.preventDefault()
        let res = await axiosService.post("api/auth/login", {
            username:userInfo.username,
            password:userInfo.password
        })
        localStorage.setItem("username", userInfo.username)
        dispatch({type:"LOGIN_SUCCESS",payload:res.data});
        navigate("/")
    }

    const changeInput = (attri) => {
        return (value) => {
            userInfo[attri] = value
            setUserInfo(userInfo => ({ ...userInfo }))
        }
    }

    return (
        <div className='loginPage'>
            <div className='loginPageWidget'>
                <form>
                    <fieldset>
                        <legend>Login</legend>
                        <input className='loginField' type="text" placeholder='Username' value={userInfo.username} onChange={e => { changeInput("username")(e.target.value) }} />
                        <input className='loginField' type="password" placeholder='Password' onChange={e => { changeInput("password")(e.target.value) }} />
                        <div className='loginBtnBox'>
                            {/* <label className="loginRememberMe">
                                <span>Remember me</span>
                                <input type="checkbox" defaultChecked />
                            </label> */}
                            <input className='loginBtn' type="submit" value="Login" onClick={loginHandler} />
                            <input className='loginBtn' type="submit" value="I'm a guest" onClick={guestHandler} />
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default Login