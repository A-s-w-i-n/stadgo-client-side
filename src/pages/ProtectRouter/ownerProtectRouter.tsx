import React from "react";
import { Navigate } from "react-router-dom";

interface OwnerProtectRouterProps {
  children: React.ReactNode;
}

const OwnerProtectRouter: React.FC<OwnerProtectRouterProps> = ({
  children,
}): any => {
  const owner = JSON.parse(localStorage.getItem("owner") as string);

  return owner ? children : <Navigate to={"/login"} />;
};

export default OwnerProtectRouter;
