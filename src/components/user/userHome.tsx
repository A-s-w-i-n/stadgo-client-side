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
  console.log(email);

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
    console.log("hiii");

    const { data } = await api.post("/org/fetchOrg", { email });
    console.log(data);

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
            <div>
              <MainPagenav />
            </div>
            <div className="h-screen flex  justify-center">
              <div className="w-1/2  flex  items-center` justify-center">
                <div className="mt-20 w-full ">
                  <img
                    className=" w-full object-cover"
                    src="/mainImages/userHome.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-1/2 h-screen flex ml-10  items-center">
                <div className="">
                  <p className="font-serif text-5xl">WELCOME TO STAD GO</p>
                  <p className="ml-2 mt-3">EXPLORE THE STADIUM’S </p>
                </div>

                <div className="absolute bottom-48 mb-30">
                  <button
                    className="rounded-full fixed bg-cyan-300 hover:bg-cyan-300 px-6 py-3 mb-44  bottom-9 font-serif  text-lg"
                    onClick={handleUserOrgCheck}
                  >
                    {/* {checkDetail ?  */}
                    Explore
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
