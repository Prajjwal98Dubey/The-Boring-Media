/* eslint-disable react/prop-types */
import { useState } from "react"
import BackDrop from "./BackDrop"
import axios from "axios"
import { CREATE_ROOM } from "../apis/backendapi"
import { SPIN_LOADING } from "../assets/icons"

const CreateRoom = ({setIsCreateRoomOpen}) => {
    const[topic,setTopic] = useState("")
    const[pinned,setPinned] = useState("")
    const[isLoading,setIsLoading] = useState(false)
    const handleCreateRoom =  async()=>{
        if(!topic || !pinned) return alert('enter all fields...')
        try {
            setIsLoading(true)
            await axios.post(CREATE_ROOM,{
                topic,
                pinned,
                host:JSON.parse(localStorage.getItem("devil-auth"))._id,
                roomId:Date.now()
            },{
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${JSON.parse(localStorage.getItem("devil-auth")).refreshToken}`
                }
            })
            setIsLoading(false)
            setIsCreateRoomOpen(false)
        } catch (error) {
            console.log('error while creating room',error)
        }
       


    }
  return (
    <div>
        <div onClick={()=>setIsCreateRoomOpen(false)}><BackDrop/></div>
        <div className="text-white w-[600px] h-[500px] border border-gray-300 fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10 bg-[#313131] rounded-md ">
        <div className="flex justify-center items-center text-2xl p-1 m-1 font-playwright">Create Room</div>
        <div className="flex justify-center items-center p-1 m-1"><input type="text" className="w-[450px] h-[39px] rounded-md border border-gray-400 p-1  bg-[#313131]" placeholder="enter room name..." value={topic} onChange={(e)=>setTopic(e.target.value)} /></div>
        <div className="flex justify-center items-center p-1 m-1"><textarea className="bg-[#313131] flex justify-center items-center w-[450px] h-[300px] rounded-md border border-gray-400 p-1 m-1" value={pinned} onChange={(e)=>setPinned(e.target.value)} placeholder="briefly explain room topic to be discuss... "></textarea></div>
        <div className="flex justify-center items-center"><button className="bg-purple-600 text-white flex justify-center items-center p-1 m-1 hover:bg-purple-700 w-[140px] h-[30px] rounded-md shadow-sm shadow-gray-300 cursor-pointer font-bold font-rubik" onClickCapture={handleCreateRoom}>{isLoading ? <img src={SPIN_LOADING} className="w-[24px] h-[24px] rounded-full flex justify-center items-center"/>: "+ Create"}</button></div>
        </div>
    </div>
  )
}

export default CreateRoom
