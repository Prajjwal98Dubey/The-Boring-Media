/* eslint-disable react/prop-types */
import { useState } from "react";
import RoomContext from "./RoomContext";

const RoomContextProvider = ({ children }) => {
  const [roomWs, setRoomWs] = useState(null);
  return (
    <RoomContext.Provider value={{ roomWs, setRoomWs }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomContextProvider;
