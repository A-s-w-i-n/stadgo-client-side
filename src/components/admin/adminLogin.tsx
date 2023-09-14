import React, { useEffect, useState } from "react";
import  { apiAuth } from "../../servises/api/axios interceptor ";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [adminLogin, setAdminLogin] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    let admin = localStorage.getItem("admin");

    if (admin) {
      navigate("/adminhome");
    }
  }, []);

  const handleLoginAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminLogin({ ...adminLogin, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await apiAuth.post("/admin/adminLogin", { ...adminLogin });
      if (data) {
        console.log(data);
        const adminToken = data.accessToken;
        const admindata = data.adminLoginCheck;

        localStorage.setItem("admin", JSON.stringify(adminToken, admindata));
        if (data) {
          navigate("/adminhome");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleLogin}>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xs w-96 h-96 rounded-3xl">
            <h2 className="text-2xl text-center font-bold mb-4 mt-4">
              Admin Login
            </h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-12  "
                htmlFor="username"
              >
                Username
              </label>
               <input
              className="w-60 rounded-xl border-gray-300 border  p-2 "
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleLoginAdmin}
            />
              {/* <input
                className="shadow appearance-none border rounded w-full py-2 px-3 rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="email"
                type="text"
                placeholder="Email"
                onChange={handleLoginAdmin}
              /> */}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
              className="w-60 rounded-xl border-gray-300 border  p-2 "
              type="text"
              name="password"
              placeholder="password"
              onChange={handleLoginAdmin}
            />
              {/* <input
                className="shadow appearance-none border rounded w-full py-2 px-3 rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                onChange={handleLoginAdmin}
              /> */}
              
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
