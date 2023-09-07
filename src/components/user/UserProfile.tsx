import React, { useEffect, useRef, useState } from "react";
import UserNav from "../navbar/userNav";
import api, { apiAuth } from "../../servises/api/axios interceptor ";
import { OrgDetail } from "../../domain/modals/organization";
import axios from "axios";
import { GrDocumentUpdate } from "react-icons/gr";
import Loader from "../loader/loader";

const UserProfile = () => {
  const [datas, setData] = useState<OrgDetail | null>(null);
  const [rentalDetails, SetRentalDetails] = useState(true);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const fileInputRef: any = useRef(null);
  const [loding,setLoding] = useState<boolean>(false)
  const user = JSON.parse(localStorage.getItem("user") as string);
  const check = user.LoginCheck;
  const email = user.LoginCheck.email;

  console.log(SetRentalDetails);
  

  const userIdFind = JSON.parse(localStorage.getItem("user") as string);
  console.log(userIdFind.LoginCheck._id);

  const id = userIdFind.LoginCheck._id;

  const handleFecthOrg = async () => {
    const { data } = await api.post("/org/fetchOrg", { email });
    setData(data.fetchOrg);
    console.log(data.fetchOrg);
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
          setLoding(true)
          const result = await axios.post(
            "https://api.cloudinary.com/v1_1/dkuqvuhss/image/upload?upload_preset=stadGOimage",
            formData
            );
          console.log(result.data.secure_url);
          imageUrl.push(result.data.secure_url);
          setUrl(result.data.secure_url);
          updateProfile()
          setLoding(false)
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  const updateProfile = async () => {
    if(url&&id){
      console.log(url,"aa");
      console.log(id,"aa");
      console.log("jiiiii");
      
      const  data  = await api.post("/userProfileImage", { id, url });
      setLoding(true)

      if(data){
        
        setImage(data.data.uplodeImg.profileImg);
        console.log(data.data.uplodeImg);
        
        fetchProfile()
      }
      setLoding(false)
      console.log(data.data.uplodeImg.profileImg);
      console.log(data,"lllll");
    }
  };
  const handleSvgClick = () => {
    fileInputRef.current.click();
  };

  useEffect(()=>{
    updateProfile()
  },[url])

  const fetchProfile =async () =>{
   const data = await api.post("/fetchProfileImg",{id})
      setImage(data.data.findImg.profileImg)
      console.log(data.data.findImg.profileImg,"image");
    
  }
  
  useEffect(() => {

    fetchProfile()
    handleFecthOrg();
  }, []);
  return (
    <div>
      {loding && <Loader/>}
      <UserNav />
      <div className="bg-white  w-full h-screen  flex   ">
        <div
          className="flex items-center justify-center cursor-pointer  w-[10rem] mb-6 bg-cyan-300 h-10 mt-10 ml-5 rounded-lg fixed"
          onClick={handleSvgClick}
        >
          <GrDocumentUpdate style={{ width: "16px" }} />
          <span className="ml-3"> Upload Profle </span>
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
        <div className="bg-gray-400 bg-opacity-20 w-[68rem] fixed rounded-xl ml-48 h-[36rem] m flex">
          <div className="w-[30%] p-5">
            <div className="relative mt-1 h-[540px] flex w-100  flex-col jus rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className=" flex relative ml-24  mx-4 mt-6 h-56 w-72 items-center justify-center overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                <img
                  src={image}
                  alt="img-blur-shadow"
                  className="h-56 w-72"
                />
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
                    <span className="font-extrabold ">Name : </span>{" "}
                    {datas?.sportstype}
                  </p>
                  <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                    <span className="font-extrabold ">Name : </span>{" "}
                    {datas?.country}
                  </p>
                </div>
              </div>
              <div className="p-6 justify-center items-center flex pt-0">
                <button
                  className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  data-ripple-light="true"
                >
                  Details
                </button>
              </div>
            </div>
            {rentalDetails ? (
              <div className="border flex justify-center items-center text-center w-[24rem] rounded-xl bg-white shadow-2xl h-[16rem] mt-7 ml-6">
                <p className="text-center">
                  Currently There is No Rental Details
                </p>
              </div>
            ) : (
              <div className="relative ml-6 mt-7 flex w-96 h-64 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="p-6">
                  <h5 className="mb-2 block text-center font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    PURCHASED STADIUMS
                  </h5>
                  <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                    <span className="font-extrabold ">Name : </span> The place
                    is close to
                  </p>
                  <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                    <span className="font-extrabold ">Name : </span> The place
                    is close to
                  </p>
                  <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                    <span className="font-extrabold ">Name : </span> The place
                    is close to
                  </p>
                </div>
                <div className="p-6 justify-center items-start flex pt-0">
                  <button
                    className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    data-ripple-light="true"
                  >
                    Read More
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
