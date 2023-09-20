import { useEffect, useState } from "react";
import OwnerNav from "../navbar/ownerNav";
import api from "../../servises/api/axios interceptor "; // Correct the import path
import { useParams } from "react-router-dom";

const Notification = () => {
  const { stadiumId } = useParams();
  const [notifiacions, setNotification] = useState([]);
  // Remove the status state as it's no longer needed

  const emailId = JSON.parse(localStorage.getItem("owner") as string);
  const emailCheck = emailId.OwnerLoginCheck;
  const ownerId = emailCheck._id;

  const notificationFetch = async () => {
    const { data } = await api.post('/notification/ownerNotification', { ownerId, stadiumId });
    const notificationsWithStatus = data.findNotification.map((notification: any) => ({
      ...notification,
      status: false, // Initialize the status for each notification
    }));
    setNotification(notificationsWithStatus);
  };

  const notificationStatus = async (Id: any) => {
    const data = await api.post('/notification/updateStatus', { ownerId, Id });
    const updatedNotifications :any = notifiacions.map((notification: any) =>
      notification._id === Id
        ? { ...notification, status: data.data.update.request }
        : notification
    );
    setNotification(updatedNotifications);
  };

  useEffect(() => {
    notificationFetch();
  }, []);

  return (
    <div className="w-full h-screen  ">
      <OwnerNav />
      <div className="flex  fixed top-0 left-0 right-0 mt-16 bg-white  items-start justify-center h-12  shadow-xl">
        <p className="mt-3 font-serif">All Notification</p>
      </div>
      <div className="bg-gray-100 h-[41rem] mt-9">
        {notifiacions.map((item: any) => (
          <div className=" w-full   flex  justify-center items-center  ">
            <div className="flex w-[55rem] h-16 items-center justify-center rounded-md bg-white shadow-xl mt-5 ">
              <div className=" items-center w-full h-full justify-center ">
                <p className="ml-10 mt-5">
                  <span className="font-extrabold">{item?.username}</span> is requested for payment payment confirmation
                </p>
              </div>
              <div className="flex gap-4  items-center justify-center w-64 h-full  ">
                {item.status ? (
                  <button className="text-blue-500 text-sm">accepted</button>
                ) : (
                  <button className="text-green-500 text-sm " onClick={() => notificationStatus(item._id)}>ACCEPT</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
