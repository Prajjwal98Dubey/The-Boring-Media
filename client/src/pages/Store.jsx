
 import { useContext, useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { NavBarContext } from "../contexts/NavBarContext"
import axios from "axios"
import { GET_ACTIVE_ROOMS } from "../apis/backendapi"
import { Link } from "react-router-dom"

const Store = () => {
    const { selectedPath, setSelectedPath } = useContext(NavBarContext)
    const [currPath] = useState(document.URL.split('/'))
    const[isLoading,setIsLoading] = useState(true)
    const[rooms,setRooms] = useState([])
    useEffect(() => {
        const updateContext = () => {
            let updatedSelectedPath = {}
            for (let key in selectedPath) {
                updatedSelectedPath[key] = false
            }
            updatedSelectedPath["/" + currPath[currPath.length - 1]] = true
            setSelectedPath(updatedSelectedPath)
        }
        updateContext()
    }, [])
    useEffect(()=>{
        const getActiveRooms = async()=>{
           const {data} =  await axios.get(GET_ACTIVE_ROOMS,{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            setRooms(data)
            setIsLoading(false)
        }
        getActiveRooms()
    },[])   
    return (
        <>
            <Navbar />
            <div className="flex justify-center">
            {isLoading ? <div className="text-white">Loading...</div> : 
                <div>
               { rooms.map((room)=>(
                    <Link key={room.roomId} to={"/room?id="+room._id} target="_blank">
                    <div className="w-[600px] h-[100px] p-1 m-1 rounded-lg bg-[#444141] text-white font-rubik hover:bg-[#4d4848]">
                        <div className="text-xl font-bold p-1 flex justify-center font-playwright">{room.topic}</div>
                    </div>
                    </Link>
                ))}
                </div>
            }

            </div>
        </>
    )
}

export default Store
