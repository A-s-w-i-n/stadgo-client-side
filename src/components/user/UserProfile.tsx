import React, { useEffect, useRef, useState } from "react";
import UserNav from "../navbar/userNav";
import api from "../../servises/api/axios interceptor ";
import { OrgDetail } from "../../domain/modals/organization";
import axios from "axios";
import { GrDocumentUpdate } from "react-icons/gr";
import Loader from "../loader/loader";

import { stadim } from "../../domain/modals/stadium";

const UserProfile = () => {
  const [datas, setData] = useState<OrgDetail | null>(null);
  const [rentalDetails, SetRentalDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Rental, setRental] = useState<any>();
  const [url, setUrl] = useState("");
  const [stadiumDetail,setStadiumDetail] = useState<any>() 
  const [image, setImage] = useState("");
  const fileInputRef: any = useRef(null);
  const [loding, setLoding] = useState<boolean>(false);
  const user = JSON.parse(localStorage.getItem("user") as string);
  const check = user.LoginCheck;
  const email = user.LoginCheck.email;

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleClodeModal = () => {
    setIsModalOpen(false);
  };

  const organizationModalOpen =()=>{
   
  }
  const organizationModalclose =()=>{
   
  }
  const userIdFind = JSON.parse(localStorage.getItem("user") as string);

  const id = userIdFind.LoginCheck._id;

  const handleFecthOrg = async () => {
    const { data } = await api.post("/org/fetchOrg", { email });
    setData(data.fetchOrg);
  };
  const handleProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const formData = new FormData();
      const imageUrl = [];
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        formData.append("file", file);
        formData.append("uplode_preset", "stadGOimage");
        try {
          setLoding(true);
          const result = await axios.post(
            "https://api.cloudinary.com/v1_1/dkuqvuhss/image/upload?upload_preset=stadGOimage",
            formData
          );
          imageUrl.push(result.data.secure_url);
          setUrl(result.data.secure_url);
          updateProfile();
          setLoding(false);
        } catch (error) {}
      }
    }
  };
  const updateProfile = async () => {
    if (url && id) {
      const data = await api.post("/userProfileImage", { id, url });
      setLoding(true);

      if (data) {
        setImage(data.data.uplodeImg.profileImg);

        fetchProfile();
      }
    }
  };
  const handleSvgClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    updateProfile();
  }, [url]);

  const fetchProfile = async () => {
    const data = await api.post("/fetchProfileImg", { id });
    setImage(data.data.findImg.profileImg);
    setLoding(false);
  };
  useEffect(() => {
    const userDetails = async () => {
      const data = await api.post("/fetchUsers", { email });
      SetRentalDetails(data.data.userDetail.paymentDetails);
    };
    userDetails();
  }, []);

  const RentedStadium = async (orderId: any,id : any) => {
    const datas = await api.post('/stadium/detaildView',{id})
    setStadiumDetail(datas.data.fetchDetails)
    
    
    const data = await api.post("/fetchUsers", { email });
    const detail = data.data.userDetail.paymentDetails;
    detail.map((item: any) => {
      if (item.orderId == orderId)
        setRental(data.data.userDetail.paymentDetails);
      const stadium = data.data.userDetail.paymentDetails[0].stadiumId

      ;
      // console.log(data.data.userDetail.paymentDetails[0].stadiumId);
      
    });
    handleModalOpen();
  };
  const organizationEdit = () =>{
    organizationModalOpen()
  }
  useEffect(() => {
    fetchProfile();
    handleFecthOrg();
  }, []);
  return (
    <div>
      {loding && <Loader />}
      <UserNav />
      <div className="w-full flex flex-col lg:flex-row md:flex-row sm:flex-col">
        <div
          className="flex items-center justify-center cursor-pointer  w-40 mb-6 bg-black h-10 mt-10 ml-5 rounded-lg "
          onClick={handleSvgClick}
        >
          <GrDocumentUpdate style={{ width: "16px" }} />
          <span className="ml-3 text-white"> Upload Profle </span>
          <div className="ml-3 p-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors duration-300">
            <input
              type="file"
              accept="image/*" // Modify this to specify the allowed file types
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleProfileImageChange}
            />
          </div>
        </div>
        <div className="w-10 h-10">
          {/* <input
            className="peer h-full w-full rounded-[7px] border border-gray-200  border-t-transparent   bg-transparent px-3  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 opacity-20  focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            size={20}
            type="file"
            multiple
            name="image"
            onChange={handleProfileImageChange}
          /> */}
        </div>
        <div className="bg-gray-400 bg-opacity-20 w-full lg:w-10/12 md:w-10/12  sm:w-full mt-3 rounded-xl ml-10 h-[36rem] m flex">
          <div className="w-[30%] p-5">
            <div className="relative mt-1 h-[540px] flex w-[30rem]  z-[997] flex-col jus rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className=" flex relative ml-24  mx-4 mt-6 h-56 w-72 items-center justify-center overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                <img src={image} alt="img-blur-shadow" className="h-56 w-72" />
                
              </div>
              <div className="p-6">
                <h5 className="mb-2 text-center block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  Profile
                </h5>
                <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                  <span className="font-extrabold ">Name : </span>{" "}
                  {check.firstname + " " + check.lastname}
                </p>
                <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                  <span className="font-extrabold ">Email : </span>{" "}
                  {check.email}
                </p>
                <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                  <span className="font-extrabold ">Phone : </span>{" "}
                  {check.phone}
                </p>
              </div>
              <div className="flex p-6 items-center justify-center pt-0"></div>
            </div>
          </div>
          <div className="w-[35%] ml-48 p-4 pt-6">
  
            <div className="relative ml-6 flex w-96 h-64 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="p-6 ">
                <h5 className="mb-2 block text-center font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  MY ORGANIZATION
                </h5>
                <div>
                  <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                    <span className="font-extrabold ">
                      organization Name :{" "}
                    </span>
                    {datas?.organizationname}
                  </p>
                  <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                    <span className="font-extrabold ">organization Type : </span>{" "}
                    {datas?.sportstype}
                  </p>
                  <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                    <span className="font-extrabold ">sports Type : </span>{" "}
                    {datas?.country}
                  </p>
                </div>
              </div>
              <div className="p-6 justify-center items-center flex pt-0">
                {/* <button
                  className="select-none rounded-lg bg-black  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  data-ripple-light="true"
                onClick={organizationEdit}>
                  Edit
                </button> */}
              </div>
            </div>
            {rentalDetails ? (
              <div className="relative ml-6 mt-7 flex w-96 h-64 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="p-6">
                <h5 className="mb-2 block text-center font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  PURCHASED STADIUMS
                </h5>
                <div className="overflow-y-auto h-40">
                  {rentalDetails.map((item: any) => (
                    <div key={item?.orderId} className="flex gap-6 w-full">
                      <div>
                        <p className="mt-2">ORDER ID : {item?.orderId}</p>
                      </div>
                      <div>
                        <button
                          className="bg-black text-white hover:bg-transparent hover:border hover:border-black hover:text-black px-3 py-2 mt-4 rounded-md"
                          onClick={() => RentedStadium(item.orderId,item.stadiumId)}
                        >
                          DETAILS
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            ) : (
              <div className="border flex justify-center items-center text-center  w-[24rem] rounded-xl bg-white shadow-2xl h-[16rem] mt-7 ml-6">
                <p className="text-center">CURRENTLY NO RENTAL DETAILS</p>
              </div>
            )}
          </div>
          
        </div>
        <div>
        {isModalOpen &&
                  Rental.map((item: any) => (
                    <div className="fixed inset-0 flex items-center justify-center z-[999] bg-transparent bg-opacity-50 ">
                      <div className="bg-white rounded-lg w-full shadow-xl shadow-transparent  max-w-md p-6">
                        <div className="mt-3 font-extrabold">
                          Stadium Name :{" "}
                          <span className="font-semibold">{stadiumDetail?.stadiumname}</span>
                        </div>
                        <div className="mt-3 font-extrabold">
                          Price :{" "}
                          <span className="font-semibold">
                            {item?.stadiumPrice}
                          </span>
                        </div>
                        <div className="mt-3 font-extrabold">
                          From Date :{" "}
                          <span className="font-semibold">{item?.startDate}</span>
                        </div>
                        <div className="mt-3 font-extrabold">
                          To date :{" "}
                          <span className="font-semibold">{item?.endDate}</span>
                        </div>
    
                        <div className="mt-3 font-extrabold">
                          Rental Date :{" "}
                          <span className="font-semibold">{item?.date}</span>
                        </div>
                        <div className="mt-3 font-extrabold">
                          Located In:{" "}
                          <span className="font-semibold">{stadiumDetail.location}</span>
                        </div>
    
                        <div className="flex justify-center items-center">
                          <button
                            className="w-24 h-10 bg-cyan-300 rounded-lg text-center"
                            onClick={handleClodeModal}
                          >
                            close
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
