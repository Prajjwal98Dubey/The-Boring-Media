/* eslint-disable react/prop-types */

import axios from "axios"
import { useEffect, useState } from "react"
import { ALL_COMMENTS } from "../apis/backendapi"
import { COMMENT_ICON, LIKE_ICON, POST_LOADER } from "../assets/icons"

const SinglePostComment = ({ postId , triggerMountComments}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [comments, setComments] = useState([])
  useEffect(() => {
    const getAllComments = async () => {
      const { data } = await axios.get(ALL_COMMENTS + `?postId=${postId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setComments(data)
      setIsLoading(false)
    }
    getAllComments()
  }, [postId,triggerMountComments])
  return (
    <div className="mb-2">
      {isLoading ? <div className="flex justify-center p-4 items-center animate-pulse"><img src={POST_LOADER} alt="loading" className="w-[18px] h-[18px]" /></div> :
        comments.length === 0 ? <div className="text-white font-semibold font-rubik flex justify-center items-center">no comments yet.</div> : <div className=" pb-2"> {comments.map((comment, index) => 
        (
        <div key={index}  className="w-full h-fit p-2 m-1 hover:cursor-pointer hover:bg-[#444444] text-white border border-gray-400 rounded-md">
          <div className="flex">
          <div className="flex justify-center m-1 items-center"><img src={comment.photo} alt="loading" className="w-[35px] h-[35px] rounded-full" /></div>
          <div className="m-1">
            {comment.comment}
          </div>
          </div>
          <div className="flex m-1 w-[80px] justify-around">
            <div className="hover:bg-red-400 cursor-pointer rounded-full p-1 flex justify-center items-center z-10"><img src={LIKE_ICON} alt="loading" className="w-[15px] h-[15px]"  /></div>
            <div className="hover:bg-blue-400 cursor-pointer rounded-full p-1 flex justify-center items-center z-10"><img src={COMMENT_ICON} alt="loading" className="w-[15px] h-[15px]" /></div>
          </div>
            
        </div>
        )
        )}
        </div>
      }
    </div>
  )
}

export default SinglePostComment
