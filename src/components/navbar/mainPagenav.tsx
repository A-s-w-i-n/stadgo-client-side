// import React from "react";
import { useNavigate } from "react-router-dom";

const MainPagenav = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const user = "user";
    const owner = "onwer";
    if (user) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    if (owner) {
      localStorage.removeItem("owner");

      navigate("/login");
    }
  };
  return (
    <div>
      <div>
        <div className="fixed bg-gradient-to-r from-white w-full h-16 flex items-center">
          <img
            className="w-28 ml-5 object-cover"
            src="/mainImages/STADGO-logos_black.png"
            alt=""
          />
          <button
            onClick={handleLogout}
            className="ml-auto mr-5 rounded-xl py-2 px-3 bg-black"
          >
           <p className="text-white">Logout</p> 
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPagenav;
