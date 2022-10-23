import React from 'react'
import PropTypes from 'prop-types';

const CallBackSelect = (props) => {
    const { name, options, classForSelect, style, selectTagStyle } = props

    const getStyle = () => {
        if (style) {
            return style
        } else {
            return {
                display: "flex",
                alignItems: "center",
                height: "2rem",
                textAlign: "center",
                padding: 0,
            }
        }
    }

    const getSelectTagStyle = ()=>{
        if(selectTagStyle){
            return selectTagStyle
        }else{
            return {
                width:"300px",
                maxWidth:"100%",
                height:"1.5rem",
                textAlign:"center"
            }
        }
    }


    return (
        <label className={classForSelect} style={getStyle()}>
            <span>{name()}&nbsp; </span>
            <select style={getSelectTagStyle()}>
                {options.map((option, id)=>{
                    return (
                        <option key={id}>
                            {option}
                        </option>
                    )
                })}
            </select>
        </label>
    )
}

CallBackSelect.propTypes = {
    name: PropTypes.func.isRequired,
    classForSelect: PropTypes.string,
    callBack: PropTypes.func,
    paramAsCallBack: PropTypes.func,
    options: PropTypes.array.isRequired,
}

export default CallBackSelect