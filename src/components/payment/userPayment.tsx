import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../../servises/api/axios interceptor ";
import React from "react";

const UserPremium: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ToastContainer />
      <PayPalScriptProvider
        options={{
          clientId:
          process.env.REACT_APP_PAYPAL_SECRETE as string,
        }}
      >
        <PayPalButtons
          style={{ layout: "horizontal" }}
          className="  my-3"
          createOrder={(_data: any, action: any) => {
            return action.order.create({
              purchase_units: [
                {
                  amount: {
                    value: 100,
                  },
                },
              ],
            });
          }}
          onApprove={(_data: any, actions: any) => {
            return actions.order
              .capture()
              .then(async function () {
                const emailId = JSON.parse(
                  localStorage.getItem("user") as string
                );
                const email = emailId.LoginCheck.email;

                const update = await api.post("/userPremium", { email });
                if (update) {
                  navigate("/orgDetail");

                  toast.success("stadium added successfully", {
                    position: "top-right",
                    autoClose: 3000,
                  });
                }
              })
              .catch(function (error: any) {
                toast.success(error as string, {
                  position: "top-right",
                  autoClose: 3000,
                });
              });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default UserPremium;
