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
      <div className="h-screen flex  items-center   justify-center">
        <div className="w-1/2  h-44 mt-3      ml-10 text-5xl ">
          <div className="  items-center">
            <p className="font-serif ">
              Discover the perfect venue that suits your needs
            </p>
          </div>

          <div className="">
            <button
              className="rounded-xl bg-black text-white hover:bg-transparent hover:border hover:border-black hover:text-black w-24 h-10   font-serif  text-lg"
              onClick={buttoClick}
            >
              Lets Go
            </button>
          </div>
        </div>

        <div className="w-1/2  flex  items-center  justify-center">
          <div className="mt-20  w-full ">
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
