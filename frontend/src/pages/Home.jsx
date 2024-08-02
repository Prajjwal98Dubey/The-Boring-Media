import Navbar from "../components/Navbar"
import DisplayPost from "./DisplayPost"
import LeftSideBar from "./LeftSideBar"
import RightSideBar from "./RightSideBar"
const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="w-[100%] h-[83vh] flex">
      <LeftSideBar/>
      <DisplayPost/>
      <RightSideBar/>
    </div>
    </>
  )
}

export default Home
