import React from 'react'
import "./searchBar.css"
import AsyncSelect from 'react-select/async';

const SearchBar = () => {

    const promiseOptions = (inputValue) => {
        // axios 搜索数据
    }

    const style = {
        control: base => ({
            ...base,
            margin:0,
            border:0,
            borderRadius:"0",
            borderBottom:"1px solid black",
            boxShadow: "none",
            '&:hover': {
                border:0,
                borderBottom: '1px solid black',
            }
        })
    };

    return (
        <div className='searchBar'>
            <form className='formSearchForm' action="" >
                <label htmlFor="formSearchIndex">
                    <select>
                        <option value="form">Form</option>
                    </select>
                    <AsyncSelect className='searchBarInputSelect' styles={style}  cacheOptions defaultOptions loadOptions={promiseOptions} />
                </label>
            </form>
        </div>
    )
}

export default SearchBar