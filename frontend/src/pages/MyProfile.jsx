import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { DELETE_MY_POST, MY_ALL_POSTS, MY_DETAILS, USER_DETAIL } from "../apis/backendapi";
import { ADD_POST_ICON, COMMENT_ICON, DELETE_ICON, FOLLOW_ICON, LIKE_ICON, LOGOUT_ICON, POST_LOADER } from "../assets/icons";
import PostModal from "../components/PostModal";
import Brand from "../components/Brand";
import { MyPostContext } from "../contexts/MyPostContext";

const MyProfile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [postLoader, setPostLoader] = useState(true)
    const [triggerMount, setTriggerMount] = useState(false)
    const [postModal, setPostModal] = useState(false)
    const [userName] = useState(document.URL.split('/').reverse()[0])
    const [displayPost, setDisplayPost] = useState([])
    const detailRef = useRef(true);
    const { postFromContext, setPostFromContext } = useContext(MyPostContext)
    useEffect(() => {
        const getMyDetails = async () => {
            if (localStorage.getItem("devil-auth") && (JSON.parse(localStorage.getItem("devil-auth")).name === userName)) {
                const { data } = await axios.get(MY_DETAILS, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("devil-auth")).refreshToken}`
                    }
                })
                setUserData(data)
                setIsLoading(false)
            }
            else {
                const { data } = await axios.get(USER_DETAIL + `${userName}`, {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                })
                setUserData(data.user)
                setIsLoading(false)
                setDisplayPost(data.allPosts)
                setPostLoader(false)
            }
        }
        const getAllMyPosts = async () => {
            if (localStorage.getItem("devil-auth") && (JSON.parse(localStorage.getItem("devil-auth")).name === userName)) {
                const { data } = await axios.get(MY_ALL_POSTS, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("devil-auth")).refreshToken}`
                    }
                })
                setPostFromContext(data.allPosts)
                setDisplayPost(data.allPosts)
                setPostLoader(false)
            }
        }
        if (detailRef.current) {
            getMyDetails()
            getAllMyPosts()
            detailRef.current = false
        }
    }, [navigate, triggerMount, setPostFromContext, userName])
    const handleLogOut = () => {
        localStorage.removeItem("devil-auth")
        setPostFromContext([])
        navigate('/auth/login')
        return
    }
    const handleDeletePost = async (id) => {
        setPostLoader(true)
        await axios.delete(DELETE_MY_POST + `${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("devil-auth")).refreshToken}`
            }
        })
        const filterPostsData = postFromContext.filter((post) => post._id !== id)
        setPostFromContext(filterPostsData)
        setDisplayPost(filterPostsData)
        setPostLoader(false)
        // setTriggerMount(!triggerMount) 

    }

    return (
        <div className="h-[100vh] w-[100vw]">
            <Brand />
            {!isLoading && <>
                <div className="w-[100%] h-[20%] bg-blue-600 flex justify-center relative">
                    <img src={userData.photo} alt="loading" loading="lazy" className="w-[100px] h-[100px] rounded-full border border-blue-800 shadow-sm shadow-blue-500 hover:cursor-pointer hover:border-blue-500 absolute top-[60px]" />
                </div>
                <div className="h-[25%]  mt-[45px] border border-transparent border-b-gray-300">
                    <div className="flex justify-center font-rubik text-2xl text-white m-1">@{userData.name}</div>
                    <div className="flex justify-center">
                        {localStorage.getItem("devil-auth") && (JSON.parse(localStorage.getItem("devil-auth")).name === userName) ? <div className=""><img src={ADD_POST_ICON} alt="loading" loading="lazy" className="w-[25px] h-[25px] m-1 flex justify-center cursor-pointer" onClick={() => setPostModal(true)} />
                            {postModal &&
                                <PostModal setPostModal={setPostModal} setDisplayPost={setDisplayPost} />
                            }
                        </div> : null}
                        <div><img src={FOLLOW_ICON} alt="loading" loading="lazy" className="w-[25px] h-[25px] m-1 flex justify-center" /></div>
                        <div><img src={FOLLOW_ICON} alt="loading" loading="lazy" className="w-[25px] h-[25px] m-1 flex justify-center" /></div>
                        {localStorage.getItem("devil-auth") && (JSON.parse(localStorage.getItem("devil-auth")).name === userName) ? <div><img src={LOGOUT_ICON} alt="loading" loading="lazy" className="w-[25px] h-[25px] m-1 flex justify-center cursor-pointer" onClick={handleLogOut} /></div> : null}
                    </div>

                </div>
                <div className="h-[47%]  overflow-y-auto">
                    {postLoader ? <div className="flex justify-center items-cente p-2"><img src={POST_LOADER} alt="loading" className="w-[35px] h-[35px]" /></div> :
                        <div className="flex justify-center">
                            <div className="">
                                {displayPost.length === 0 ? <div className="flex justify-center p-4 items-center font-bold font-playwright text-white  ">Write some post...</div> : displayPost.map((post) => (
                                    <div key={post._id} className="m-2 w-[650px] font-rubik border border-gray-400 rounded-md p-2 hover:cursor-pointer hover:border-gray-500">
                                        <div className="text-white font-semibold text-[15px] w-full h-fit flex justify-start p-1">{post.post}</div>
                                        <div className="flex justify-center">
                                            <img src={LIKE_ICON} alt="loading" loading="lazy" className="w-[13px] h-[13px] cursor-pointer m-1" />
                                            <img src={COMMENT_ICON} alt="loading" loading="lazy" className="w-[13px] h-[13px] cursor-pointer m-1" />
                                            {localStorage.getItem("devil-auth") && (JSON.parse(localStorage.getItem("devil-auth")).name === userName) ? <img src={DELETE_ICON} alt="loading" loading="lazy" className="w-[13px] h-[13px] cursor-pointer m-1" onClick={() => handleDeletePost(post._id)} /> : null}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </>
            }
        </div>
    )
}

export default MyProfile
