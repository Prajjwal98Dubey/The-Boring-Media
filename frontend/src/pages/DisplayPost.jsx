import axios from "axios"
import { useEffect, useState } from "react"
import { ALL_POST_LOGGEDIN_USER } from "../apis/backendapi"
import SinglePost from "../components/SinglePost"
import { POST_LOADER } from "../assets/icons"

const DisplayPost = () => {
    const [posts, setPosts] = useState([])
    const [isPostLoading, setIsPostLoading] = useState(true)
    useEffect(() => {
        const getAllPosts = async () => {
            const { data } = await axios.get(ALL_POST_LOGGEDIN_USER, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("devil-auth")).refreshToken}`
                }
            })
            setPosts(data)
            setIsPostLoading(false)
        }
        getAllPosts()
    }, [])
    return (
        <div className="border border-transparent border-r-gray-600 border-l-gray-600 w-[60%] h-full text-white overflow-auto flex justify-center ">
            {isPostLoading ? <div className="flex justify-center p-2 items-center"><img src={POST_LOADER} alt="loading" loading="lazy" className="w-[30px] h-[30px] rounded-full" /></div> :
                <div className="m-2">
                    {posts.length===0 ?<div className="flex justify-center items-center">No Recommendation on.</div> :posts.map((post, index) => (
                        <SinglePost post={post} key={index} />
                    ))}
                </div>
            }
            
        </div>
    )
}

export default DisplayPost
