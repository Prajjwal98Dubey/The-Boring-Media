/* eslint-disable react/prop-types */

import { useContext, useEffect, useRef, useState } from "react";
import { CLOSE_SYMBOL_ICON, SEND_ICON } from "../assets/icons";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";
import { chatRoomId } from "../helpers/chatRoomIdGenerator";
import axios from "axios";
import { ALL_CHATS, CREATE_CHAT } from "../apis/backendapi";
import ChatContext from "../contexts/ChatContext";
const Chat = ({ setIsOpenChat, userName }) => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const wsRef = useRef(null);
  const { chatContexts, setChatContexts } = useContext(ChatContext);
  useEffect(() => {
    let ws = new WebSocket("ws://localhost:8081");
    wsRef.current = ws;
    ws.addEventListener("open", () => {
      ws.send(
        JSON.stringify({
          client: `${JSON.parse(localStorage.getItem("devil-auth")).name}`,
          roomId: chatRoomId(
            userName,
            JSON.parse(localStorage.getItem("devil-auth")).name
          ),
        })
      );
    });
    ws.addEventListener("message", (payload) => {
      const newChat = JSON.parse(payload.data);
      setChatContexts((prevChats) => [...prevChats, newChat]);
      setChats((prevChats) => [...prevChats, newChat]);
    });
  }, []);
  useEffect(() => {
    const allChats = async () => {
      const { data } = await axios.get(
        ALL_CHATS +
          `?roomId=${chatRoomId(
            userName,
            JSON.parse(localStorage.getItem("devil-auth")).name
          )}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("devil-auth")).refreshToken
            }`,
          },
        }
      );
      setChats(data);
      setChatContexts(data);
      setIsLoading(false);
    };
    if (chatContexts.length === 0 || (chatContexts.length >=1  && chatContexts[0].roomId !== chatRoomId(
      userName,
      JSON.parse(localStorage.getItem("devil-auth")).name
    ) )) allChats();
    else setIsLoading(false);
  }, [userName]);

  const handleSendMessage = async () => {
    if (message === "") return alert("write some message to be sent.");
    setChats([
      ...chats,
      {
        message,
        sender: JSON.parse(localStorage.getItem("devil-auth")).name,
        reciever: userName,
      },
    ]);
    setChatContexts([
      ...chatContexts,
      {
        message,
        sender: JSON.parse(localStorage.getItem("devil-auth")).name,
        reciever: userName,
      },
    ]);
    await axios.post(
      CREATE_CHAT,
      {
        message,
        reciever: userName,
        roomId: chatRoomId(
          userName,
          JSON.parse(localStorage.getItem("devil-auth")).name
        ),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("devil-auth")).refreshToken
          }`,
        },
      }
    );
    // sending it to web socket server.
    wsRef.current.send(
      JSON.stringify({
        message: message,
        sender: JSON.parse(localStorage.getItem("devil-auth")).name,
        reciever: userName,
        roomId: chatRoomId(
          userName,
          JSON.parse(localStorage.getItem("devil-auth")).name
        ),
      })
    );
    setMessage("");
  };
  return (
    <div className="font-rubik">
      <div className="w-full h-[40px] bg-[rgb(72,70,70)]">
        <div className="flex justify-center items-center p-2 text-xl font-bold text-white">
          {capitalizeFirstLetter(userName)}
        </div>
        <div
          onClick={() => {
            setIsOpenChat(false);
            // setChatContexts([])
          }}
          className="absolute top-[7px] right-2 rounded-full hover:bg-gray-800 cursor-pointer p-1 flex justify-center items-end"
        >
          <img
            src={CLOSE_SYMBOL_ICON}
            alt="loading"
            className="w-[17px] h-[17px] rounded-full"
          />
        </div>
        <div className="h-[600px] overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center text-white font-bold text-xl">
              Loading...
            </div>
          ) : chatContexts.length === 0 ? null : (
            <div>
              {chatContexts.map((chat, index) => (
                <div key={index} className="text-white">
                  {chat.sender ===
                  JSON.parse(localStorage.getItem("devil-auth")).name ? (
                    <div className="flex justify-end mb-2">
                      <div className="bg-green-600 p-1 rounded-md w-fit h-fit mr-2">
                        {chat.message}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-start mb-2 ">
                      <div className="bg-gray-500 p-1 w-fit h-fit rounded-md ml-1">
                        {chat.message}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="absolute bottom-0 flex justify-center p-1">
          <div>
            <textarea
              type="text"
              className="border border-gray-400 bg-[#313131] rounded-l-md text-white w-[350px] h-[40px] p-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button
            className="rounded-r-md bg-blue-500 hover:bg-blue-600 w-[40px] h-[40px] flex justify-center items-center "
            onClick={handleSendMessage}
          >
            <img src={SEND_ICON} alt="loading" className="w-[20px] h-[20px] " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
