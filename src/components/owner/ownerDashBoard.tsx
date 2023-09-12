import { useEffect, useState } from "react";
import OwnerNav from "../navbar/ownerNav";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineStadium } from "react-icons/md";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { BsGraphUpArrow } from "react-icons/bs";
import api from "../../servises/api/axios interceptor ";

interface userinfos {
  username: string;
  email: string;
  phone: string;
}
const OwnerDashBoard = () => {
  const [userinfo, setUserInfo] = useState<userinfos[]>([]);
  const userEmail = JSON.parse(localStorage.getItem("owner") as string);
  const emailId = userEmail.OwnerLoginCheck;
  const email: any = emailId.email;

  const fetchOwnerById = async () => {
    const { data } = await api.post("/owner/fetchOwner", { email });

    setUserInfo(data.ownerDetail[0].User);

    console.log(data.ownerDetail[0].User);
  };

  useEffect(() => {
    fetchOwnerById();
  }, []);

  return (
    <div>
      <div>
        <OwnerNav />
        <div>
          <aside
            id="default-sidebar"
            className=" z-[0] absolute  bg-blue-300 w-64 h-[36rem]   "
            aria-label="Sidebar"
          >
            <div className="h-[35rem] px-3 py-4   dark:bg-blue-400 ">
              <ul className="space-y-2 font-medium">
                <li>
                  <button className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg
                      className="w-5 h-5  transition duration-75 dark:text-black group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                    <span className="ml-3">Dashboard</span>
                  </button>
                </li>
                <li>
                  <button className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg
                      className="w-5 h-5  transition duration-75 dark:text-black group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                    <span className="ml-3">USERS</span>
                  </button>
                </li>
              </ul>
            </div>
          </aside>
        </div>
        <div className="ml-[16rem]   overflow-auto grid grid-cols-2 h- gap-6 bg-lime-400">
          <div className="flex w-full  h-[17.2rem]">
            <p className="text-6xl">
              <PiUsersThree />
            </p>
            <div className="w-full bg-violet-500 h-[17.2rem]">
              <div className="relative   overflow-scroll h-[17.2rem]  overflow-x-auto">
                <table className="w-full  text-sm text-left text-white-500 dark:text-gray-400">
                  <thead className="text-xs  text-gray-700 uppercase  dark:bg-white dark:text-black-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        User Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Phone
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userinfo.map((items) => (
                      <tr className="bg-white border-b dark:bg-slate-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-black-900 whitespace-nowrap dark:text-black"
                        >
                          {items?.username}
                        </th>
                        <td className="px-6 py-4 dark:text-black">
                          {items?.email}
                        </td>
                        <td className="px-6 py-4 dark:text-black">
                          {items?.phone}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="bg-blue-400 w-full h-[17.2rem] ">
            <p className="text-6xl">
              <MdOutlineStadium />
            </p>
          </div>

          <div className="bg-green-400 w-full  h-[17.2rem]">
            <p className="text-6xl">
              <LiaMoneyBillWaveSolid />
            </p>
          </div>
          <div className="bg-violet-400 w-full h-[17.2rem]">
            <p className="text-6xl">
              <BsGraphUpArrow />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashBoard;
