import { AuthContext } from 'context/authentication/auth-context'
import React, { useContext, useEffect } from 'react'

const Home = () => {
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (!user) {
            window.location.replace("login")
        }else{
            window.location.replace("dashboard")
        }
    }, [])


    return (
        <></>
    )
}

export default Home