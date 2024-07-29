/* eslint-disable react/prop-types */
import { useState } from "react"
import { MyPostContext } from "./MyPostContext"


const MyPostContextProvider = ({children})=>{
    const[postFromContext,setPostFromContext] = useState([])
    return (
        <MyPostContext.Provider value={{postFromContext,setPostFromContext}}>
                {children}
        </MyPostContext.Provider>
    )
}

export default MyPostContextProvider