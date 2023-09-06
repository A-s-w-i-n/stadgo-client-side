import  { useEffect, useState } from "react";
import AdminHome from "./adminHome";
import { Chart } from "tw-elements";
import { apiAuth } from "../../servises/api/axios interceptor ";

const AdminDashBord = () => {
  const [usercount, setUsercount] = useState<number>(0);
  const [ownreCount, setOwnercount] = useState<number>(0);
  const [stadiumCount, setStadiumCount] = useState<number>(0);

  const count = async () => {
    const userCount = await apiAuth.get("/admin/fetchUser");
    setUsercount(userCount.data.usersFetch.length);
    console.log(userCount.data.usersFetch.length, "this is the data");
    const ownerCount = await apiAuth.get("/admin/fetchOwner");
    console.log(ownerCount.data.ownerFetch.length);
    setOwnercount(ownerCount.data.ownerFetch.length);

    const stadiumcount = await apiAuth.get("/stadium/fetchStadiumList");
    console.log(stadiumcount.data);
    
    setStadiumCount(stadiumcount.data.fetchList.length);
  };

  useEffect(() => {
    count();
  }, []);

  const dataBarHorizontal = {
    type: "bar",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Traffic",
          data: [30, 15, 62, 65, 61, 65, 40],
        },
      ],
    },
  };
  const optionsBarHorizontal = {
    options: {
      indexAxis: "y",
      scales: {
        x: {
          stacked: true,
          grid: {
            display: true,
            borderDash: [2],
            zeroLineColor: "rgba(0,0,0,0)",
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
          },
          ticks: {
            color: "rgba(0,0,0, 0.5)",
          },
        },
        y: {
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            color: "rgba(0,0,0, 0.5)",
          },
        },
      },
    },
  };
  useEffect(() => {
    const chartElement = document.getElementById("bar-chart-horizontal");
    if (chartElement) {
      new Chart(chartElement, dataBarHorizontal, optionsBarHorizontal);
    }
  }, []);
  return (
    <div>
      <AdminHome />
      <div className="flex">
        <div className="  w-[15rem] ml-[24rem]   h-[20rem] relative flex justify-center items-center">
          <img
            src="/public/mainImages/backgound.jpg"
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
            src="/public/mainImages/backgound.jpg"
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
            src="/public/mainImages/backgound.jpg"
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
          <button className="p-2 ml-[20rem] mt-6 bg-orange-500 rounded-md px-28 py-9">
            USER
          </button>
          <button className="p-2  ml-[20rem] mt-10 bg-indigo-500 rounded-md  px-28 py-9">
            OWNER
          </button>
        </div>
        <div className="ml-auto w-1/2 h-[16rem] overflow-hidden">
          <canvas id="bar-chart-horizontal"></canvas>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBord;
