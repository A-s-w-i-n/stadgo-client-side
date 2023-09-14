import { useEffect, useState } from "react";
import OwnerNav from "../navbar/ownerNav";
import { PiUsersThree } from "react-icons/pi";
import { GiClick } from "react-icons/gi";
import { MdOutlineStadium } from "react-icons/md";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { BsGraphUpArrow } from "react-icons/bs";
import api from "../../servises/api/axios interceptor ";
import { useSelector } from "react-redux";

interface userinfos {
  username: string;
  email: string;
  phone: string;
}
const OwnerDashBoard = () => {
  const [userinfo, setUserInfo] = useState<userinfos[]>([]);
  const [price,totalPrice] = useState()
  const [objectCounts,setObjectCounts] = useState()
  const [ownerInfo, setOnwerInfo] = useState<any>();
  const userEmail = JSON.parse(localStorage.getItem("owner") as string);
  const emailId = userEmail.OwnerLoginCheck;
  const email: any = emailId.email;
  const { stadiumId } = useSelector((state: any) => state.owner);

  const id = stadiumId;
  console.log(id, "aaaa");

  const fetchOwnerById = async () => {
    const { data } = await api.post("/owner/fetchOwner", { email });

    setUserInfo(data.ownerDetail[0].User);
    console.log(data.ownerDetail[0].User);

    setOnwerInfo(data.ownerDetail[0].paymentDetails);
    const paymentDetails = data.ownerDetail[0].paymentDetails; // Assuming this is your array

    const objectCount = paymentDetails.length
    console.log(objectCount,"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    setObjectCounts(objectCount)
    
    const totalStadiumPrice = paymentDetails.reduce(
      (total: any, payment: any) => {
        const stadiumPrice = parseFloat(payment.stadiumPrice);

        return total + stadiumPrice;
      },
      0
    );
    totalPrice(totalStadiumPrice)
    console.log(totalStadiumPrice);

    console.log(data.ownerDetail[0].paymentDetails, "aaaa");

    console.log(data);
  };
  useEffect(() => {
    const stadium = async () => {
      console.log("hii");
      const data = await api.post("/stadium/detaildView", { id });
      console.log(data.data);
    };
    stadium();
  }, []);

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
              <GiClick />
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
          <div className=" flex w-full h-[17.2rem] ">
            <p className="text-6xl">
              <MdOutlineStadium />
            </p>
            <div className="w-full h-[17.2rem] flex border border-black">
            <div className=" w-1/2 text-center   h-[17.2rem]">
              <p className="font-mono font-semibold"> Total Income</p>
              <div className="w-full h-[15.7rem] flex  items-center justify-center">
                <div className="bg-white flex font-mono justify-center items-center text-center rounded-lg shadow-xl w-40 h-40">
                  <p className="text-4xl">{price}</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 text-center h-[17.2rem] ">
              <p className="font-mono font-semibold"> NO. OF BUYERS </p>
              <div className="w-full h-[15.7rem] flex  items-center justify-center">
                <div className="bg-white rounded-lg flex font-mono justify-center items-center text-center shadow-xl w-40 h-40">
                  <p className="text-4xl">{objectCounts}</p>
                </div>
              </div>
            </div>
            </div>
            
            <div></div>
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
                        User Id
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ownerInfo?.map((items: any) => (
                      <tr className="bg-white border-b dark:bg-slate-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-black-900 whitespace-nowrap dark:text-black"
                        >
                          {items?.orderId}
                        </th>
                        <td className="px-6 py-4 dark:text-black">
                          {items?.stadiumPrice}
                        </td>
                        <td className="px-6 py-4 dark:text-black">
                          {items?.userId}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <div className="bg-violet-400 flex w-full h-[17.2rem]">
            <p className="text-6xl">
              <BsGraphUpArrow />
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashBoard;
