import React, { useState } from 'react'
import "./searchBar.css"

const SearchBar = () => {

    const [optionsAttri, setOptionsAttri] = useState({
        options: [1,2,3,4,5],
    })

    const [display, setDisplay] = useState({
        inputSelectListener: null
    })

    const fetchOptions = (inputValue) => {
        //TODO： axios 搜索数据
    }

    const inputFocus = (e) => {
        let listener = e.target.addEventListener('keydown', () => {
            //TODO： 进入搜索结果页面
        })
        setDisplay({ ...display, inputSelectListener: listener })
    }

    const inputBlur = (e) => {
        e.target.removeEventListener('keydown', display.inputSelectListener)
    }

    return (
        <div className='searchBar'>
            <form className='formSearchForm' action="" style={{
                marginTop: optionsAttri.options.length === 0 ? "0" : "24px",
            }}>
                <label htmlFor="formSearchIndex">
                    <input type="text" className='searchBarInputSelect'
                        onCompositionEnd={e => fetchOptions(e.target.value)}
                        onFocus={inputFocus}
                        onBlur={inputBlur} />
                    <select>
                        <option value="form" className='indexTypeOption'>
                            Form
                        </option>
                        <option value="customer" className='indexTypeOption'>
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