import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./searchBar.css"

const SearchBar = () => {

    const [optionsAttri, setOptionsAttri] = useState({
        searchType: "form",
        searchContent: "",
        options: [],
    })

    const [display, setDisplay] = useState({
        inputSelectListener: null
    })

    const navigate = useNavigate()

    const setOptionAttribute = (attr) => {
        return (val) => {
            optionsAttri[attr] = val
            setOptionsAttri({ ...optionsAttri })
            console.log(optionsAttri.searchContent)
        }
    }

    const fetchOptions = (inputValue) => {
        console.log(11111)
        setOptionsAttri({ ...optionsAttri, searchContent: inputValue })
        console.log(optionsAttri)
        //TODO： axios 搜索数据
    }

    const enterKeyHandler = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            setOptionsAttri({ ...optionsAttri, options: [] })
            navigate(`../search?type=${optionsAttri.searchType}&content=${optionsAttri.searchContent}`)
        }
    }

    return (
        <div className='searchBar'>
            <form className='formSearchForm' action="" style={{
                marginTop: optionsAttri.options.length === 0 ? "0" : "24px",
            }}>
                <label htmlFor="formSearchIndex">
                    <input type="text" className='searchBarInputSelect'
                        // onCompositionEnd={e => fetchOptions(e.target.value)}
                        onChange={(e) => setOptionAttribute("searchContent")(e.target.value)}
                        onKeyDown={enterKeyHandler} />
                    <select onChange={(e) => setOptionAttribute("searchType")(e.target.value)}>
                        <option value="form" className='indexTypeOption'>
                            Form
                        </option>
                        <option value="index" className='indexTypeOption'>
                            Index
                        </option>
                    </select>
                </label>
                <div style={{ width: "100%", display: "flex" }}>
                    <div className='searchBarPlaceHolder'></div>
                    <ul className='searBarOptionList' style={{
                        display: optionsAttri.options.length === 0 ? "none" : "block",
                    }}>
                        {optionsAttri.options.map((option, key) => {
                            let style = { borderLeft: "1px solid gray", borderRight: "1px solid gray" }
                            if (optionsAttri.options.indexOf(option) === 0) {
                                style.borderTop = "1px solid gray"
                                style.marginTop = "-0.3rem"
                                style.paddingTop = "0.4rem"
                            }
                            if (optionsAttri.options.indexOf(option) === optionsAttri.options.length - 1) {
                                style.borderBottom = "1px solid gray"
                                style.paddingBottom = "1rem"
                            }
                            return (<li key={key} className='searchBarOption' style={style}>
                                TODO: 获取axios的表单信息并map到这里
                            </li>)
                        })}
                    </ul>
                </div>
            </form>
        </div>
    )
}

export default SearchBar