import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { NavBarContext } from "../contexts/NavBarContext";
import axios from "axios";
import { GET_ACTIVE_ROOMS, ROOM_CONNECT_WS } from "../apis/backendapi";
import { useNavigate } from "react-router-dom";
import RoomContext from "../contexts/RoomContext";

const Store = () => {
  const { selectedPath, setSelectedPath } = useContext(NavBarContext);
  const [currPath] = useState(document.URL.split("/"));
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const { setRoomWs } = useContext(RoomContext);
  const navigate = useNavigate();
  useEffect(() => {
    const updateContext = () => {
      let updatedSelectedPath = {};
      for (let key in selectedPath) {
        updatedSelectedPath[key] = false;
      }
      updatedSelectedPath["/" + currPath[currPath.length - 1]] = true;
      setSelectedPath(updatedSelectedPath);
    };
    updateContext();
  }, []);
  useEffect(() => {
    const getActiveRooms = async () => {
      const { data } = await axios.get(GET_ACTIVE_ROOMS, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRooms(data);
      setIsLoading(false);
    };
    getActiveRooms();
  }, []);
  const handleRoomConnect = (id) => {
    const ws = new WebSocket(ROOM_CONNECT_WS);
    ws.addEventListener("open", () => {
      ws.send(
        JSON.stringify({
          userName: JSON.parse(localStorage.getItem("devil-auth")).name,
          roomId: id,
        })
      );
    });
    setRoomWs(ws);
    navigate(`/room?id=${id}`);
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        {isLoading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <div>
            {rooms.map((room) => (
              <div
                key={room.roomId}
                className="w-[600px] h-[100px] p-1 m-1 rounded-lg bg-[#444141] text-white font-rubik "
              >
                <div className="text-xl font-bold p-1 flex justify-center font-playwright">
                  {room.topic}
                </div>
                <div className="flex justify-center items-center m-1">
                  {/* <Link to={"/room?id=" + room._id} target="_blank"> */}
                  <button
                    className="w-fit p-2 h-[30px] shadow-md shadow-gray-500 flex justify-center items-center rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer text-white"
                    onClick={() => handleRoomConnect(room._id)}
                  >
                    Join Room
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Store;
