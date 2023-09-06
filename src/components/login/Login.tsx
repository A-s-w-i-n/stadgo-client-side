import  { useState, useEffect } from "react";
import UserLogin from "../user/userLogin";
import OwnerLogin from "../owner/ownerLogin";
import "../Register/costomColor.css";

function Login() {
  const [userLogin, showUserLogin] = useState(true);
  const [ownerLogin, showOwnerLogin] = useState(false);

  useEffect(() => {
    document.body.classList.add("custom-body-color");

    return () => {
      document.body.classList.remove("custom-body-color");
    };
  }, []);

  const handleshowuser = () => {
    showUserLogin(true);
    showOwnerLogin(false);
  };
  const handleShowOwner = () => {
    showOwnerLogin(true);
    showUserLogin(false);
  };
  return (
    <div>
      <div className="flex  justify-center  mt-9   ">
        <h1 className="font-extrabold text-3xl text-white   ">LOGIN</h1>
      </div>

      <div className="flex justify-center gap-4 ">
        <button
          className={`${
            userLogin ? "bg-cyan-300" : ""
          } rounded-full bg-neutral-200 hover:bg-cyan-300 mt-2 px-6 py-2 transition ease-in-out delay-150 bg-cyan-300 hover:-translate-y-1 hover:scale-110 hover: bg-cyan-300 duration-300 `}
          onClick={handleshowuser}
        >
          USER
        </button>
        <button
          className={`${
            ownerLogin ? "bg-cyan-300" : ""
          } rounded-full bg-neutral-200 hover:bg-cyan-300 px-3 mt-2 py-2 transition ease-in-out delay-150 bg-cyan-300 hover:-translate-y-1 hover:scale-110 hover: bg-cyan-300 duration-300`}
          onClick={handleShowOwner}
        >
          OWNER
        </button>
      </div>
      <div className="flex justify-center ">
        {userLogin && <UserLogin />}
        {ownerLogin && <OwnerLogin />}
      </div>
    </div>
  );
}

export default Login;
