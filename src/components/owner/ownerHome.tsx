import React, {  useEffect } from "react";
import MainPagenav from "../navbar/mainPagenav";
import { useNavigate } from "react-router-dom";
import api, { apiAuth } from "../../servises/api/axios interceptor ";
// import { stadim } from "../../domain/modals/stadium";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Paypal from "../payment/ownerPremium";
// import { ownerData } from "../../domain/modals/ownerData";

const OwnerHome = () => {
  const navigate = useNavigate();
  // const [OwnerPrimuim, setOnwerPrimium] = useState(false);

  // const [detailsCheck, setDetailsCheck] = useState<ownerData>();
  const userEmail = JSON.parse(localStorage.getItem("owner") as string);
  const emailId = userEmail.OwnerLoginCheck;
  const email = emailId.email;

 

  // const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // const openPaymentModal = () => {
  //   setIsPaymentModalOpen(true);
  // };

  // const closePaymentModal = () => {
  //   setIsPaymentModalOpen(false);
  // };

  const handleFetchDetail = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await api.post("/stadium/fetchStadium", { email });
   
    
    // if (detailsCheck) {
      // setOnwerPrimium(false);
      if(data.fetchStadiumData.length == 0){
        navigate('/stadiumDetails')
      }else {
        navigate("/owner/stadiumlist");
      }
    // } else {
      // openPaymentModal();
      // setOnwerPrimium(true);
    // }

    try {
    } catch (error) {
    }
  };

  useEffect(() => {
    apiAuth
      .post("/owner/fetchOwner", { email })
      .then((fetchData) => {
        // setDetailsCheck(fetchData.data.ownerDetail.premium);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <div>
        <form action="" onSubmit={handleFetchDetail}>
          <div>
            <MainPagenav />
          </div>
          <div className="h-screen flex  justify-center">
            <div className="w-1/2  flex  items-center` justify-center">
              <div className="mt-14 w-full ">
                <img
                  className=" w-11/12  object-cover "
                  src="\mainImages\ownerHome.png"
                  alt=""
                />
              </div>
            </div>
            <div className="w-1/2 h-screen flex ml-10  items-center">
              <div className="">
                <p className="font-serif text-5xl">WELCOME TO STUD GO</p>
                <p className="ml-2 mt-3">EXPLORE THE STADIUM’S </p>
              </div>
              <div className="absolute bottom-0 mb-48">
                <button
                  className="rounded-full fixed bg-cyan-300 hover:bg-cyan-400 px-6 py-3 mb-48 bottom-9 font-serif  text-lg"
                  onClick={handleFetchDetail}
                >
                  {/* {detailsCheck ?  */}
                  
                  Stadium
                   {/* "Buy Premium"} */}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* {isPaymentModalOpen && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-11/12 max-w-md mx-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-xl font-semibold text-gray-800 ">
                  Pay Using Paypal :
                </h5>
                <p className="text-red-500">$200</p>

                {OwnerPrimuim ? <Paypal /> : null}
              </div>

              <button
                className="bg-cyan-300 px-6 py-2 rounded-lg"
                onClick={closePaymentModal}
              >
                close
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default OwnerHome;
