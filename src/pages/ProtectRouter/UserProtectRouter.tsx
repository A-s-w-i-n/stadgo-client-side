import React from "react";
import { Navigate } from "react-router-dom";

interface UserProtectedRouterProps {
  children: React.ReactNode;
}

const UserProtectedRouter:React.FC<UserProtectedRouterProps> = ({
  children,
}) => {
  const user = JSON.parse(localStorage.getItem("user") as string);
  return (user ? <>{children}</> : <Navigate to={"/login"} />);
};

export default UserProtectedRouter;
