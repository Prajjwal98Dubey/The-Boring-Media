/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GET_ROOM_DETAILS } from "../apis/backendapi";
import RoomContext from "../contexts/RoomContext";
import { useCustomNavigate } from "../custom-hooks/useCustomNavigate";

const RoomLeftSidebar = ({active, roomId }) => {
  const [roomDetails, setRoomDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeMembers, setActiveMembers] = useState(0);
  const{roomWs} = useContext(RoomContext)

  useEffect(()=>{
    roomWs.addEventListener('message',(payload)=>{
      console.log("i am here.")
      if(JSON.parse(payload.data).active){
        setActiveMembers(JSON.parse(payload.data).active)
      }
    })
  })

  useEffect(() => {
    const getRoomDetails = async () => {
      const { data } = await axios.get(GET_ROOM_DETAILS + `?roomId=${roomId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRoomDetails(data)
      setIsLoading(false)
    };

    getRoomDetails();
  }, [roomId]);
  return (
    <div>
        {isLoading ? <div className="text-white flex justify-center items-center">Loading...</div>:
        <>        
        <div className="flex justify-center items-center text-gray-400 text-[13px] m-1"> hosted by - {roomDetails.host}</div>
        <div className="flex justify-center text-white font-medium text-[17px]">{roomDetails.pinned}</div>
        <div className="flex justify-center items-center">{activeMembers}</div>
        </>
        }
    </div>
    
  )
};

export default RoomLeftSidebar;
