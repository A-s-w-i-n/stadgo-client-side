import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import UserPremium from "../payment/userPremium";
import api from "../../servises/api/axios interceptor ";
// import { userData } from "../../domain/modals/userData";
import MainPagenav from "../navbar/mainPagenav";

const UserHome: React.FC = () => {
  const navigate = useNavigate();
  // const [usersPremium, setUserPremium] = useState(false);
  // const [checkDetail, setCheckDetail] = useState<userData>();
  // const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // const openPaymentModal = () => {
  //   setIsPaymentModalOpen(true);
  // };

  // const closePaymentModal = () => {
  //   setIsPaymentModalOpen(false);
  // };
  const emaiId = JSON.parse(localStorage.getItem("user") as string);
  const email = emaiId.LoginCheck.email;

  const handleFetchUser = async (e: React.FormEvent) => {
    e.preventDefault();

    //   if (checkDetail) {
    //     setUserPremium(false);
    //     navigate("/stadiumList");
    //   } else {
    //     openPaymentModal();
    //     setUserPremium(true);
    //   }
  };

  // const genarateSuccess = (succ : any)=>toast.success(succ,{
  //  autoClose : 2000,
  //  position : toast.POSITION.TOP_RIGHT
  // })

  // useEffect(() => {
  //   api.post("/fetchUsers", { email }).then((fetchdata) => {
  //     setCheckDetail(fetchdata.data.userDetail.premium);
  //   });
  // }, []);

  const handleUserOrgCheck = async () => {

    const { data } = await api.post("/org/fetchOrg", { email });

    if (data.fetchOrg == null) {
      navigate("/orgDetail");
    } else {
      navigate("/stadiumList");
    }
  };

  return (
    <div>
      <form onSubmit={handleFetchUser}>
        <div>
          <div>
            <div className="lg:w-full md:w-1/2 sm:w-2/3  ">
              <MainPagenav />
            </div>
            <div className="lg:h-screen  lg:w-full  md:flex  md:w-[44rem] sm:grid      justify-center">
              <div className="lg:w-1/2   lg:flex md:flex md:1/4     items-center` justify-center">
                <div className="lg:w-full  lg:mt-20 sm:mt-10   md:flex-col ">
                  <img
                    className=" w-full object-cover"
                    src="/mainImages/userHome.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="lg:w-1/2 lg:h-screen grid  sm:w-2/3     items-center">
                <div className=" w-[40rem] h-30 lg:mt-24   sm:mt-1" >
                  <p className="font-serif object-cover md:text-3xl lg:ml-0 md:ml-0 sm:ml-10 lg:text-5xl sm:text-5xl">WELCOME TO STAD GO</p>
                  <p className="ml-2 mt-3 lg:ml-0 md:ml-0 sm:ml-10">EXPLORE THE STADIUM’S </p>
                  <button
                    className="rounded-full bg-black mt-4 px-6 py-3 lg:ml-0 md:ml-0 sm:ml-10 bottom-9 font-serif  text-lg"
                    onClick={handleUserOrgCheck}
                  >
                    {/* {checkDetail ?  */}
                   <p className="text-white"> Explore</p> 
                    {/* : "Buy Premium"} {""} */}
                  </button>
                </div>

                
               
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-11/12 max-w-md mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-xl font-semibold text-gray-800 ">
                Pay Using Paypal
              </h5>
              {usersPremium ? <UserPremium /> : null}
            </div>

            <button
              className="bg-cyan-300 px-3 py-2 rounded-lg"
              onClick={closePaymentModal}
            >
              close
            </button>
          </div>
        </div>
      )} */}
      <ToastContainer />
    </div>
  );
};

export default UserHome;
