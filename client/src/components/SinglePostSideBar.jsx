/* eslint-disable react/prop-types */

import { useState } from "react";
import { BOOKMARK_ICON, COMMENT_ICON, LIKE_ICON } from "../assets/icons";
import SinglePostComment from "./SinglePostComment";
import axios from "axios";
import { CREATE_COMMENT } from "../apis/backendapi";
import { handleLikes } from "../helpers/postHelpers";
const SinglePostSideBar = ({ post }) => {
  const [inputText, setInputText] = useState("");
  const [triggerMountComments, setTriggerMountComments] = useState(false);
  const handleCreatePost = async () => {
    if (inputText.length === 0) return alert("write something to post.");
    await axios.post(
      CREATE_COMMENT,
      {
        comment: inputText,
        originalPost: post._id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("devil-auth")).refreshToken
          }`,
        },
      }
    );
    setInputText("");
    setTriggerMountComments(!triggerMountComments);
  };
  return (
    <div className="w-full text-white font-rubik">
      <div className="m-3 p-2 flex">
        <div className="w-[10%] flex justify-center items-start">
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722038400&semt=ais_user"
            alt="loading"
            className="w-[45px] h-[45px] rounded-full"
          />
        </div>
        <div className="w-[90%] flex justify-start">{post.post}</div>
      </div>
      <div className="flex justify-center">
        <div className="w-fit p-2 m-1 rounded-lg border border-gray-400 flex justify-around">
          <div className="p-1 m-1 rounded-full flex justify-center items-center cursor-pointer">
            <div className="">
                <div className="hover:bg-red-500 p-1 rounded-full" onClick={()=>handleLikes(post._id)}>
            <img
              src={LIKE_ICON}
              alt="loading"
              className="w-[18px] h-[18px] rounded-full m-1  "
            />
                </div>
            <div className="flex justify-center items-center text-[14px m-1]">{post.likeCount}</div>
            </div>
          </div>
          <div className="p-1 m-1  rounded-full flex justify-center items-center cursor-pointer">
          <div className="">
                <div className="hover:bg-blue-500 p-1 rounded-full">
            <img
              src={COMMENT_ICON}
              alt="loading"
              className="w-[18px] h-[18px] rounded-full m-1  "
            />
                </div>
            <div className="flex justify-center items-center text-[14px m-1]">{post.likeCount}</div>
            </div>
          </div>
          <div className="p-1 m-1  rounded-full flex justify-center items-center cursor-pointer">
          <div className="">
                <div className="hover:bg-[#4a4949] p-1 rounded-full">
            <img
              src={BOOKMARK_ICON}
              alt="loading"
              className="w-[18px] h-[18px] rounded-full m-1  "
            />
                </div>
            <div className="flex justify-center items-center text-[14px m-1]">{post.likeCount}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90%] h-[40px] m-3 p-2 flex justify-center text-white font-rubik ">
        <div className="w-full ml-[64px] flex">
          <div className="w-[90%]">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-[40px] rounded-l-sm border border-gray-300 bg-[#313131] p-1"
            ></textarea>
          </div>
          <div className="w-[10%] font-rubik">
            <button
              className="bg-green-500 h-[40px] w-[100px] hover:bg-green-600 cursor-pointer font-semibold flex justify-center items-center rounded-r-sm"
              onClick={handleCreatePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div className="w-[90%] h-[40px] m-3 p-2 flex justify-center ">
        <div className="w-full ml-[64px]">
          <SinglePostComment
            postId={post._id}
            triggerMountComments={triggerMountComments}
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePostSideBar;
