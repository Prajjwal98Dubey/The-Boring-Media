/* eslint-disable react/prop-types */

/// this component is displaying the posts on the home page.

import axios from "axios";
import { useEffect, useState } from "react";
import { USER_DETAIL } from "../apis/backendapi";
import { BOOKMARK_ICON, COMMENT_ICON, LIKE_ICON } from "../assets/icons";


const SinglePost = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userDetail, setUserDetail] = useState({});
  useEffect(() => {
    const getUserDetail = async () => {
      const { data } = await axios.get(USER_DETAIL + `${post.user}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUserDetail(data.user);
      setIsLoading(false);
    };
    getUserDetail();
  }, [post.user]);
  return (
    <>
      {!isLoading && (
        <div className="w-[90%] h-fit border border-gray-500 rounded-md text-white font-rubik m-2 flex hover:cursor-pointer hover:bg-[#444242] ">
          <div className="flex justify-start items-start p-1 m-1 w-fit">
            <img
              src={userDetail.photo}
              alt="loading"
              loading="lazy"
              className="w-[45px] h-[45px] rounded-full"
            />
          </div>
          <div className="w-[85%]">
            <div className="text-[14px] font-bold mr-1 ml-1 mt-1 flex ">
              {userDetail.name.charAt(0).toUpperCase() +
                userDetail.name.substring(1)}
              <div className="text-gray-400 ml-2 text-[10px] flex justify-center items-center">
                {post.time.split("T")[0]}
              </div>
            </div>
            <div className="text-[13px] h-fit pl-[3px] pr-[3px] pb-[3px]">
              {post.post}
            </div>
            <div className="flex w-1/2 justify-start mt-1 mb-1">
              <div className="flex justify-center items-center hover:bg-[#e15d5d] p-[5px] rounded-full mr-[20px]"
              >
                <img
                  src={LIKE_ICON}
                  alt="loading"
                  loading="lazy"
                  className="w-[14px] h-[14px] rounded-full hover:cursor-pointer"
                />
              </div>
              <div className="flex justify-center items-center hover:bg-[#5060d8] p-[5px] rounded-full mr-[20px]">
                <img
                  src={COMMENT_ICON}
                  alt="loading"
                  loading="lazy"
                  className="w-[14px] h-[14px] rounded-full hover:cursor-pointer"
                />
              </div>
              <div className="flex justify-center items-center hover:bg-[#3e3e3e] p-[5px] rounded-full mr-[20px]">
                <img
                  src={BOOKMARK_ICON}
                  alt="loading"
                  loading="lazy"
                  className="w-[14px] h-[14px] rounded-full hover:cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePost;
