import { AuthContext } from 'context/authentication/auth-context'
import React, { useContext, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthWrapper = (children) => {

    const {user} = useContext(AuthContext)

    const navigation = useNavigate()

    useLayoutEffect(() => {
        console.log(children)
        if(!user){
            navigation("/login")
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default AuthWrapper