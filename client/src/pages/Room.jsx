import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GET_ROOM_DETAILS, HOST_DETAILS } from "../apis/backendapi";
import RoomContext from "../contexts/RoomContext";
import RoomLeftSidebar from "../components/RoomLeftSidebar";

const Room = () => {
  const [searcParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState({});
  const [message, setMessage] = useState("");
  const { roomWs } = useContext(RoomContext);
  const [roomChats, setRoomChats] = useState([]);
  const [hostDetails, setHostDetails] = useState({});
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!roomWs) return navigate("/store");
    roomWs.addEventListener("message", (payload) => {
      const { message, user } = JSON.parse(payload.data);
      setRoomChats([...roomChats, { message, user }]);
    });
  });
  useEffect(() => {
    const getRoomDetails = async () => {
      await axios
        .get(GET_ROOM_DETAILS + `?roomId=${searcParams.get("id")}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(({ data }) => {
          setRoom(data);
          setIsLoading(false);
          return data.host;
        })
        .then(
          async (host) =>
            await axios
              .get(HOST_DETAILS + `?host=${host}`, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((res) => {
                setHostDetails(res.data);
              })
        );
    };
    getRoomDetails();
  }, [searcParams]);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });
  const handleSendMessage = () => {
    if (!message) return alert("write something..");
    roomWs.send(
      JSON.stringify({
        message,
        roomId: searcParams.get("id"),
        user: JSON.parse(localStorage.getItem("devil-auth")).name,
      })
    );
    setRoomChats([
      ...roomChats,
      { message, user: JSON.parse(localStorage.getItem("devil-auth")).name },
    ]);
    setMessage("");
  };
  return (
    <div className="flex">
      <div className="w-1/2 h-screen border border-transparent border-r-slate-400 text-white">
        <div className="flex justify-center p-1 text-4xl font-bold font-playwright h-[150px] items-end">
          {room.topic}
        </div>
        <RoomLeftSidebar
          // active={active}
          hostDetails={hostDetails}
          roomId={searcParams.get("id")}
        />
      </div>
      <div className="w-1/2 h-screen">
        <div className="flex justify-center text-white font-rubik">
          {isLoading ? (
            <div className="flex justify-center p-1 font-bold">loading...</div>
          ) : (
            <div>
              <div
                ref={scrollRef}
                className="h-[660px] w-[700px] overflow-y-auto scroll-smooth "
              >
                {roomChats.map((chat, index) => (
                  <div key={index} className="flex justify-start h-fit">
                    <div className="text-gray-300 font-medium flex justify-center items-center p-1 m-1 text-[12px]">
                      {chat.user}
                    </div>
                    <div className="text-white font-bold flex justify-center items-center p-1 m-1 text-[14px]">
                      {chat.message}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-[15px]">
                <input
                  type="text"
                  className="w-[600px] h-[35px] rounded-l-md border border-gray-500 p-1 bg-gray-600 "
                  placeholder="write something..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  className="w-[100px] h-[35px] bg-blue-500 text-white text-center hover:bg-blue-600 cursor-pointer rounded-r-md"
                  onClick={handleSendMessage}
                >
                  send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;
