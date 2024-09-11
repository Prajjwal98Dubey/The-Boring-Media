import { useState } from "react"
import ChatContext from "./ChatContext"

// eslint-disable-next-line react/prop-types
const ChatContextProvider = ({children})=>{
    const [chatContexts,setChatContexts] = useState([])
    return (
        <ChatContext.Provider value={{chatContexts,setChatContexts}}>
            {children}
        </ChatContext.Provider>
    )
}


export default ChatContextProvider