import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL+`/chat/${targetUserId}`, {
      withCredentials : true,
    });
    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName : msg?.senderId?.firstName,
        lastName : msg?.senderId?.lastName,
        text : msg?.text
      }
    });

    setMessages(chatMessages);
  }

  useEffect(() => {
    fetchChatMessages();
  },[]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
    });

    socket.on("messageRecieved" , ({firstName, lastName, text}) => {
        setMessages((messages) => [...messages , {firstName ,lastName, text}]);
    })

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col rounded-lg shadow-md">
      {/* Top Bar */}
      <h1 className="p-4 border-b border-gray-600 font-semibold text-lg">
        Chat
      </h1>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => {
          return (
            <div  key={index} className={`chat ${(user.firstName === msg.firstName) ? "chat-end" : "chat-start"}`}>
              <div className="chat-header">
                {`${msg.firstName} ${msg.lastName}`}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-gray-600 flex items-center gap-2 ">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500  rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
