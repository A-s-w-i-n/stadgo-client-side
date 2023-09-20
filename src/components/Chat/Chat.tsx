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
  const [initialChat,setInitialChat] = useState<any>()
  const [chats, setChats] = useState<Chats[]>([]);
  const { userId, username } = useSelector((state: any) => state.user);
  const { ownerId } = useSelector((state: any) => state.owner);
  console.log(ownerId);

  console.log(username);

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
  console.log(chatId, "chatId");
  console.log(ownerId, "aa");

  console.log(selectUser);
  console.log(ownername);

  useEffect(() => {
    socket.emit("setup", currentId);
  }, [currentId, socket]);

  const setMessageFn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessages(e.target.value);
    console.log("kkkkkkkkkkkkkkkkkkkk", newMessage);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetch = async () => {
      if (props.role === "user") {
        const data = await apiAuth.get(`/chat/userChat/${userId}`);

        setChats(data.data.allChats);
        console.log(data.data.allChats, "userchat");

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
        console.log(data.data.allChats, "ownerChats");
      }
      // const chatId =
      // const data = api.post('/message',{})
    };
    fetch();
  }, []);
  useEffect(()=>{
     chats.map( (item : any)=>{ 
          console.log("hiii");
          
         if(ownerId == item?.Owner?._id && userId == item.User ) {
           const chatId = item._id
           console.log(chatId,"ssssssssssssssssssssssssss");

            apiAuth.get(`/message/${chatId}`).then((data)=>{
              console.log(data.data.messages); 
            setMessage(data.data.messages) 
            })
          }

           }); 
  },[chats])


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
    console.log(data);
  };
  const findStatus = async () => {
    const data = await api.post("/notification/userNotification", {
      ownerId,
      userId,
      stadiumid,
    });
    // console.log(data.data.find?.request, "a");
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
      console.log("got a new messageeeeeeeeeeeeeeee", newMessage);
      console.log("ddddddddddd=", newMessage.User);
      console.log("ddddddddddd=", newMessage.Owner);

      if (chatId !== newMessage.chat?._id) {
        
        console.log("chatIddddd===", chatId);
        console.log("newMessage.chat?._id=======", newMessage.chat?._id);

        // console.log(`message from ${newMessage.user}${newMessage.owner}`);
      } else {
        setMessage([...message, newMessage]);
      }
    });
  }, [socket, message]);

  const handleMessageFetch = async (chatId: string) => {
    console.log(chatId, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
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
      console.log(formattedTime);
      message.createdAt = formattedTime;
    });
    console.log(
      data.messages,
      "vvvvvccccccccccccccccccccccccccccccccccccccccccccccccccc"
    );
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
    console.log("neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

    if (newMessage.trim().length > 0) {
      const result = await sendMessgae(newMessage, chatId, currentId);
      setNewMessages("");
      moveChatToTop(chatId);
      console.log(
        newMessage,
        "||",
        chatId,
        "||",
        currentId,
        "pppppppppppppppppppppppppppppppppppp"
      );

      console.log(
        result,
        "response meassagelllllllllllllllllllllllllllllllllllllllllll"
      );
      socket?.emit("newMessage", result.msg);
      console.log(result, "mkkkkkkkkkkkkkkkkkkkkkkk");
      setMessage([...message, result.msg]);
    }
  };

  // useEffect(() => {}, [message]);
  // console.log(message);

  return (
    <div className="h-[41rem]  flex flex-col">
      {loding && <Loader />}
      {props.role === "user" ? <UserNav /> : <OwnerNav />}

      <div className="mt-32   w-full">
        <div className="container mx-auto   mt-[-128px]">
          <div className="fixed ml-4 h-[36rem]  w-[78rem]">
            <div className="flex border border-gray-300  rounded shadow-lg h-full">
              {/* Left */}
              <div className="w-1/3 border flex flex-col">
                {/* Header */}
                <div className="py-2 px-3  bg-gray-200 flex flex-row justify-between items-center">
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
                <div className="bg-gray-300 overflow-auto   flex-1">
                  {props.role === "user"
                    ? filteredChats?.map((item: any) => (
                        <div>
                          <div
                            className={`flex w-full  bg-slate-100 hover:bg-slate-300 list-none mt-4 h-14  border ${
                              unreadMessages[item._id] ? "unread-chat" : ""
                            }`}
                          >
                            <div className="flex  w-8 h-8 mt-3 ml-1 border  border-black rounded-full  "></div>
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
                              <div className="flex font-extrabold   font-serif  ml-6">
                                {item.Owner?.ownername}
                              </div>
                              <span className="felx mt-4 ml-6  font-thin text-xs text-slate-600">
                                {item.latestMessage?.content}
                              </span>
                            </li>
                          </div>
                        </div>
                      ))
                    : filteredChatsUser?.map((item: any) => (
                        <div>
                          <div className="flex w-full  bg-slate-100 hover:bg-slate-300 list-none mt-4 h-14  border">
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

                              <div className="flex font-extrabold h-7  font-serif ml-6  ">
                                {item.User?.username}
                              </div>

                              <div className="flex mt-8 w-[6rem] font-thin text-xs text-slate-600 ">
                                {item.latestMessage?.content}
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
              <div className="w-2/3 border flex flex-col">
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
                            item.User ? "text-left" : "text-right"
                          }`}
                          style={{ maxWidth: "80%" }} // Limit the width of the chat bubble
                        >
                          <div>
                            <p>{item?.content}</p>
                          </div>
                          <p className="text-xs text-end">{item.createdAt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 overflow-auto bg-gray-100">
                    {message.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center mb-4 mx-7 ${
                          item.Owner ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`bg-slate-400 rounded-lg p-2 ${
                            item.Owner ? "text-left" : "text-right"
                          }`}
                          style={{ maxWidth: "80%" }} // Limit the width of the chat bubble
                        >
                          <div>
                            <p>{item?.content}</p>
                          </div>
                          <p className="text-xs text-end">{item.createdAt}</p>
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
                      value={newMessage}
                      onChange={(e) => setMessageFn(e)}
                    />
                  </div>
                  <div
                    className="bg-blue-500 text-white px-3 py-3 rounded-lg"
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
