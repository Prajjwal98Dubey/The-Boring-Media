/* eslint-disable react/prop-types */
import { useState } from "react"
import { NavBarContext } from "./NavBarContext"

const NavBarContextProvider = ({ children }) => {
    const [selectedPath, setSelectedPath] = useState({ '/': true, '/bookmark': false, '/download': false, '/store': false })
    return (
        <NavBarContext.Provider value={{ selectedPath, setSelectedPath }}>
            {children}
        </NavBarContext.Provider>
    )
}

export default NavBarContextProvider