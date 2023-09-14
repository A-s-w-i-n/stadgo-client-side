import React, { useState } from "react";
import MainPagenav from "../navbar/mainPagenav";
import { OrgDetail } from "../../domain/modals/organization";
import api from "../../servises/api/axios interceptor ";
import {  useNavigate } from "react-router-dom";

const OrgDetails: React.FC = () => {
  const navigate = useNavigate();

  const [orgDetail, setOrgDetail] = useState<OrgDetail>({
    organizationname: "",
    organizationtype: "",
    sportstype: "",
    country: "",
  });
  const addOrgDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrgDetail({ ...orgDetail, [e.target.name]: e.target.value });
  };

  const handleOrgDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { organizationname, organizationtype, sportstype, country } =
        orgDetail;
      if (
        organizationname !== "" &&
        organizationtype !== "" &&
        sportstype !== "" &&
        country !== ""
      ) {
        const emailId = JSON.parse(localStorage.getItem("user") as string);
        const email = emailId.LoginCheck.email;
        // const userId = emailId.LoginCheck._id;
        console.log(emailId.LoginCheck.email);
        const { data } = await api.post("/org/orgDetails", {
          ...orgDetail,
          email,
        });

        if (data) {
          // api.post("/chat/accessChat", userId);
          navigate("/stadiumList");
        }
      }
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <div>
      <MainPagenav />
      <form action="" onSubmit={handleOrgDetails}>
        <div className="flex justify-center items-center h-screen">
          <div className="flex-1 h-full bg-white"></div>

          <div className="absolute bg-white p-4 w-[35rem] shadow-3xl rounded-2xl h-3/4">
            <p className="text-center text-2xl text-indigo">ORG DETAILS</p>
            <div className="flex gap-4 mt-8 ">
              {" "}
              {/* Use flex and add gap between inputs */}
              <div className="relative h-10 w-full min-w-[200px] mt-4">
                <input
                  className="peer h-full w-full rounded-[7px] border border-gray-200  border-t-transparent   bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  name="organizationname"
                  onChange={addOrgDetails}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Organization name
                </label>
              </div>
            </div>
            <div className="flex gap-4 mt-5 ">
              {" "}
              {/* Use flex and add gap between inputs */}
              <div className="relative h-10 w-full min-w-[200px] mt-5">
                <input
                  className="peer h-full w-full rounded-[7px] border border-gray-200     border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  name="organizationtype"
                  onChange={addOrgDetails}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none  absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Organization Type
                </label>
              </div>
            </div>
            <div className="flex gap-4 mt-5 ">
              {" "}
              {/* Use flex and add gap between inputs */}
              <div className="relative h-10 w-full min-w-[200px] mt-5">
                <input
                  className="peer h-full w-full rounded-[7px] border border-gray-200  border-t-transparent   bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  name="sportstype"
                  onChange={addOrgDetails}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Sports Type
                </label>
              </div>
            </div>
            <div className="flex gap-4 mt-5 ">
              {" "}
              {/* Use flex and add gap between inputs */}
              <div className="relative h-10 w-full min-w-[200px] mt-5">
                <input
                  className="peer h-full w-full rounded-[7px] border border-gray-200 border-t-transparent   bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  name="country"
                  onChange={addOrgDetails}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Country
                </label>
              </div>
            </div>
            <div className=" text-center mt-10">
              <button className="bg-blue-500 rounded-md px-3 py-2">
                submit
              </button>
            </div>
          </div>

          <div className="flex-1 h-full bg-gradient-to-r from-white bg-cyan-300"></div>
        </div>
      </form>
    </div>
  );
};

export default OrgDetails;
