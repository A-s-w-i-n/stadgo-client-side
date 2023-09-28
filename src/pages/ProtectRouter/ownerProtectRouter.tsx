import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../../servises/api/axios interceptor ";
import { useNavigate } from "react-router-dom";

interface OwnerProtectRouterProps {
  children: React.ReactNode;
}

const OwnerProtectRouter: React.FC<OwnerProtectRouterProps> = ({
  children,
}): any => {
  const owner = JSON.parse(localStorage.getItem("owner") as string);
  console.log();
  
  const navigate =useNavigate()
  
  const ownerid =owner.OwnerLoginCheck._id
  

  useEffect(()=>{
    const userBlockCheck =async()=>{
      
      const data = await api.post("/owner/fetchOwnerById", { ownerid });
      // const isblocked =data.data.userDetail.isblocked
      // setBlock(isblocked)
      if(data.data.fetch[0].isblocked == true){
        localStorage.removeItem('owner')
        navigate('/login')
          }
        }
    userBlockCheck()
      })

  return owner ? children : <Navigate to={"/login"} />;
};

export default OwnerProtectRouter;
