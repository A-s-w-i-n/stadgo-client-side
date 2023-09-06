// import React from "react";
// import { useNavigate } from "react-router-dom";

const Navdesign = () => {
  // const navigate = useNavigate()
  // const user = "user"
  // const owner = "onwer"
  // const handleLogin =()=>{

  //     if(user){
  //         localStorage.removeItem("user")
  //         navigate('/login')
  //     }
  //     if(owner){
  //         localStorage.removeItem("owner")

  //         navigate('/login')
  //     }
  // }
  return (
    <div>
      <div>
        <div>
          <div className="fixed bg-gradient-to-r from-white from-50%  w-full h-16 flex items-center">
            <img
              className="w-28 ml-5"
              src="/public/mainImages/STADGO-logos_black.png"
              alt=""
            />
            {/* <button onClick={handleLogin} className='ml-auto mr-5 rounded-xl py-2 px-3 bg-cyan-300'>
          Logout
        </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navdesign;
