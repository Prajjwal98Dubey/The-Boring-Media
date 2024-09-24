import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { GET_ROOM_DETAILS } from "../apis/backendapi"

const Room = () => {
    const [searcParams] = useSearchParams()
    const[isLoading,setIsLoading] = useState(true)
    const[room,setRoom] = useState({})
    useEffect(()=>{
        const getRoomDetails = async()=>{
            const {data} = await axios.get(GET_ROOM_DETAILS+`?roomId=${searcParams.get("id")}`,{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            setIsLoading(false)
            setRoom(data)
        }
        getRoomDetails()
    },[searcParams])
  return (
    <div className="flex justify-center text-white font-rubik">
      {isLoading ? <div className="flex justify-center p-1 font-bold">loading...</div>:
      <div>
            <div className="flex justify-center p-1 text-xl font-bold">{room.topic}</div>
            <div className="flex justify-center fixed left-[490px] bottom-16"><input type="text" className="w-[600px] h-[35px] rounded-md border border-gray-500 p-1 bg-gray-600 " /></div>
      </div>
      }
    </div>
  )
}

export default Room
