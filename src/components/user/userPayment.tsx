import { ReactNode, useEffect, useState } from "react";
import UserNav from "../navbar/userNav";
import UserPremium from "../payment/Paypal";
import { useParams ,useNavigate} from "react-router-dom";
import api from "../../servises/api/axios interceptor ";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

interface UserPremiumProps {
  stadium: ReactNode | any;
}

const userIdFind = JSON.parse(localStorage.getItem("user") as string);

const userId = userIdFind?.LoginCheck._id;



const UserPayment = () => {
  const navigate = useNavigate();
  const { ownerId } = useSelector((state: any) => state.owner);
  const [stadium, setStadium] = useState<any>("");
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [showDateInput, setShowDateInput] = useState(false);
  const [owner, setOwner] = useState<any>("");
  const [checked, setChecked] = useState(false);
  

  const { ownerid, id } = useParams();

  const user = JSON.parse(localStorage.getItem("user") as string);

  const username = user.LoginCheck.username;

  const handleChange = (e:any) => {
    setChecked(e.target.checked);

    if (!e.target.checked) {
      setShowDateInput(false); 
    }
  };

  const minDate = new Date(stadium.fromdate)

  const maxDate = new Date(stadium.todate)

  const handleSetDate = async () => {
    setShowDateInput(true);
  };
  const isDateValid = (date : any) => {
  return date >= minDate && date <= maxDate;
};
  const handleDateSelection = async () => {
    if (startDate && endDate) {
      const selectedStartDate = new Date(startDate);
      const selectedEndDate = new Date(endDate);

     if (isDateValid(selectedStartDate) && isDateValid(selectedEndDate)) {
      // setLoding(true);
      setChecked(true);
      setShowDateInput(false);
      setStartDate(minDate.toISOString().split('T')[0]);
      setEndDate(maxDate.toISOString().split('T')[0]);
    }else{
      toast.success("Selected dates are not within the available date range.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
      
    }else{
      setShowDateInput(false)
    }
  }
  useEffect(() => {
    const ownerDetails = async () => {
      const data = await api.post("/owner/fetchOwnerById", { ownerid });
      setOwner(data.data.fetch[0]);
    };
    ownerDetails();
  }, []);

  useEffect(() => {
    const stadiumDetails = async () => {
      const data = await api.post("/stadium/detaildView", { id });
      
      setStadium(data.data.fetchDetails);
    };
    stadiumDetails();
  }, []);

  return (
    <div>
      <UserNav />
      <div className="w-full flex h-screen">
        <div className="w-1/2 h-full">
          <div className="w-full h-10 flex justify-center">
            <p className="text-3xl font-extrabold">AGREEMENT</p>
          </div>
          <div className="w-full mt-5 bg-white rounded-2xl shadow-2xl h-[33.5rem]">
            <p>
              This Stadium Booking Agreement is entered into between Stadium
              Owner {owner?.ownername} and Booking Party's {username} on{" "}
              {stadium?.fromdate} To {stadium.todate}
            </p>
            <p className="mt-3"> Stadium Name: {stadium.stadiumname}</p>
            <p>Match Name: {stadium.sportstype} Match</p>
            <p>Date of Booking: {stadium.fromdate}</p>
            <p>End of Booking: {stadium.todate}</p>
            <p>Rental Fee: {stadium.price}</p>

            <p className="font-extrabold ">1.Payment Terms</p>

            <p>
              1. The Booking Party agrees to pay the full rental fee specified
              above to the Stadium Owner prior to the event/match.
            </p>
            <p>
              2. There is no refund or cancelation in the case of rent payment
            </p>

            <p className="font-extrabold">2.Liability</p>

            <p>
              The Booking Party assumes full responsibility for any damage or
              loss of property during the stadium booking period and shall be
              liable for any associated repair or replacement costs.
            </p>

            <p className="mt-7 font-semibold">
              {" "}
              This Agreement constitutes the entire agreement between the
              Stadium Owner and the Booking Party and supersedes all prior
              agreements and understandings, whether written or oral.
            </p>
            <div>
             
              <input
                type="checkbox"
                checked={checked}
                onChange={handleSetDate}
              />
              <label htmlFor="checkbox" onChange={handleSetDate}>
                Agree Conditions
              </label>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full ">
          <div className="w-full h-10 flex  justify-center ">
            <p className="text-3xl font-extrabold">RENT DETAILS</p>
          </div>
          <div className=" flex justify-center mt-5  bg-white    w-full h-[33.5rem]">
            <div className="w-full flex  h-full">
              <div className="  flex-row justify-end items-end    w-11/12 h-full">
                <div className="w-full text-center  flex justify-end h-96 ">
                  <div className="mt-10 ">
          {showDateInput &&  (
      <div>
        <div className="flex justify-center bg-white rounded-t-lg text-center">
        <p className="font-mono text-lg">Select Date</p> 
        </div>
        <div className="flex justify-center text-center" >
          
      <input className="h-20"
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      
      />
      <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      />
      </div>
      <div className="flex  justify-center">
       <button className="bg-blue-300 w-[17rem] h-10 " onClick={handleDateSelection}>Submit Dates</button> 
      </div>
      
      </div>
      )}
      </div>
                  <div className="w-72 ml-7 h-72 rounded-lg mt-10 shadow-2xl bg-white">
                    <p className="font-extrabold mt-7 text-2xl">
                      {stadium?.stadiumname}
                    </p>
                    <p className="mt-6 font-mono">
                      {stadium?.fromdate} -- {stadium.todate}
                    </p>
                    <p className="mt-6">{stadium.location}</p>
                    <p className="mt-6">{stadium.sportstype}</p>
                    <p className="mt-6">₹{stadium.price}</p>
                  </div>
                </div>
                {checked ? (
                  <div className="w-[full] text-center rounded-xl  text-lg font-semibold bg-white shadow-2xl h-32">
                    <p>Rent Amount Pay Using Paypal</p>
                    <span className="mt-10">
                      {" "}
                      <div>
                        <ToastContainer />
                        <PayPalScriptProvider
                          options={{
                            clientId: process.env
                              .REACT_APP_PAYPAL_SECRETE as string,
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
                                      value: stadium?.price,
                                    },
                                  },
                                ],
                              });
                            }}
                            onApprove={async (data: any, actions: any) => {
                              return actions.order

                                .capture()
                                .then(async function () {
                                

                                  const orderId = data?.orderID;
                                  const stadiumId = stadium?._id;
                                  const stadiumPrice = stadium?.price;
                                  const date = new Date().toLocaleString();
                                 

                                  const emailId = JSON.parse(
                                    localStorage.getItem("user") as string
                                  );
                                  const email = emailId.LoginCheck.email;
                                 
                                  
                                  const update = await api.post(
                                    "/userPayment",
                                    {
                                      stadiumId,
                                      orderId,
                                      email,
                                      userId,
                                      stadiumPrice,
                                      date,
                                      startDate,
                                      endDate
                                    }
                                  );
                                 
                                  const ownerUpdate = await api.post(
                                    "/owner/ownerPayment",
                                    {
                                      stadiumId,
                                      orderId,
                                      ownerId,
                                      userId,
                                      stadiumPrice,
                                      date,
                                      startDate,
                                      endDate
                                    }
                                  );
                                 
                                  const changeStatus = await api.post(
                                    "/notification/updateStatusByUser",
                                    { ownerId, userId }
                                  );
                              

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
                      </div>{" "}
                    </span>
                  </div>
                ) : (
                  <div className="w-[full] text-center rounded-xl  text-lg font-semibold bg-white shadow-2xl h-32">
                    <p className="pt-10">
                      Agree terms and conditions for continue payment
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPayment;
