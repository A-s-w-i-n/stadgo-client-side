import { useState, useEffect } from "react";
import OwnerNav from "../navbar/ownerNav";
import { stadim } from "../../domain/modals/stadium";
import api from "../../servises/api/axios interceptor ";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
// import { AiOutlineMenu } from "react-icons/ai";
// import { useDispatch } from "react-redux";
// import { ownerLogged } from "../../Redux/owner/ownerSlice";
// import Loader from "../loader/loader";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { ownerLogged } from "../../Redux/owner/ownerSlice";
import { toast, ToastContainer } from "react-toastify";

const OnwerstadiumList = () => {
  // const dispatch = useDispatch();
  const [stadiumData, setStadiumData] = useState<stadim[]>([]);
  const dispatch = useDispatch();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  // const [loding,setLoding] = useState<boolean>(true)
  const navigate = useNavigate();
  const [stadiumname, setEditStadiumName] = useState("");
  const [sportstype, setSportsType] = useState("");
  const [fromdate, setFromdate] = useState("");
  const [todate, setToDate] = useState("");
  const [price, setPrice] = useState("");
  // const [image,setImage] = useState([""])
  const [discription, setDiscription] = useState("");
  const [id, setId] = useState("");

  // const [selectedMainImages, setSelectedMainImages] = useState<{
  //   [stadiumId: string]: string;
  // }>(
  //   {}
  // );
  const handleModalOpen = () => {
    setIsPaymentModalOpen(true);
  };
  const handleModalClose = () => {
    setIsPaymentModalOpen(false);
  };

  // const handleFetch = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setStadiumData({ ...stadiumData, [e.target.name]: e.target.value });
  // };
  // const handleFetchStadium = async (e: React.FormEvent) => {
  //   e.preventDefault();
  // const stadiumname =

  // const editStadiumDetail = (e:React.ChangeEvent<HTMLInputElement>)=>{

  // }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const emailId = JSON.parse(localStorage.getItem("owner") as string);
  const emailCheck = emailId.OwnerLoginCheck;
  const email = emailCheck.email;
  const ownerid = emailCheck._id;

  const fetchData = () => {
    api
      .post("/stadium/fetchStadium", { email })
      .then((fetchStadium) => {
        setStadiumData(fetchStadium.data.fetchStadiumData);
        setEditStadiumName(fetchStadium.data.fetchStadiumData.stadiumname);
        setSportsType(fetchStadium.data.fetchStadiumData.sportstype);
        setFromdate(fetchStadium.data.fetchStadiumData.fromdate);
        setToDate(fetchStadium.data.fetchStadiumData.todate);
        setPrice(fetchStadium.data.fetchStadiumData.price);
        setDiscription(fetchStadium.data.fetchStadiumData.discription);
        setId(fetchStadium.data.fetchStadiumData[0]._id);

        dispatch(
          ownerLogged({
            ownerId: ownerid,
            stadiumId: fetchStadium.data.fetchStadiumData[0]._id,
          })
        );
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchData();
  }, []);
  const updateStadiumList = async () => {
    if (new Date(fromdate) >= new Date(todate)) {
      toast.error("End date must be greater than start date", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (
      stadiumname?.trim() === "" ||
      sportstype?.trim() === "" ||
      fromdate?.trim() === "" ||
      todate?.trim() === "" ||
      price?.trim() === "" ||
      discription?.trim() === ""
    ) {
      toast.error("All fields are required", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (parseFloat(price) <= 0) {
      toast.error("Price must be greater than zero", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    await api.post("/stadium/editStadium", {
      id,
      stadiumname,
      sportstype,
      fromdate,
      todate,
      price,
      discription,
    });
    fetchData();
    handleModalClose();
  };

  if (stadiumData) {
    navigate("/owner/stadiumlist");
  }

  // const handleMainImageClick = (stadiumId: string, imageUrl: string) => {
  //   setSelectedMainImages((prevImages) => ({
  //     ...prevImages,
  //     [stadiumId]: imageUrl,
  //   }));
  // };

  return (
    <div className="h-screen w-screen">
      {/* {loding&&<Loader/>} */}
      <OwnerNav />
      <ToastContainer />

      {stadiumData.map((item) => (
        <div className="  h-screen  object-cover   relative flex w-full  flex-row  bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative      w-full h-screen  overflow-hidden   bg-white bg-clip-border text-gray-700">
            <Slider {...settings}>
              {item.image && (
                <Slider {...settings}>
                  <div>
                    <img
                      src={item.image[0]}
                      alt=""
                      className="w-full object-cover  h-full "
                    />
                  </div>
                  <div>
                    <img
                      src={item.image[1]}
                      alt=""
                      className="w-full object-cover   h-full"
                    />
                  </div>
                  <div>
                    <img
                      src={item.image[2]}
                      className="w-full object-cover   h-full"
                    />
                  </div>
                </Slider>
              )}
              {/* Other slider items */}
            </Slider>
          </div>
          <div className="p-6  backdrop-blur-sm  rounded-2xl  mt-12 absolute ml-16">
            <h4 className="mb-2  text-shadow  block font-sans text-[3rem] text-center  font-semibold leading-snug tracking-normal text-black dark:text-white  antialiased">
              {item.stadiumname.toLocaleUpperCase()}
            </h4>
            <div className="flex mb-3 mt-8">
              <p className="font-extrabold w-52 text-white text-xl">
                Maximum Capacity:
              </p>
              <p className="font-normal text-gray-800 dark:text-white ml-6">
                {item.maxcapacity}
              </p>
            </div>
            <div className="flex mb-3 mt-7">
              <p className="font-extrabold text-white w-40 text-xl ">
                Availabiltiy:
              </p>
              <p className="font-normal text-gray-800 dark:text-white ml-6">
                {item.fromdate} -- <span>{item.todate}</span>
              </p>
            </div>

            <div className="flex mb-3 mt-7">
              <p className="font-extrabold text-white w-40 text-xl">
                Locatoin:
              </p>
              <p className="font-normal text-gray-800 dark:text-white ml-6">
                {item.location}
              </p>
            </div>
            <div className="flex mb-3 mt-7">
              <p className="font-extrabold text-white w-40 text-xl">Price:</p>
              <p className="font-normal text-gray-800 dark:text-white ml-6">
                ₹{item.price}
              </p>
            </div>
            <div className="flex mb-3 mt-7">
              <p className="font-extrabold text-white w-40 text-xl">
                Discription:
              </p>
              <p className="font-normal text-gray-800 dark:text-white ml-6">
                {item.discription}
              </p>
            </div>
            {isPaymentModalOpen && (
              <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg w-11/12 max-w-md mx-auto p-6">
                  <div className="flex text-center justify-center items-center mb-4">
                    <h5 className="text-xl text-center font-semibold text-gray-800 ">
                      EDIT STADIUM DETAILS
                    </h5>
                  </div>
                  {stadiumData.map((item) => (
                    <div>
                      <div className="mt-3">
                        Stadium Name :{" "}
                        <input
                          type="text"
                          placeholder={item.stadiumname}
                          onChange={(e) => setEditStadiumName(e.target.value)}
                        />
                      </div>
                      <div className="mt-3">
                        Sports Type :{" "}
                        <input
                          type="text"
                          placeholder={item.sportstype}
                          onChange={(e) => setSportsType(e.target.value)}
                        />
                      </div>
                      <div className="mt-3">
                        From Date :{" "}
                        <input
                          type="date"
                          placeholder={item.fromdate}
                          onChange={(e) => setFromdate(e.target.value)}
                        />
                      </div>
                      <div className="mt-3">
                        To date :{" "}
                        <input
                          type="date"
                          placeholder={item.todate}
                          onChange={(e) => setToDate(e.target.value)}
                        />
                      </div>
                      <div className="mt-3">
                        Price :{" "}
                        <input
                          type="text"
                          placeholder={item.price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="mt-3 truncate">
                        Discription :{" "}
                        <input
                          type="text"
                          placeholder={item.discription}
                          onChange={(e) => setDiscription(e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center mt-4">
                    {" "}
                    {/* Add this div for center alignment */}
                    <button
                      className="bg-cyan-300 px-3 py-2 rounded-lg"
                      onClick={updateStadiumList}
                    >
                      APPLY
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex item-end justify-end">
              <p className="text-white text-4xl" onClick={handleModalOpen}>
                <AiOutlineEdit />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OnwerstadiumList;
