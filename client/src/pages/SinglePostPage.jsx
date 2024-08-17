import { useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import { SINGLE_POST } from "../apis/backendapi"
import { POST_LOADER } from "../assets/icons"
import SinglePostSideBar from "../components/SinglePostSideBar"
import OtherNavBar from "../components/OtherNavBar"
const SinglePostPage = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [post, setPost] = useState({})
    useEffect(() => {
        const getPostDetail = async () => {
            const { data } = await axios.get(SINGLE_POST + `?id=${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setPost(data)
            setIsLoading(false)
        }
        getPostDetail()
    }, [id])
    return (
        <div>
            <OtherNavBar/>
            <div className="flex">
                <div className="w-[60%] ">
                {isLoading?<div className="flex justify-center p-4 items-center"><img src={POST_LOADER} alt="loading" className="w-[30px] h-[30px] animate-pulse" /></div>:
                <SinglePostSideBar post={post}/>
            }
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default SinglePostPage
