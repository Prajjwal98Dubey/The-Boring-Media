/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";
import BackDrop from "./BackDrop";
import axios from "axios";
import { SEARCH_API } from "../apis/backendapi";
import { trimString } from "../helpers/trimCommName";
import { Link } from "react-router-dom";
import SearchModalContext from "../contexts/searchModalContext";

const SearchModal = ({ setIsSearchModalOpen }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {setIsSearchOpen} = useContext(SearchModalContext)

  const handleSearchQuery = async () => {
    // if (searchText === "") return alert("search something to proceed...");
    const { data } = await axios.get(SEARCH_API + `?text=${searchText}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setSearchResult(data);
    setIsLoading(false);
  };

  const debounce = (func, delay) => {
    return () => {
      let timer = setTimeout(() => {
        func();
      }, delay);
      return timer;
    };
  };

  const debounced = debounce(handleSearchQuery, 500);
  useEffect(() => {
    let timer = null;
    if (searchText === "") setSearchResult([]);
    if (searchText !== "") {
      timer = debounced();
    }
    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  return (
    <div className="absolute">
      <div onClick={() =>{ 
        setIsSearchOpen(false)
        setIsSearchModalOpen(false)}}>
        <BackDrop />
      </div>
      <div className="flex justify-center z-10 font-rubik fixed top-[20%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <input
          type="text"
          className=" w-[400px] h-[45px] p-2 border border-gray-400 rounded-md bg-[#313131] text-white"
          placeholder="search ..."
          value={searchText}
          autoFocus
          onChange={(e) => setSearchText(e.target.value)}
        />
        <span className="absolute right-2 top-[10px]">
          <button
            onClick={searchText!=="" && handleSearchQuery}
            className="w-[80px] h-[25px] rounded-md text-white bg-blue-500 cursor-pointer hover:bg-blue-600 font-bold"
          >
            search
          </button>
        </span>
        {!isLoading && searchResult.length >=1 && (
          <div
            className={`w-[400px] ${
              searchResult.length > 7
                ? "h-[500px] overflow-auto overflow-x-hidden"
                : "h-fit"
            }  p-2 absolute top-12  font-rubik transform  border border-gray-400 shadow-sm shadow-gray-400 rounded-md z-10 bg-[#2a2929]`}
          >
            {searchResult.length >= 1 &&
              searchResult.map((item) => (
                <Link
                  key={item._id}
                  to={
                    item.category === "people"
                      ? `/u/${item.name}`
                      : `/c/${item._id}`
                  }
                >
                  <div className="w-full h-fit p-1 hover:bg-[#464545] cursor-pointer flex rounded-md m-1">
                    {item.category === "people" ? (
                      item.photo !== "" ? (
                        <div>
                          <img
                            className="w-[40px] h-[40px] rounded-full"
                            src={item.photo}
                            alt="loading"
                          />
                        </div>
                      ) : (
                        <div className="w-[40px] h-[40px] rounded-full bg-gray-700 text-white font-bold ">
                          {item.name[0]}
                        </div>
                      )
                    ) : null}
                    {item.category === "community" ? (
                      item.communityPhoto !== "" ? (
                        <div>
                          <img
                            className="w-[40px] h-[40px] rounded-full"
                            src={item.communityPhoto}
                            alt="loading"
                          />
                        </div>
                      ) : (
                        <div className="w-[40px] h-[40px] rounded-full bg-gray-700 text-white font-bold text-xl flex justify-center items-center ">
                          /c
                        </div>
                      )
                    ) : null}
                    <div className="text-white font-bold ml-2 flex justify-center items-center">
                      {item.category === "people"
                        ? trimString(item.name)
                        : trimString(item.title)}
                    </div>
                    <div className="text-gray-400 font-playwright ml-1 text-[11px] flex items-center">
                      {item.category}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
