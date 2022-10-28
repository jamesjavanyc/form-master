import Nav from 'component/nav/Nav'
import SearchBar from 'component/search-bar/SearchBar'
import UserBar from 'component/user-bar/UserBar'
import React from 'react'
import "./header.css"

const Header = () => {
    return (
        <header>
            <img id="logo" src="./logo.png" alt="logo" onClick={()=>{
                window.location.href=""
            }} />
            <p className='sloganBar'>Mastery your forms.</p>
            <SearchBar></SearchBar>
            <UserBar></UserBar>
            <Nav></Nav>
        </header>
    )
}

export default Header