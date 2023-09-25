import  { useEffect, useState } from "react";
import AdminHome from "./adminHome";
import { useNavigate } from "react-router-dom";
import { Chart } from "tw-elements";
import { apiAuth } from "../../servises/api/axios interceptor ";

const AdminDashBord = () => {
  const [usercount, setUsercount] = useState<number>(0);
  const [ownreCount, setOwnercount] = useState<number>(0);
  const [stadiumCount, setStadiumCount] = useState<number>(0);
  const navigate  = useNavigate()

  const count = async () => {
    const userCount = await apiAuth.get("/admin/fetchUser");
    setUsercount(userCount.data.usersFetch.length);
    const ownerCount = await apiAuth.get("/admin/fetchOwner");
    setOwnercount(ownerCount.data.ownerFetch.length);
    const stadiumcount = await apiAuth.get("/stadium/fetchStadiumList");
    setStadiumCount(stadiumcount.data.fetchList.length);
  };
  useEffect(() => {
    count();
  }, []);


  
  return (
    <div>
      <AdminHome />
      <div className="flex">
        <div className="  w-[15rem] ml-[24rem]   h-[20rem] relative flex justify-center items-center">
          <img
            src="/mainImages/backgound.jpg"
            // https://source.unsplash.com/random/350x350/
            alt="random image"
            className="w-full object-cover object-center rounded-lg shadow-md"
          />
          <div className="absolute p-6 w-[12rem] h-[10rem] rounded-lg bg-white shadow-lg">
            <div className="grid items-center justify-center">
              <p className="font-extrabold">NO OF USERS</p>

              <p className="text-center text-6xl mt-3">{usercount}</p>
            </div>
          </div>
        </div>
        <div className="w-[15rem]   ml-[4rem] h-[20rem] relative flex justify-center items-center">
          <img
            src="/mainImages/backgound.jpg"
            alt="random image"
            className="w-full object-cover object-center rounded-lg shadow-md"
          />
          <div className="absolute p-6 rounded-lg w-[12rem] h-[10rem] bg-white shadow-lg">
            <div className="flex flex-col  items-center justify-center">
              <p className="font-extrabold">NO OF OWNERS</p>

              <p className="text-center text-6xl mt-3">{ownreCount}</p>
            </div>
          </div>
        </div>
        <div className="w-[15rem]   ml-[4rem] h-[20rem] relative flex justify-center items-center">
          <img
            src="/mainImages/backgound.jpg"
            alt="random image"
            className="w-full object-cover object-center rounded-lg shadow-md"
          />
          <div className="absolute p-6 rounded-lg w-[12rem] h-[10rem] bg-white shadow-lg">
          <div className="flex flex-col  items-center justify-center">
              <p className="font-extrabold">NO OF STADIUM</p>

              <p className="text-center text-6xl mt-3">{stadiumCount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <button className="p-2 ml-[20rem] mt-6 bg-orange-500 rounded-md px-28 py-9" onClick={()=>navigate("/admin/fetchUser")}>
            USER
          </button>
          <button className="p-2  ml-[20rem] mt-10 bg-indigo-500 rounded-md  px-28 py-9" onClick={()=>navigate("/admin/fetchOwner")}>
            OWNER
          </button>
        </div>
        {/* <div className="ml-auto w-1/2 h-[16rem] overflow-hidden">
          <canvas id="bar-chart-horizontal"></canvas>
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashBord;
