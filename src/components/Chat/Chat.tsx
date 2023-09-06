// import React from "react";
import React, { useEffect, useState } from "react";
import UserNav from "../navbar/userNav";
import io from "socket.io-client";
import { AiOutlineSend } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
import  { apiAuth } from "../../servises/api/axios interceptor ";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Chats, message } from "../../domain/modals/chat";


interface role {
  role: string;
}
const Chat = (props: role) => {
  const EndPoint = "http://localhost:3001";

  const socket = io(EndPoint);

  const selectChat = (user: Chats) => {
    setSelcetUser(user);
  };
  // const [chat, setChat] = useState("");
  const [message, setMessage] = useState<message[]>([]);
  const [chats, setChats] = useState<Chats[]>([]);
  const { userId } = useSelector((state: any) => state.user);
  const { ownerId } = useSelector((state: any) => state.owner);
  // const [username, setUsername] = useState("");
  const [ownername, setOwnername] = useState("");
  const [chatId, setChatId] = useState("");
  const [newMessage, setNewMessages] = useState("");
  const [selectUser, setSelcetUser] = useState<Chats>();
  const currentId = props.role === "user" ? userId : ownerId;
  const currentRole = props.role;
  const [searchQuery, setSearchQuery] = useState("");
  console.log(chatId, "chatId");

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

  const filteredChats = chats.filter((chat : any) => {
    const ownerName = chat.Owner?.ownername || "" ; // Default to an empty string if ownername is undefined
    return ownerName.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const filteredChatsUser = chats.filter((chat :any) => {
    const username = chat.User?.username || ""; // Default to an empty string if username is undefined
    return username.toLowerCase().includes(searchQuery.toLowerCase());
  });
  useEffect(() => {
    const fetch = async () => {
      if (props.role === "user") {
        const data = await apiAuth.get(`/chat/userChat/${userId}`);

        setChats(data.data.allChats);
        console.log(data.data.allChats, "userchat");
      } else {
        const data = await apiAuth.get(`/chat/ownerChat/${ownerId}`);
        setChats(data.data.allChats);
        console.log(data.data);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    socket.on("message Received", (newMessage: message) => {
      console.log("got a new messageeeeeeeeeeeeeeee",newMessage);
      console.log('ddddddddddd=',newMessage.User);
      console.log('ddddddddddd=',newMessage.Owner);
      

      if (chatId !== newMessage.chat?._id) {
        console.log('chatIddddd===',chatId);
        console.log('newMessage.chat?._id=======',newMessage.chat?._id);
        
        
        // console.log(`message from ${newMessage.user}${newMessage.owner}`);
      } else {
        setMessage( [...message, newMessage]);
      }
    });
  }, [socket,message]);

  const handleMessageFetch = async (chatId: string) => {
    console.log(chatId, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    const { data } = await apiAuth.get(`/message/${chatId}`);
    console.log(
      data.messages,
      "vvvvvccccccccccccccccccccccccccccccccccccccccccccccccccc"
    );
    setMessage(data.messages);
    socket.emit("join-chat", chatId);
  };
  const sendMessgae = async (
    content: string,
    chatId: string,
    currentId: string
  ) => {
    // const content = chat;
  const {data}=  await apiAuth.post("/message/send", {
      content,
      currentId,
      currentRole,
      chatId,
    });
    return data
    // handleMessageFetch(chatId);
  };
  const handleMessageSend = async () => {
    console.log("neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

    if (newMessage.trim().length > 0) {
      const result  = await sendMessgae(newMessage, chatId, currentId);
      console.log(newMessage,"||",chatId ,"||" ,currentId,"pppppppppppppppppppppppppppppppppppp");
      
      console.log(result, "response meassagelllllllllllllllllllllllllllllllllllllllllll");
      setNewMessages("");
      socket?.emit("newMessage", result.msg);
      console.log(result,'mkkkkkkkkkkkkkkkkkkkkkkk');
      setMessage([...message,result.msg]);
     

    }
  };
  

  // useEffect(() => {}, [message]);
  // console.log(message);



  return (
    <div className="h-[41rem] flex flex-col">
      <UserNav />

      <div className="mt-32  w-full">
        <div className="container mx-auto   mt-[-128px]">
          <div className="fixed ml-4 h-[36rem] w-[78rem]">
            
            <div className="flex border border-gray-300 rounded shadow-lg h-full">
              {/* Left */}
              <div className="w-1/3 border flex flex-col">
                {/* Header */}
                <div className="py-2 px-3 bg-gray-200 flex flex-row justify-between items-center">
                  <div className="flex"></div>
                </div>

                {/* Search */}
                <div className="py-2 px-2 bg-gray-300">
        <input
          type="text"
          className="w-full text-black px-2 py-2 text-sm border"
          placeholder="Search or start new chat"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

                {/* Contacts */}
                <div className="bg-gray-300 overflow-auto flex-1">
                  {props.role === "user"
                    ? filteredChats?.map((item:any) => (
                        <div>
                          <div className=" flex w-full  bg-slate-100  list-none mt-4 h-14  border">
                            <div className="flex w-8 h-8 mt-3 ml-1 border  border-black rounded-full  "></div>
                            <li
                              className=" w-[14rem] h-full"
                              key={item._id}
                              onClick={() => {
                                selectChat(item);
                                setChatId(item._id);
                                handleMessageFetch(item._id);
                                setOwnername(item.Owner)
                              }}
                            >


                              <div className="flex font-extrabold  font-serif  ml-6">{item.Owner?.ownername}</div>
                            <span className="felx mt-4 ml-6  font-thin text-xs text-slate-600">
                              {item.latestMessage?.content}
                            </span>
                            </li>
                          </div>
                        </div>
                      ))
                    : filteredChatsUser?.map((item : any) => (
                        <div>
                          <div className="flex w-full  bg-slate-100  list-none mt-4 h-14  border">
                            <div
                              className="flex w-full h-10"
                              key={item._id}
                              onClick={() => {
                                selectChat(item);
                                setChatId(item._id);
                                handleMessageFetch(item._id);
                              }}
                            >
                              <div className="flex w-8 h-8 mt-3  border   border-black rounded-full  "><img className="rounded-2xl" src={item.User?.profileImg} alt="" /></div>

                            <div className="flex font-extrabold h-7  font-serif ml-6  ">{item.User?.username}</div>

                            <div className="flex mt-8 w-[6rem] font-thin text-xs text-slate-600 ">
                              {item.latestMessage?.content}
                            </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  {/* Contact entries */}
                </div>
              </div>

              {/* Right */}
              <div className="w-2/3 border flex flex-col">
                {/* Header */}
                <div className="py-2 px-3 bg-gray-200 flex flex-row justify-between items-center">
                  {/* <div className="flex items-center">
                    <div>
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                        alt="Chat Avatar"
                      />
                    </div>
                  
                    <div className="ml-4">
                      <p className="text-gray-800">New Movie! Expendables 4</p>
                      <p className="text-xs text-gray-700 mt-1">
                        Andrés, Tom, Harrison, Arnold, Sylvester
                      </p>
                    </div>
                  </div> */}

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
                 {item?.content}
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
                        {item?.content}
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
