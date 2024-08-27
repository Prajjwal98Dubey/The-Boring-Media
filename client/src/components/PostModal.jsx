/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react"
import { IMAGE_ICON } from "../assets/icons"
import BackDrop from "./BackDrop"
import axios from "axios"
import { CREATE_NEW_POST } from "../apis/backendapi"
import { MyPostContext } from "../contexts/MyPostContext"

const PostModal = ({ setPostModal,setDisplayPost }) => {
    const [message, setMessage] = useState("")
    const { setPostFromContext, postFromContext } = useContext(MyPostContext)
    const handleCreatePost = async () => {
        if (message === "") return alert("write something to post...")
        const { data } = await axios.post(CREATE_NEW_POST, {
            post: message
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("devil-auth")).refreshToken}`
            }
        })
        setPostFromContext([data, ...postFromContext])
        setDisplayPost([data, ...postFromContext])
        setMessage("")
        setPostModal(false)
        // setTriggerMount(!triggerMount)
    }
    return (
        <>
            <div onClick={() => setPostModal(false)}>
                <BackDrop />
            </div>
            <div className="w-[500px] h-[200px] bg-[#313131] rounded-lg z-10 fixed top-[30%] left-[32%] text-white font-rubik border border-gray-400 shadow-sm shadow-gray-400 ">
                <div className="flex justify-center items-center font-rubik text-white text-2xl m-1">Write a new post</div>
                <div className="flex justify-center m-2"><textarea autoFocus className="w-[400px] h-[65px] rounded-lg bg-[#313131] border border-gray-300 p-1" placeholder="write something..." onChange={(e) => setMessage(e.target.value)}></textarea></div>
                <div className="flex justify-center">
                    <div className="w-[400px] flex justify-between">
                        <div className="flex justify-center items-center"><img src={IMAGE_ICON} alt="loading" className="w-[20px] h-[20px]" /></div>
                        <div className="flex justify-center items-center"><button className="w-[100px] h-[30px] rounded-lg bg-blue-600 hover:bg-blue-800" onClick={handleCreatePost}>Post</button></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostModal
