import {createContext, useEffect, useReducer} from "react"
import {SingleFormReducer} from "./SingleFormReducer"

const INITIAL_STATE= {
    action:"CREATE"
}

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(SingleFormReducer,INITIAL_STATE);
    useEffect(()=>{
        localStorage.setItem(("user"),JSON.stringify(state.user))
    },[state.user])

    return (
        <Context.Provider
            value = {{
                action:state.action
            }}>
            {children}
        </Context.Provider>
    )
}