import WidgetWrapper from 'component/widget-wrapper/WidgetWrapper'
import { AuthContext } from 'context/authentication/auth-context'
import React, { useContext, useState } from 'react'
import "./edit-account.css"

const AccountEditWidget = (props) => {

    const [data, setData] = useState({
        password: "",
        newPassword: "",
        confirmNewPassword: "",
        profileImg:null,
        message: ""
    })

    const { closeWidget } = props

    const { user } = useContext(AuthContext)

    const handleUpdate = (e) => {
        e.preventDefault()
        //todo: 更新个人信息
    }

    const updateData = (attri)=>{
        return (e)=>{
            data[attri] = e.target.value
            setData({...data})
            console.log(data)
        }
    }

    const updateFile = (attri)=>{
        return (e)=>{
            data[attri] = e.target.files[0]
            setData({...data})
        }
    }

    return (
        <WidgetWrapper>
            {data.message === "" ?
                <div className='accountEditWidget' style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div>
                        <h2>{user.username}</h2>
                    </div>
                    <div>
                        <h3>Set password</h3>
                        <div>
                            <span>Password:</span><input type="password" value={data.password}
                                onChange={updateData("password")}/>
                        </div>
                        <div>
                            <span>New password:</span><input type="password" value={data.newPassword}
                                onChange={updateData("newPassword")}/>
                        </div>
                        <div>
                            <span>Confirm password:</span><input type="password" value={data.confirmNewPassword}
                                onChange={updateData("confirmNewPassword")}/>
                        </div>
                    </div>
                    <div>
                        <h3>Upload profile picture:</h3>
                        <input style={{ marginLeft: "90px", marginTop: "18px" }} type="file" onChange={updateFile("profileImg")}></input>
                    </div>

                    {/* 控制按钮 */}
                    <div style={{
                        flexDirection: "row",
                        padding: "2rem",
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "300px",
                        margin: "0 auto",
                        gap: "2rem"
                    }}>
                        <button className='editAccountBtn' onClick={handleUpdate}>Update</button>
                        <button className='editAccountBtn' onClick={(e) => {
                            e.preventDefault()
                            closeWidget()
                        }}>Cancel</button>
                    </div>
                </div> :
                <div className='accontUpdateError'>
                    <div className='errorMsgCtner'>
                        <p>
                        {data.message}
                        </p>
                        <button style={{margin:"0 auto", padding:"0.5rem 1rem"}}
                            onClick={(e)=>{
                                e.preventDefault()
                                setData({...data, message:""})
                            }}>Confirm</button>
                    </div>
                </div>
            }
        </WidgetWrapper>
    )
}

export default AccountEditWidget