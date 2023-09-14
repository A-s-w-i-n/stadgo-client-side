// import React from "react";
// import MainPagenav from '../navbar/mainPagenav'
import { useNavigate } from "react-router-dom";
import Navdesign from "../../components/navbar/navdesign";

const UserOpening = () => {
  const navigate = useNavigate();

  const buttoClick = () => {
    navigate("/Register");
  };
  return (
    <div>
      <div>
        <Navdesign />
      </div>
      <div className="h-screen flex  justify-center">
        <div className="w-1/2 h-screen flex ml-10 text-5xl items-center">
          <div className="">
            <p className="font-serif">
              Discover the perfect venue that suits your needs
            </p>
          </div>

          <div className="absolute bottom-0 mb-4">
            <button
              className="rounded-full bg-cyan-300 hover:bg-cyan-300 px-6 py-3 mb-44  font-serif  text-lg"
              onClick={buttoClick}
            >
              Lets Go
            </button>
          </div>
        </div>

        <div className="w-1/2  flex  items-center` justify-center">
          <div className="mt-20 w-full ">
            <img
              className=" w-full object-cover"
              src="/mainImages/userOpening.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOpening;
