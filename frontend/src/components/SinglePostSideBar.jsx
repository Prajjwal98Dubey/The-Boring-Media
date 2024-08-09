/* eslint-disable react/prop-types */

import { ADD_POST_ICON, BOOKMARK_ICON, COMMENT_ICON, LIKE_ICON } from "../assets/icons"
import SinglePostComment from "./SinglePostComment"

const SinglePostSideBar = ({ post }) => {
    return (
        <div className="w-full text-white font-rubik">
           <div className="m-3 p-2 flex">
            <div className="w-[10%] flex justify-center items-start"><img src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722038400&semt=ais_user" alt="loading" className="w-[45px] h-[45px] rounded-full" /></div>
            <div className="w-[90%] flex justify-start">{post.post}</div>
           </div>
           <div className="flex justify-center">
            <div className="w-fit p-2 m-1 rounded-lg border border-gray-400 flex justify-around">
            <div className="p-1 m-1 hover:bg-red-500 rounded-full flex justify-center items-center cursor-pointer"><img src={LIKE_ICON} alt="loading" className="w-[18px] h-[18px] rounded-full" /></div>
            <div className="p-1 m-1 hover:bg-blue-500 rounded-full flex justify-center items-center cursor-pointer"><img src={COMMENT_ICON} alt="loading" className="w-[18px] h-[18px] rounded-full" /></div>
            <div className="p-1 m-1 hover:bg-[#4a4949] rounded-full flex justify-center items-center cursor-pointer"><img src={BOOKMARK_ICON} alt="loading" className="w-[18px] h-[18px] rounded-full" /></div>
            </div>
           </div>
           <div className="w-[90%] h-[40px] m-3 p-2 flex justify-center text-white font-rubik ">
            <div className="w-full ml-[64px] flex">
                <textarea className="w-full h-fit p-1 bg-[#313131] border  border-gray-500"></textarea>
                <div className=""><img src={ADD_POST_ICON} alt="loading" className="w-[16px] h-[16px]" /></div>
                </div>
            </div>
           <div className="w-[90%] h-[40px] m-3 p-2 flex justify-center ">
            <div className="w-full ml-[64px]">
                {/* <div className=" h-[30px] p-2 border border-gray-400 m-1 "></div>
                <div className=" h-[30px] p-2 border border-gray-400 m-1 "></div>
                <div className=" h-[30px] p-2 border border-gray-400 m-1 "></div>
                <div className=" h-[30px] p-2 border border-gray-400 m-1 "></div>
                <div className=" h-[30px] p-2 border border-gray-400 m-1 "></div>
                 */}
                 {post.comments.length===0 ? <div className="flex justify-center items-center text-white font-semibold">no comments yet.</div> :<SinglePostComment/>}
            </div>
c
           </div>
        </div>
    )
}

export default SinglePostSideBar
