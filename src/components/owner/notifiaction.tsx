import {useEffect,useState} from "react";
import OwnerNav from "../navbar/ownerNav";

import api from "../../servises/api/axios interceptor ";
import { useParams } from "react-router-dom";

const Notification = () => {
  const {stadiumId} =useParams()
  const [notifiacions,setNotification] = useState([])
  const [status,setStatus] = useState<boolean>(false)
  // const [accept,setAccept] = useState()

   
  const emailId = JSON.parse(localStorage.getItem("owner") as string);
  const emailCheck = emailId.OwnerLoginCheck;
  const ownerId = emailCheck._id

  

  const notificationFetch =async () =>{
    const {data} =  await api.post('/notification/ownerNotification',{ownerId,stadiumId})

    setNotification(data.findNotification)
  
    
  }

  const notificationStatus =async (Id : any) =>{
    console.log(Id,"aaa");
    const data = await api.post('/notification/updateStatus',{ownerId,Id})
   
    console.log(data.data.update.request);
    setStatus(data.data.update.request)
    notificationFetch()
  }

  

  useEffect(()=>{
    

      notificationFetch()
    

  },[])

  
  return (
    <div className="w-full h-screen  ">
      <OwnerNav />
      <div className="flex  fixed top-0 left-0 right-0 mt-16 bg-white  items-start justify-center h-12  shadow-xl">
        <p className="mt-3 font-serif">All Notification</p>
      </div>

        <div className="bg-gray-100 h-[41rem] mt-9">
      {notifiacions.map((item : any)=>(
        <div className=" w-full   flex  justify-center items-center  ">
          <div className="flex w-[55rem] h-16 items-center justify-center rounded-md bg-white shadow-xl mt-5 ">
           
            <div className=" items-center w-full h-full justify-center ">
              <p className="ml-10 mt-5">
                <span className="font-extrabold">{item?.username}</span> is requested for payment payment conformation
              </p>
            </div>
            {/* <h1>{accept}</h1> */}
            <div className="flex gap-4  items-center justify-center w-64 h-full  ">
{/* {status ? "" :<button className="text-green-700 text-sm">DECLINE</button>} */}
              {status ?<button className="text-blue-500 text-sm">Accepted</button>    : <button  className="text-green-500 text-sm " onClick={()=>notificationStatus(item._id)}>ACCEPT</button>}
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
