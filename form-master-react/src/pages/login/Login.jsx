import React, { useState } from 'react'
import "./login.css"

const Login = (props) => {

    const [action, setAction] = useState("Login")

    const handleUpdate = (e) => {
        e.preventDefault()
        setAction(action => ("Update"))
    }

    const getComponent = () => {
        switch (action) {
            case "Login":
                return (
                    <div className='loginPage'>
                        <div className='loginPageWidget'>
                            <form>
                                <fieldset>
                                    <legend>Login</legend>
                                    <input className='loginField' type="text" placeholder='Username' />
                                    <input className='loginField' type="password" placeholder='Password' />
                                    <div className='loginBtnBox'>
                                        <label className="loginRememberMe">
                                            <span>Remember me</span>
                                            <input type="checkbox" defaultChecked />
                                        </label>
                                        <input className='loginBtn' type="submit" value="Login" />
                                        <input className='loginBtn' type="submit" value="Update" />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                )
            case "Update":
                return (
                    <div className='loginPage'>
                        <div className='loginPageWidget'>
                            <form>
                                <fieldset>
                                    <legend>Login</legend>
                                    <input className='loginField' type="text" placeholder='Username' />
                                    <input className='loginField' type="password" placeholder='Password' />
                                    <div className='loginBtnBox'>
                                        <input className='loginBtn' type="submit" value="Login" />
                                        <input className='loginBtn' type="submit" value="Register" />
                                        <a href='null' className='loginForgetPassword' onClick={handleUpdate}>Forget password?</a>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                )
            default:
                throw new Error("Not a supported Login action(Login page)")
        }
    }

    return (
        getComponent()
    )
}

export default Login