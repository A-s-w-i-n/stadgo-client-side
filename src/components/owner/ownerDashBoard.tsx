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
 const [ownerInfo,setOnwerInfo] = useState<any>()
  const userEmail = JSON.parse(localStorage.getItem("owner") as string);
  const emailId = userEmail.OwnerLoginCheck;
  const email: any = emailId.email;

  const fetchOwnerById = async () => {
    const { data } = await api.post("/owner/fetchOwner", { email });

    setUserInfo(data.ownerDetail[0].User);
    setOnwerInfo(data.ownerDetail[0].paymentDetails)
    console.log(data.ownerDetail[0].paymentDetails
      ,"aaaa");
    
 

    console.log(data.ownerDetail[0].User);
  };
 


  useEffect(() => {
    fetchOwnerById();
  }, []);

  return (
    <div>
      <div>
        <OwnerNav />
        
        <div className="   overflow-auto grid grid-cols-2 h- gap-6 ">
          <div className="flex w-full  h-[17.2rem]">
            <p className="text-6xl">
              <PiUsersThree />
            </p>
            <div className="w-full  h-[17.2rem]">
              <div className="relative  border border-black  overflow-scroll h-[17.2rem]  overflow-x-auto">
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

          <div className="flex   h-[17.2rem]">
            <p className="text-6xl">
              <LiaMoneyBillWaveSolid />
             
            </p>
            <div className="w-full border border-black  h-[17.2rem]">
              <div className="relative   overflow-scroll h-[17.2rem]  overflow-x-auto">
                <table className="w-full  text-sm text-left text-white-500 dark:text-gray-400">
                  <thead className="text-xs  text-gray-700 uppercase  dark:bg-white dark:text-black-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                       Order Id
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3">
                        aaaa
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ownerInfo.map((items :any) => (
                      <tr className="bg-white border-b dark:bg-slate-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-black-900 whitespace-nowrap dark:text-black"
                        >
                          {items?.orderId}
                        </th>
                        <td className="px-6 py-4 dark:text-black">
                          {items?.stadiumId}
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
