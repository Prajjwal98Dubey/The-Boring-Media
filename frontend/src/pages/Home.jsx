// import { useContext } from "react"
import { useContext, useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import DisplayPost from "./DisplayPost"
import LeftSideBar from "./LeftSideBar"
import RightSideBar from "./RightSideBar"
import { NavBarContext } from "../contexts/NavBarContext"
// import { NavBarContext } from "../contexts/NavBarContext"
const Home = () => {
  const { selectedPath, setSelectedPath } = useContext(NavBarContext)
  const [currPath] = useState(document.URL.split('/'))
  useEffect(() => {
    const updateContext = () => {
      let updatedSelectedPath = {}
      for (let key in selectedPath) {
        updatedSelectedPath[key] = false
      }
      updatedSelectedPath["/" + currPath[currPath.length - 1]] = true
      setSelectedPath(updatedSelectedPath)
    }

    updateContext()
  }, [])
  return (
    <>
      <Navbar />
      <div className="w-[100%] h-[83vh] flex">
        <LeftSideBar />
        <DisplayPost />
        <RightSideBar />
      </div>
    </>
  )
}

export default Home
