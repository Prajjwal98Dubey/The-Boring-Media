import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { MY_DETAILS } from "../apis/backendapi";

const MyProfile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (!localStorage.getItem("devil-auth")) return navigate('/auth/login');
        const getMyDetails = async () => {
            const { data } = await axios.get(MY_DETAILS, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("devil-auth")).refreshToken}`
                }
            })
            setUserData(data)
            setIsLoading(false)
        }
        getMyDetails()
    }, [navigate])
    const handleLogOut = () => {
        localStorage.removeItem("devil-auth")
        navigate('/auth/login')
        return

    }

    return (
        <>
            <div className="w-[100%] h-[300px] bg-blue-600">
                {isLoading ? <div className="font-rubik font-bold text-white flex justify-center p-2 items-center">Loading...</div> :
                    <>
                        <div className="flex justify-center p-1 items-center"><img src={userData.photo} alt="loading" loading="lazy" className="w-[95px] h-[90px] rounded-full border border-blue-700 shadow-xl shadow-blue-700 hover:border-blue-900 hover:shadow-2xl" /></div>                       
                        <div className="flex justify-center p-2 items-center text-white font-bold font-rubik">{userData.name}</div>
                        <div className="flex justify-center p-2 items-center"><button className="w-[100px] h-[30px] rounded-lg font-playwright text-sm bg-red-600 hover:bg-red-700 text-white" onClick={handleLogOut}>logout</button></div>
                    </>
                }
            </div>
            <div className="h-1/2 w-[100%] bg-red-500"></div>
        </>
    )
}

export default MyProfile
