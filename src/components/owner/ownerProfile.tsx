import  { useEffect, useState } from "react";
import OwnerNav from "../navbar/ownerNav";
import api from "../../servises/api/axios interceptor ";
import { stadim } from "../../domain/modals/stadium";
import { CgProfile } from "react-icons/cg";

const OwnerProfile = () => {
  const [stadiumDetail, setStadiumDetail] = useState<stadim>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incomeDetails,setIncomeDetails] = useState(true)
  const owner = JSON.parse(localStorage.getItem("owner") as string);
  console.log(owner);
  console.log(setIncomeDetails);
  

  const check = owner.OwnerLoginCheck;
  const email = check.email;


  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleClodeModal =()=>{
    setIsModalOpen(false)
  }
  const handleFetchStadium = async () => {
    const { data } = await api.post("/stadium/fetchStadium", { email });
    setStadiumDetail(data.fetchStadiumData[0]);
    console.log(data.fetchStadiumData, "aaa");
  };
  useEffect(() => {
    handleFetchStadium();
  }, []);


  return (
    <div>
      <OwnerNav />
      
      <div className="bg-white  w-full h-screen  flex   ">
        
        <div className="bg-gray-400 bg-opacity-20 w-[68rem] fixed rounded-xl ml-48 h-[36rem] m flex">
          <div className="w-[30%] p-5">
            <div className="relative mt-1 h-[540px] flex w-[30rem]  flex-col jus rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className=" flex relative ml-24  mx-4 mt-6 h-56 w-72 items-center justify-center overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                <img  src="/mainImages/defalt profile image.png" alt="img-blur-shadow" className="h-52 w-72 object-cover" />
              </div>
              <div className="p-6">
                <h5 className="mb-2 text-center block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  Profile
                </h5>

                <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                  <span className="font-extrabold ">Name : </span>{" "}
                  {(check.firstname + " " + check.lastname).toLocaleUpperCase()}
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
              
              <div className="flex p-6 items-center justify-center pt-0">
               
              </div>
            </div>
          </div>
          <div className="w-[35%] ml-48 p-4 pt-6">
            <div className="relative ml-6 flex w-96 h-64 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="p-6 ">
                <h5 className="mb-2 block text-center font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  STADIUM
                </h5>
                <div>
                  <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                    <span className="font-extrabold ">Stadium Name : </span>{stadiumDetail?.stadiumname}
                  </p>
                  <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                    <span className="font-extrabold ">Type : </span>{stadiumDetail?.sportstype}

                  </p>
                  <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                    <span className="font-extrabold ">Capacity : </span> {stadiumDetail?.maxcapacity}
                  </p>
                </div>
              </div>
              <div className="p-6 justify-center items-center flex pt-0">
                <button
                  className="select-none rounded-lg bg-cyan-300 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  data-ripple-light="true"
               onClick={handleModalOpen} >
                 FUll Details
                </button>
              </div>
            </div>
<div>
  {incomeDetails ?  <div className="relative ml-6 mt-7 flex w-96 h-64 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
  <div className="flex flex-col justify-center items-center h-full p-6">
    <p className="text-center">No Income Details Found</p>
  </div>
</div>

               :
            <div className="relative ml-6 mt-7 flex w-96 h-64 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="p-6">
                <h5 className="mb-2 block text-center font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  PURCHASED STADIUMS
                </h5>
                <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                  <span className="font-extrabold ">Name : </span> The place is
                  close to
                </p>
                <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                  <span className="font-extrabold ">Name : </span> The place is
                  close to
                </p>
                <p className="block font-sans text-center mt-4 text-base font-light leading-relaxed text-inherit antialiased">
                  <span className="font-extrabold ">Name : </span> The place is
                  close to
                </p>
              </div>

              <div className="p-6 justify-center items-start flex pt-0">
                <button
                  className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  data-ripple-light="true"
                >
                 Full Details
                </button>
                
               
              </div>
              </div>
}
              {isModalOpen &&
               <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg w-full max-w-md p-6">
                      <div className="mt-3 font-extrabold">
                        Stadium Name : <span className="font-semibold">{stadiumDetail?.stadiumname}</span>
                      </div>
                      <div className="mt-3 font-extrabold">
                        Sports Type : <span className="font-semibold">{stadiumDetail?.sportstype}</span>
                      </div>
                      <div className="mt-3 font-extrabold">
                        From Date :  <span className="font-semibold">{stadiumDetail?.fromdate}</span>
                      </div>
                      <div className="mt-3 font-extrabold">
                        To date :  <span className="font-semibold">{stadiumDetail?.todate}</span>
                      </div>
                      <div className="mt-3 font-extrabold">
                        Price :  <span className="font-semibold">{stadiumDetail?.price}</span>
                      </div>
                      <div className="mt-3 font-extrabold">
                        Discription :  <span className="font-semibold">{stadiumDetail?.discription}</span>
                      </div>
                     
                      <div className="flex justify-center items-center">
  <button className="w-24 h-10 bg-cyan-300 rounded-lg text-center"onClick={handleClodeModal}>close</button>
</div>

                    </div>
              </div>
}
            </div>
            
          </div>
          
        </div>
        
      </div>
      
    </div>
  );
};

export default OwnerProfile;
