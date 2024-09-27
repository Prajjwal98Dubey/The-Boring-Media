import { useContext, useEffect, useState } from "react";
import {
  BOOKMARK_ICON,
  DOWNLOAD_ICON,
  HOME_ICON,
  SEARCH_ICON,
  STORE_ICON,
} from "../assets/icons";
import { Link } from "react-router-dom";
import tbm from "../assets/images/TBM1.png";
import { NavBarContext } from "../contexts/NavBarContext";
import SearchModal from "./SearchModal";
import CreateRoom from "./CreateRoom";
const Navbar = () => {
  const { selectedPath } = useContext(NavBarContext);
  const[isSearchModalOpen,setIsSearchModalOpen] = useState(false)
  const[isCreateRoomOpen,setIsCreateRoomOpen] =  useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById("nav");

      if (window.scrollY > 50) {
        nav.style.backgroundColor = "#2F7DE1";
      } else {
        nav.style.backgroundColor = "#313131";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="nav"
      className="flex justify-evenly sticky top-0 font-rubik border border-transparent border-b-gray-400 m-1 p-1"
    >
      <div className="flex justify-center items-center">
        <img
          className="w-[80px] h-[50px] hover:scale-110 "
          src={tbm}
          alt="loading"
        />
      </div>
      <div id="nav-container" className="flex justify-center w-[70%]">
        <div
          id="nav"
          className="w-[40%] h-[50px] border border-[#FDFEFE] rounded-xl m-2 flex justify-evenly items-center p-2"
        >
          <Link to="/">
            <div
              className={`flex justify-center items-center p-2 rounded-lg hover:bg-[#A569BD] cursor-pointer ${
                selectedPath["/"] ? "bg-[#A569BD]" : null
              }`}
            >
              <img src={HOME_ICON} alt="loading" loading="lazy" />
            </div>
          </Link>
          <div onClick={()=>setIsSearchModalOpen(true)}
              className={`flex justify-center items-center p-2 rounded-lg hover:bg-[#A569BD] cursor-pointer`}
            >
              <img src={SEARCH_ICON} alt="loading" loading="lazy" />
            </div>
            {isSearchModalOpen && <SearchModal setIsSearchModalOpen={setIsSearchModalOpen}/>}
          <Link to="/store">
            <div
              className={`flex justify-center items-center p-2 rounded-lg hover:bg-[#A569BD] cursor-pointer ${
                selectedPath["/store"] ? "bg-[#A569BD]" : null
              }`}
            >
              <img src={STORE_ICON} alt="loading" loading="lazy" />
            </div>
          </Link>
          <Link to="/bookmark">
            <div
              className={`flex justify-center items-center p-2 rounded-lg hover:bg-[#A569BD] cursor-pointer ${
                selectedPath["/bookmark"] ? "bg-[#A569BD]" : null
              }`}
            >
              <img src={BOOKMARK_ICON} alt="loading" loading="lazy" />
            </div>
          </Link>
          <Link to="/download">
            <div
              className={`flex justify-center items-center p-2 rounded-lg hover:bg-[#A569BD] cursor-pointer ${
                selectedPath["/download"] ? "bg-[#A569BD]" : null
              }`}
            >
              <img src={DOWNLOAD_ICON} alt="loading" loading="lazy" />
            </div>
          </Link>
        </div>
      </div>
      {localStorage.getItem("devil-auth") ? (
        <div className="flex justify-center items-center">
          <Link
            to={"/u/" + JSON.parse(localStorage.getItem("devil-auth")).name}
          >
            <img className="w-[45px] h-[45px] rounded-full border border-purple-600 hover:bg-purple-700 hover:shadow-sm hover:shadow-gray-300" src={JSON.parse(localStorage.getItem('devil-auth')).photo} alt="loading" />
          </Link>
          <div className="ml-[5px]">
            <button className="font-rubik w-[150px] h-[30px] bg-purple-600 text-white font-bold text-[15px] flex justify-center items-center p-1 rounded-md shadow-sm shadow-gray-300 hover:bg-purple-700" onClick={()=>setIsCreateRoomOpen(true)}> + Create Room</button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Link to="/auth/login">
            <button className="bg-blue-500 text-white font-semibold hover:bg-blue-600 cursor-pointer p-2 w-[150px] h-[35px] flex justify-center items-center rounded-md ">
              Login / Sign Up
            </button>
          </Link>
        </div>
      )}
      {isCreateRoomOpen && <CreateRoom setIsCreateRoomOpen={setIsCreateRoomOpen} />}
    </div>
  );
};

export default Navbar;

/*
#A569BD  -> purple
*/
