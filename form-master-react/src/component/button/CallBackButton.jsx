import React, { useState } from 'react'
import PropTypes from 'prop-types';

const CallBackButton = React.memo((props) => {
    const {name, callBack, paramAsCallBack, classForButton, clickNotice,style} = props

    const [state, setState] = useState({click:false, style:undefined})

    const getStyle = ()=>{
        if(state.style){
            return state.style
        }else if(style){
            state.style = style
            return style
        }else{
            let defaultStyle =  {
                fontSize:"1rem",
                padding:"2px 4px"
            }
            state.style = defaultStyle
            return defaultStyle
        }
    }

    const clickAction =(e)=>{
        e.preventDefault();
        if(clickNotice){
            if(!state.click){
                setState(state =>( {...state, 
                    click:!state.click, 
                    style:{...state.style, backgroundColor:"#3A3535", color: "white",border:"1px solid rgb(118,118,118)"}
                }))
            }else{
                setState(state =>( {...state, 
                    click:!state.click, 
                    style:{...state.style, backgroundColor:"rgb(239,239,239)", color: "black",border:"1px solid rgb(118,118,118)"}
                }))
            }
        }
        if(callBack){
            let param = paramAsCallBack()
            callBack(param)
        }
    }

    return (
        <button className={classForButton} onClick={clickAction} style={getStyle()}>{name()}</button>
    )
})

CallBackButton.defaultProps={
    clickNotice:true,
    paramAsCallBack:()=>{return null}
}

CallBackButton.propTypes = {
    name: PropTypes.func.isRequired,
    classForButton: PropTypes.string,
    clickNotice:PropTypes.bool,
    callBack:PropTypes.func,
    paramAsCallBack:PropTypes.func,
    style:PropTypes.object,
}

export default CallBackButton