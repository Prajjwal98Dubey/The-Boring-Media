import { useContext, useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import { USER_SUGGESTIONS } from "../apis/backendapi";
import { LEFT_ARROW, RIGHT_ARROW } from "../assets/icons";
import SearchModalContext from "../contexts/searchModalContext";
const RightSideBar = () => {
  const [userSuggestion, setUserSuggestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const {isSearchOpen} = useContext(SearchModalContext)

  useEffect(() => {
    const fetchUserSuggestions = async () => {
      const { data } = await axios.get(USER_SUGGESTIONS, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      setUserSuggestion(data);
    };
    fetchUserSuggestions();
  }, []);
  useEffect(() => {
    let interval = setInterval(() => {
      handleNext();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  });

  const handlePrev = () => {
    if (index === 0) setIndex(userSuggestion.length-1)
    else setIndex((prevIndex) => prevIndex - 1);
  };
  const handleNext = () => {
    if (index === userSuggestion.length - 1) setIndex(0);
    else setIndex((prevIndex) => prevIndex + 1);
  };
  return (
    <div className="w-[20%] h-full border border-transparent border-l-green-400 text-white">
      
      <div className="flex justify-center items-center">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className={`relative ${isSearchOpen && '-z-10'}`}>
            <img src={LEFT_ARROW} className="w-[25px] h-[25px] absolute left-2 top-[40%]  cursor-pointer hover:scale-110" onClick={handlePrev} />
            <img src={RIGHT_ARROW} className="w-[25px] h-[25px] absolute right-2 top-[40%]  cursor-pointer hover:scale-110" onClick={handleNext} />
            <div className="m-1 absolute bottom-4 font-playwright font-bold text-white left-[34%] text-xl">@{userSuggestion[index].name}</div>
            <div className="flex absolute left-[40%] bottom-0">{new Array(userSuggestion.length).fill("").map((_,i)=>(
              <div key={i}>
                  <div className={`w-[10px] h-[10px]  cursor-pointer rounded-full ${i===index ? 'bg-gray-200':'bg-gray-400'} m-1`} onClick={()=>setIndex(i)}></div>
              </div>
            )) }</div>
            <Link to={`/u/${userSuggestion[index].name}`}>
            <img
              src={userSuggestion[index].photo}
              className="w-[250px] h-[150px] rounded-md "
            /></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSideBar;
