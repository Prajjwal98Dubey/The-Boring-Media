import { useContext, useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { NavBarContext } from "../contexts/NavBarContext"
const Download = () => {
    const {selectedPath,setSelectedPath} = useContext(NavBarContext)
    const[currPath] = useState(document.URL.split('/'))
    useEffect(()=>{
        const updateContext = ()=>{
            let updatedSelectedPath = {}
            for(let key in selectedPath){
                updatedSelectedPath[key] = false
            }
            updatedSelectedPath["/"+currPath[currPath.length-1]] = true
            setSelectedPath(updatedSelectedPath)
        }

        updateContext()
    },[])
  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center text-white font-bold text-2xl">
      Download
    </div>
    </>
  )
}

export default Download
