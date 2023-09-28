// import React from "react";
import React, { useEffect, useState } from "react";
import UserNav from "../navbar/userNav";
import io from "socket.io-client";
import { AiOutlineSend } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import api, { apiAuth } from "../../servises/api/axios interceptor ";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Chats, message } from "../../domain/modals/chat";
import Loader from "../loader/loader";
import OwnerNav from "../navbar/ownerNav";
import { useParams } from "react-router-dom";

interface role {
  role: string;
}

const Chat = (props: role) => {
  const EndPoint = process.env.REACT_APP_ORIGIN_URL as string;

  const socket = io(EndPoint);

  const selectChat = (user: Chats) => {
    setSelcetUser(user);
  };
  // const [chat, setChat] = useState("");
  const [message, setMessage] = useState<message[]>([]);
  const [initialChat, setInitialChat] = useState<any>();
  const [chats, setChats] = useState<Chats[]>([]);
  const { userId, username } = useSelector((state: any) => state.user);
  const { ownerId } = useSelector((state: any) => state.owner);

  // const [username, setUsername] = useState("");
  const [ownername, setOwnername] = useState("");
  const navigate = useNavigate();
  const [selectedOwnerId, setSelectedOwnerId] = useState(null);
  const [notifiactionStatus, setNotificationStatus] = useState();

  const [chatId, setChatId] = useState("");
  const [unreadMessages, setUnreadMessages] = useState<{
    [key: string]: number;
  }>({});

  const [newMessage, setNewMessages] = useState("");
  const [selectUser, setSelcetUser] = useState<Chats>();
  const currentId = props.role === "user" ? userId : ownerId;
  const currentRole = props.role;
  const [searchQuery, setSearchQuery] = useState("");
  const [loding, setLoding] = useState(false);
  const { stadiumid } = useParams();

  useEffect(() => {
    socket.emit("setup", currentId);
  }, [currentId, socket]);

  const setMessageFn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessages(e.target.value);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetch = async () => {
      if (props.role === "user") {
        const data = await apiAuth.get(`/chat/userChat/${userId}`);

        setChats(data.data.allChats);

        // chats.map( (item : any)=>{
        //   console.log("hiii");

        //  if(ownerId == item?.Owner?._id && userId == item.User ) {
        //    const chatId = item._id
        //    console.log(chatId,"ssssssssssssssssssssssssss");

        //     apiAuth.get(`/message/${chatId}`).then((data)=>{
        //       console.log(data.data.messages);
        //       setMessage(data.data.messages)
        //    });
        //  }
        // })
      } else {
        const data = await apiAuth.get(`/chat/ownerChat/${ownerId}`);
        setChats(data.data.allChats);
      }
      // const chatId =
      // const data = api.post('/message',{})
    };
    fetch();
  }, []);
  useEffect(() => {
    chats.map((item: any) => {
      if (ownerId == item?.Owner?._id && userId == item.User) {
        const chatId = item._id;

        apiAuth.get(`/message/${chatId}`).then((data) => {
          setMessage(data.data.messages);
        });
      }
    });
  }, [chats]);

  // const initialChat =  () =>{

  const filteredChats = chats.filter((chat: any) => {
    const ownerName = chat.Owner?.ownername || "";
    return ownerName.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const filteredChatsUser = chats.filter((chat: any) => {
    const username = chat.User?.username || "";
    return username.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSendNotification = async () => {
    setLoding(true);
    const data = await api.post("/notification/create", {
      username,
      ownerId,
      userId,
      stadiumid,
    });
    findStatus();
  };
  const findStatus = async () => {
    const data = await api.post("/notification/userNotification", {
      ownerId,
      userId,
      stadiumid,
    });
    setNotificationStatus(data.data.find?.request);

    if (notifiactionStatus == true) {
      setLoding(false);
    }
  };
  useEffect(() => {
    findStatus();
  }, [username, ownerId, userId, stadiumid]);

  useEffect(() => {
    socket.on("message Received", (newMessage: message) => {
      if (chatId !== newMessage.chat?._id) {
      } else {
        setMessage([...message, newMessage]);
      }
    });
  }, [socket, message]);

  const handleMessageFetch = async (chatId: string) => {
    setLoding(true);
    const { data } = await apiAuth.get(`/message/${chatId}`);
    data.messages.forEach((message: { createdAt: string | number | Date }) => {
      const createdAtDate = new Date(message.createdAt);
      const formattedTime = `${createdAtDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${createdAtDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      message.createdAt = formattedTime;
    });

    setMessage(data.messages);

    socket.emit("join-chat", chatId);
    setLoding(false);
    findStatus();
  };
  const sendMessgae = async (
    content: string,
    chatId: string,
    currentId: string
  ) => {
    // const content = chat;
    const { data } = await apiAuth.post("/message/send", {
      content,
      currentId,
      currentRole,
      chatId,
    });
    return data;
    // handleMessageFetch(chatId);
  };

  const moveChatToTop = (chatId: any) => {
    const updatedChats = chats.filter((chat) => chat._id !== chatId);
    const movedChat: any = chats.find((chat) => chat._id === chatId);
    setChats([movedChat, ...updatedChats]);
  };

  const handleMessageSend = async () => {
    if (newMessage.trim().length > 0) {
      const result = await sendMessgae(newMessage, chatId, currentId);
      setNewMessages("");
      moveChatToTop(chatId);
      socket?.emit("newMessage", result.msg);
      setMessage([...message, result.msg]);
    }
  };

  return (
    <div className="h-screenflex flex-col">
      {loding && <Loader />}
      {props.role === "user" ? <UserNav /> : <OwnerNav />}

        <div className="container mx-auto  mt-[-128px]">
      <div className="mt-32    w-full">
          <div className=" ml-4 h-[36rem]   w-[78rem]">
            <div className="flex  border lg:w-full md:w-8/12 sm:w-full    rounded shadow-lg h-full">
              {/* Left */}
              <div className="lg:w-1/3 md:w-full sm:w-1/12 border  flex flex-col">
                {/* Header */}
                <div className=" py-2 px-3   bg-gray-200  flex flex-row justify-between items-center">
                  <div className="flex"></div>
                </div>

                {/* Search */}
                <div className="py-2 px-2  bg-gray-300">
                  <input
                    type="text"
                    className="w-full text-black px-2 py-2 text-sm border"
                    placeholder="Search or start new chat"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>

                {/* Contacts */}
                <div className="lg:w-full bg-gray-300 overflow-x-auto overflow-auto  flex-1 ">
                  {props.role === "user"
                    ? filteredChats?.map((item: any) => (
                        <div>
                          <div
                            className={`flex w-full  bg-slate-100 hover:bg-slate-300 list-none mt-1 h-14  border ${
                              unreadMessages[item._id] ? "unread-chat" : ""
                            }`}
                          >
                            <li
                              className=" w-[14rem]  h-full"
                              key={item._id}
                              onClick={() => {
                                selectChat(item);
                                setChatId(item._id);
                                handleMessageFetch(item._id);
                                setSelectedOwnerId(item.Owner._id);
                                console.log(item.Owner?._id, "id");
                                setOwnername(item.Owner);
                              }}
                            >
                              <div className="flex w-[25rem] h-full">
                                <div className="flex  w-8 h-8 mt-3 ml-1 border border-black rounded-full">
                                  <img
                                    className="rounded-2xl w-full object-cover"
                                    src="/mainImages/default profile image.jpg"
                                    alt=""
                                  />
                                </div>
                                <div className="flex flex-col ml-5">
                                  <div className="flex  font-extrabold font-serif">
                                    {item.Owner?.ownername}
                                  </div>
                                  <div className="mt-auto">
                                    <span className="h-5 w-10  font-thin text-xs text-slate-600">
                                      {item.latestMessage?.content}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </div>
                        </div>
                      ))
                    : filteredChatsUser?.map((item: any) => (
                        <div>
                          <div className="flex w-full  bg-slate-100 hover:bg-slate-300 list-none mt-1 h-14  border">
                            <div
                              className="flex w-full h-10"
                              key={item._id}
                              onClick={() => {
                                selectChat(item);
                                setChatId(item._id);
                                handleMessageFetch(item._id);
                              }}
                            >
                              <div className="flex w-8 h-8 mt-3  border   border-black rounded-full  ">
                                <img
                                  className="rounded-2xl w-full"
                                  src={item.User?.profileImg}
                                  alt=""
                                />
                              </div>

                              <div className="flex flex-col ml-5">
                                <div className="flex  font-extrabold font-serif">
                                  {item.User?.username}
                                </div>
                                <div className="mt-auto">
                                  <span className="h-5 w-10  font-thin text-xs text-slate-600">
                                    {item.latestMessage?.content}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  {/* Contact entries */}
                </div>

                {props.role === "user" &&
                  selectedOwnerId &&
                  (notifiactionStatus ? (
                    <div
                      className="your-div-styles text-center flex items-center justify-center cursor-pointer hover:bg-blue-500 rounded-sm w-full h-10 bg-blue-400"
                      onClick={() =>
                        navigate(`/RentConfirmation/${ownerId}/${stadiumid}`)
                      }
                    >
                      <p>CONTINUE WITH PAYMENT</p>
                    </div>
                  ) : loding ? (
                    <div className="your-div-styles text-center flex items-center justify-center cursor-pointer hover:bg-blue-500 rounded-sm w-full h-10 bg-blue-400">
                      <p>REQUEST PROCESSING....</p>
                    </div>
                  ) : (
                    <div
                      className="your-div-styles text-center flex items-center justify-center cursor-pointer hover:bg-blue-500 rounded-sm w-full h-10 bg-blue-400"
                      onClick={handleSendNotification}
                    >
                      <p>REQEST FOR PAYMENT</p>
                    </div>
                  ))}
              </div>

              {/* Right */}
              <div className="lg:w-2/3 md:w-2/4 sm:w-2/12 border flex flex-col">
                {/* Header */}
                <div className="py-2 px-3 bg-gray-200 flex flex-row justify-between items-center">
                  <div className="flex"></div>
                </div>

                {/* Messages */}

                {/* {username || ownername && */}

                {props.role === "user" ? (
                  <div className="flex-1 overflow-auto bg-gray-100">
                    {message.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center mb-4 mx-7 ${
                          item.User ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`bg-slate-400 rounded-lg p-2 ${
                            item.User ? "text-left " : "text-right "
                          }`}
                          style={{ maxWidth: "80%" }} // Limit the width of the chat bubble
                        >
                          <div>
                            <p>{item?.content}</p>
                          </div>
                          <p className="text-[.5rem] text-end">{item.createdAt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 overflow-auto bg-gray-100">
                    {message.map((item, index) => (
                      <div
                        key={index}
                        className={`flex   items-center mb-4 mx-7 ${
                          item.Owner ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`bg-slate-400  rounded-t-sm  rounded-lg p-2 ${
                            item.Owner
                              ? "text-left  rounded-tl-lg"
                              : "text-right bg-gray-800 rounded-tr-lg"
                          }`}
                          style={{ maxWidth: "80%" }} // Limit the width of the chat bubble
                        >
                          <div>
                            <p className="text-white">{item?.content}</p>
                          </div>
                          <p className="text-xs text-end text-white">
                            {item.createdAt}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* } */}

                {/* Input */}
                <div className="bg-gray-300 px-4 py-4 flex items-center">
                  <div className="flex-1 mx-4">
                    <input
                      className="w-full border rounded px-2 py-2"
                      type="text"
                      name="message"
                      placeholder="Insert your message here"
                      value={newMessage}
                      onChange={(e) => setMessageFn(e)}
                    />
                  </div>
                  <div
                    className="bg-black text-white px-3 py-3 rounded-lg"
                    onClick={handleMessageSend}
                  >
                    <AiOutlineSend />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
