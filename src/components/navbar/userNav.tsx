import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import {CgProfile} from 'react-icons/cg'
import {MdOutlineStadium} from 'react-icons/md'
import {IoLogOutOutline} from 'react-icons/io5'
// import { useDispatch, useSelector } from "react-redux";
// import api from "../../servises/api/axios interceptor ";
// import { userLogout } from '../../Redux/user/userSlice';

// const dispatch = useDispatch()
const UserNav = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  // const [chatExist,setChatExist] = useState()
  // const [firstChat, setFirstChat] = useState(true);
  const toggleSidebar = () => {
    setShowSidebar((prevShowSidebar) => !prevShowSidebar);
  };

  const {stadiumId} =  useSelector((state : any)=>state.user)
  console.log(stadiumId,"aa");
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    //  dispatch(userLogout())
    navigate("/login");
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  return (
    <div>
      {/* Main Navigation */}
      <div className="fixed z-50  bg-white shadow-lg w-full h-16 flex items-center">
        <img
          className="w-28 ml-5 object-cover"
          src="/mainImages/STADGO-logos_black.png"
          alt=""
        />
        <div className="ml-auto mr-5">
          {/* Toggle button */}
          <button onClick={toggleSidebar}>
            {showSidebar ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed z-50 bg-cyan-200 h-screen w-64 right-0 top-16 transition-transform transform ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Icon to close the sidebar */}
        {showSidebar && (
          <div className="absolute  top-0 left-0 mt-3 ml-3">
            <button onClick={closeSidebar}>
              {/* Replace this with your desired icon for closing */}
            </button>
          </div>
        )}

        {/* Add your list items here */}
        <table className="p-4 mt-5 ml-8">
          <tr className="flex">
            <td
              className="font-bold flex gap-1  text-2xl mt-6  cursor-pointer "
              onClick={() => navigate("/userProfile")}
            >
             <p className="flex gap-4"><span className="mt-[0.4rem] "><CgProfile/></span> Profile</p>
            </td>
          </tr>
          {/* <tr>
            <td
              className="font-bold flex text-2xl mt-6 pt-4 cursor-pointer"
              onClick={() => navigate(`/Chat/${stadiumId}`)}
            >
              Chat
            </td>
          </tr> */}
          <tr>
            <td
              className="font-bold flex text-2xl mt-3 pt-4 cursor-pointer"
              onClick={() => navigate("/stadiumList")}
            >
              <p className="flex gap-4"><span className="mt-[0.4rem] "><MdOutlineStadium/></span>Stadium</p>
            </td>
          </tr>
        

          <tr>
            <td
              className="font-bold text-2xl pt-4 cursor-pointer"
              onClick={handleLogout}
            >
             <p className="flex gap-4"><span className="mt-[0.4rem]"><IoLogOutOutline/></span>Logout</p> 
            </td>
          </tr>
          {/* Add more items as needed */}
        </table>
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-16 pr-4 pb-4 pl-4">
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default UserNav;
