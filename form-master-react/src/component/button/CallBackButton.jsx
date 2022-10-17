import React, { useState } from 'react'
import PropTypes from 'prop-types';

const CallBackButton = (props) => {
    const {name, callBack, paramAsCallBack, classForButton, clickNotice} = props

    const [click, setClick] = useState(false)

    const clickAction =(e)=>{
        e.preventDefault();
        setClick(!click)
        if(clickNotice){
            if(!click){
                e.target.style.backgroundColor = "red"
            }else{
                e.target.style.backgroundColor = "white"
            }
        }
        if(callBack){
            let param = paramAsCallBack()
            callBack(param)
        }
    }

    return (
        <button className={classForButton} onClick={clickAction}>{name}</button>
    )
}

CallBackButton.defaultProps={
    clickNotice:true,
    paramAsCallBack:()=>{return null}
}

CallBackButton.propTypes = {
    name: PropTypes.string.isRequired,
    classForButton: PropTypes.string,
    clickNotice:PropTypes.bool,
    callBack:PropTypes.func,
    paramAsCallBack:PropTypes.func,
}

export default CallBackButton