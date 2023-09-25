import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  { apiAuth } from "../../servises/api/axios interceptor ";
import { useDispatch } from "react-redux";
import { ownerLogged } from "../../Redux/owner/ownerSlice";

const OwnerLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ownerLogin, setOwnerLogin] = useState({
    email: "",
    password: "",
  });

  // useEffect(()=>{
  //   let onwer = localStorage.getItem('owner')

  //   if(onwer){
  //     navigate('/ownerHome')
  //   }
  // },[])

  const handleLoginOwner = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerLogin({ ...ownerLogin, [e.target.name]: e.target.value });
  };

  const handleOwnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      
      const { data } = await apiAuth.post("/owner/ownerLogin", {
        ...ownerLogin,
      });

      if (data) {
        const OwnerLoginCheck = data.ownerLoginCheck;
        const accessToken = data.accessToken;

        if (data.ownerLoginCheck.isblocked == true) {
          navigate("/login");
        } else {
          localStorage.setItem(
            "owner",
            JSON.stringify({ accessToken, OwnerLoginCheck })
          );
          dispatch(
            ownerLogged({
              ownername: data.ownerLoginCheck.ownername,
              email: data.ownerLoginCheck.email,
              ownerId: data.ownerLoginCheck._id,
            })
          );
          navigate("/ownerHome");
        }
      }
    } catch (error) {}
  };

  return (
    <div className="relative h-screen ">
      <form action="" onSubmit={handleOwnerLogin}>
        <div className="flex justify-center h-full ">
          <div className="w-1/2 p-4 bg-whilte-600 "></div>
        </div>
        <div className="absolute top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-96 h-3/5 shadow-xl rounded-2xl p-4 bg-opacity-30">
          <p className="text-center text-2xl">OWNER </p>

          <div className="">
            <input
              className="w-60 rounded-xl border-gray-300 border ml-14 p-2 mt-14"
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleLoginOwner}
            />
          </div>
          <div>
            <input
              className="w-60 rounded-xl border-gray-300 border m-14 p-2 mt-9"
              type="text"
              name="password"
              placeholder="password"
              onChange={handleLoginOwner}
            />
          </div>
          <div>
            <button className="rounded-full ml-36 bg-cyan-300 py-3 px-3 ...">
              submit
            </button>
          </div>
          <p className="mt-7 text-center">
            alredy have and account{" "}
            <span
              className="text-blue-400"
              onClick={() => navigate("/Register")}
            >
              signup
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default OwnerLogin;
