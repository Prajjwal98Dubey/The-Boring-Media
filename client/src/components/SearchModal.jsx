/* eslint-disable react/prop-types */

import { useState } from "react";
import BackDrop from "./BackDrop";

const SearchModal = ({ setIsSearchModalOpen }) => {
    const[searchText,setSearchText] = useState("")
  return (
    <div className="absolute">
      <div onClick={() => setIsSearchModalOpen(false)}>
        <BackDrop />
      </div>
      <div className="flex justify-center z-10 fixed top-[20%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <input
          type="text"
          className=" w-[400px] h-[35px] p-2 border border-gray-400 rounded-md bg-[#313131] text-white"
          placeholder="search ..."
          value={searchText}
          onChange={(e)=>setSearchText(e.target.value)}
        />
        <span className="absolute right-2 top-[5px]"><button className="w-[80px] h-[25px] rounded-md text-white bg-blue-500 cursor-pointer hover:bg-blue-600">search</button></span>
      </div>
      <div className="flex justify-center z-10 fixed top-[47%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <div className=" w-[400px] h-[350px] p-2 border border-gray-400 rounded-md bg-[#313131] text-white"></div>
      </div>
    </div>
  );
};

export default SearchModal;
