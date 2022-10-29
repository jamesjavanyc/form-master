import CategoryNav from 'component/category-nav/CategoryNav';
import Header from 'component/header/Header'
import React, { useEffect } from 'react'

const Search = (props) => {

    const getUrlParam = (name) => {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        };
        return null;
    }


    return (
        <div className='page'>
            <Header></Header>
            <CategoryNav></CategoryNav>
        </div>
    )
}

export default Search