import React, { useState,  useEffect } from 'react'
import PropTypes from 'prop-types';

const CallBackButton = React.memo((props) => {
    const {name, callBack, paramAsCallBack, classForButton, clickNotice} = props

    const [state, setState] = useState({click:false})

    const clickAction =(e)=>{
        e.preventDefault();
        setState({click:!state.click})
        if(clickNotice){
            if(!state.click){
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
})

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