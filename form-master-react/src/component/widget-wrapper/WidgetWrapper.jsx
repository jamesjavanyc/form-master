import React from 'react'

const WidgetWrapper = (props) => {
    const {wrapperStyle, children} = props

    const getStyle = ()=>{
        if(wrapperStyle){
            return {
                height:"100vh",
                width:"100vw",
                position:"fixed",
                backgroundColor:"rgba(0,0,0,0.8)",
                left:0,
                bottom:0,
                ...wrapperStyle
            }
        }else{
            return{
                height:"100vh",
                width:"100vw",
                position:"fixed",
                backgroundColor:"rgba(0,0,0,0.8)",
                left:0,
                bottom:0
            }
        }
    }
    return (
        <div style={getStyle()}>
            {children}
        </div>
    )
}

export default WidgetWrapper