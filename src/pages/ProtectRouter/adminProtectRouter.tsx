import React from 'react'
import { Navigate } from "react-router-dom";

interface AdminProtectRouterProps {
    children: React.ReactNode;
  }

  const AdminProtectRouter : React.FC<AdminProtectRouterProps>=({
    children
  }) :any=>{
  
    const admin = JSON.parse(localStorage.getItem("admins")as string);
    

    return admin ? children :   <Navigate to={'/adminlogin'}/>
  }
  export default AdminProtectRouter