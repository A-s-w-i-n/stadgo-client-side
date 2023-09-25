import { useState, useEffect } from "react";
import UserForm from "../user/UserForm";
import OwnerForm from "../owner/OwnerForm";
import "./costomColor.css";

function Register() {
  const [showOwner, setShowOwner] = useState(false);
  const [showUser, setShowUser] = useState(true);

  const handleShowUser = () => {
    setShowUser(true);
    setShowOwner(false);
  };
  const handleShowOwner = () => {
    setShowOwner(true);
    setShowUser(false);
  };
  useEffect(() => {
    document.body.classList.add("custom-body-color");

    return () => {
      document.body.classList.remove("custom-body-color");
    };
  }, []);
  return (
    <div className="">
      <div className="flex  justify-center  mt-3 mb-6 ">
        <h1 className="font-extrabold text-white text-3xl">Register Now</h1>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          className={`${
            showUser ? "bg-cyan-300" : ""
          } rounded-full bg-neutral-200 hover:bg-black hover:text-white px-6 py-2 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: bg-cyan-300 duration-300 `}
          onClick={handleShowUser}
        >
          USER
        </button>
        <button
          className={`${
            showOwner ? "bg-cyan-300" : ""
          } rounded-full bg-neutral-200 hover:bg-black hover:text-white px-3 py-2 transition ease-in-out delay-150 bg-cyan-300 hover:-translate-y-1 hover:scale-110 hover: bg-cyan-300 duration-300`}
          onClick={handleShowOwner}
        >
          OWNER
        </button>
      </div>
      <div className="flex justify-center bg-orange-700">
        {showUser && <UserForm />}
        {showOwner && <OwnerForm />}
      </div>
    </div>
  );
}

export default Register;
