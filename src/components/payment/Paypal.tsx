import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../../servises/api/axios interceptor ";

import { useSelector } from "react-redux";
import { ReactNode } from "react";
interface UserPremiumProps {
  stadium: ReactNode | any; 
}

const UserPremium: React.FC <UserPremiumProps>= ({stadium})  => {
  const navigate = useNavigate();
  const { ownerId } = useSelector((state: any) => state.owner);
   
  console.log(ownerId);
  const userIdFind = JSON.parse(localStorage.getItem("user") as string);
  console.log(stadium,"aaaaa");

  const userId = userIdFind.LoginCheck._id;
  
   
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
          createOrder={(data: any, action: any) => {
            return action.order.create({
              purchase_units: [
                {
                  amount: {
                    value : stadium?.price,
                  },
                },
              ],
            });
          }}
          onApprove={async (data: any, actions: any) => {
          
            return actions.order
            
              .capture()
              .then(async function () {
             console.log(data);
             console.log(stadium,"hhh");
             
             const orderId =data?.orderID
             const stadiumId =stadium?._id
             const stadiumPrice = stadium?.price
             
                
                const emailId = JSON.parse(
                  localStorage.getItem("user") as string
                );
                const email = emailId.LoginCheck.email;

                const update = await api.post("/userPayment", { stadiumId,orderId,email });
                console.log(update);
                const ownerUpdate = await api.post('/owner/ownerPayment',{stadiumId,orderId,ownerId,userId,stadiumPrice})
                console.log(ownerUpdate);
                const changeStatus = await api.post('/notification/updateStatusByUser',{ownerId,userId})
                console.log(changeStatus);
                
                
                if (update) {
                

                  toast.success("payment completed", {
                    position: "top-right",
                    autoClose: 3000,
                  });
                  navigate("/userProfile");
                }
              })
              .catch(function (error: any) {
                // toast.success(error as string, {
                //   position: "top-right",
                //   autoClose: 3000,
                // });
              });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default UserPremium;
