import React from "react";
import { Navigate,useNavigate } from "react-router-dom";
import api from "../../servises/api/axios interceptor ";
import {useEffect,useState} from "react"


interface UserProtectedRouterProps {
  children: React.ReactNode;
}

const UserProtectedRouter:React.FC<UserProtectedRouterProps> = ({
  children,
}) => {

  const user = JSON.parse(localStorage.getItem("user") as string);
  const email =user.LoginCheck.email
  const [block,setBlock] =useState<any>()
const navigate =useNavigate()



useEffect(()=>{
  const userBlockCheck =async()=>{
    
    const data = await api.post("/fetchUsers", { email });
   
    // const isblocked =data.data.userDetail.isblocked
    // setBlock(isblocked)
    if(data.data.userDetail.isblocked ==true){
      localStorage.removeItem('user')
      navigate('/login')
        }
      }
  userBlockCheck()
    })
    return (user ? <>{children}</> : <Navigate to={"/login"} />);
  };
  
export default UserProtectedRouter;
