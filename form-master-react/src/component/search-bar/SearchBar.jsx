import React from 'react'
import "./searchBar.css"

const SearchBar = () => {
    return (
        <div className='searchBar'>
            <form className='formSearchForm' action="" >
                <label htmlFor="formSearchIndex">
                    <img className="headerIcon" src="./icons/search.png" alt="search icon"/>
                    <select>
                        <option value="form">Form</option>
                    </select>
                    <input type="text" id="formSearchIndex" placeholder='Find anything you want by index...'/>
                </label>
            </form>
        </div>
    )
}

export default SearchBar