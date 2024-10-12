/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import {useEffect, useState } from "react";
import { GET_ROOM_DETAILS } from "../apis/backendapi";

const RoomLeftSidebar = ({hostDetails,roomId }) => {
  const [roomDetails, setRoomDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
        {/* {console.log(active)} */}
        <div className="flex justify-center items-center text-gray-400 text-[13px] m-1"> hosted by - {hostDetails.name}</div>
        <div className="flex justify-center text-white font-medium text-[17px]">{roomDetails.pinned}</div>
        <div className="flex justify-center items-center">0</div>
        </>
        }
    </div>
    
  )
};

export default RoomLeftSidebar;
