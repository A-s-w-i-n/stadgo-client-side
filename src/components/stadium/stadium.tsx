import React, { useState, useCallback } from "react";
import MainPagenav from "../navbar/mainPagenav";
import  { apiAuth } from "../../servises/api/axios interceptor ";
import { stadim } from "../../domain/modals/stadium";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Stadium = () => {
  const navigate = useNavigate();

  const [stadium, setStadium] = useState<stadim>({
    stadiumname: "",
    maxcapacity: "",
    sportstype: "",
    fromdate: "",
    todate: "",
    price: "",
    image: [],
    discription: "",
    location: "",
    email: " ",
    id: "",
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      const imageUrl = [];
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append("file", file);
        formData.append("uplode_preset", "stadGOimage");

        try {
          const result = await axios.post(
            "https://api.cloudinary.com/v1_1/dkuqvuhss/image/upload?upload_preset=stadGOimage",
            formData
          );


          imageUrl.push(result.data.secure_url);

          setStadium({ ...stadium, image: imageUrl });
        } catch (error) {
        }
      }
    }
  };
  const addStadium = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStadium({ ...stadium, [e.target.name]: e.target.value });
  };
  const handleAddStadium = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const {
          stadiumname,
          maxcapacity,
          sportstype,
          fromdate,
          todate,
          price,
          image,
          discription,
          location,
        } = stadium;

        if (
          stadiumname !== "" &&
          maxcapacity !== "" &&
          sportstype !== "" &&
          fromdate !== "" &&
          todate !== "" &&
          price !== "" &&
          discription !== "" &&
          location !== "" &&
          image.length > 0
        ) {
          const emialId = JSON.parse(localStorage.getItem("owner") as string);
          const email = emialId.OwnerLoginCheck.email;

          const id = emialId.OwnerLoginCheck._id;

          const { data } = await apiAuth.post("/stadium/staiumDetails", {
            ...stadium,
            email,
            id,
          });
          if (data) {
            navigate("/owner/stadiumlist");
          }
        }
      } catch (error) {}
    },
    [stadium]
  );

  return (
    <div>
      <MainPagenav />
      <form action="" onSubmit={handleAddStadium} encType="multipart/form-data">
        <div className="flex justify-center items-center h-screen">
          <div className="flex-1 h-full bg-white"></div>

          <div className="absolute bg-white p-4 w-100 shadow-3xl rounded-2xl h-3/4">
            <p className="text-center text-2xl text-indigo">STADIUM DETAILS</p>
            <div className="flex gap-4 mt-5 ">
              {" "}
              {/* Use flex and add gap between inputs */}
              <div className="relative h-10 w-full min-w-[200px] mt-4">
                <input
                  className="peer h-full w-full rounded-[7px] border border-gray-200  border-t-transparent   bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  name="stadiumname"
                  onChange={addStadium}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Stadium name
                </label>
              </div>
              <div className="relative h-10 w-full min-w-[200px] mt-4">
                <input
                  className="peer h-full w-full rounded-[7px] border border-gray-200  border-t-transparent   bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  name="maxcapacity"
                  onChange={addStadium}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Max Capacity
                </label>
              </div>
            </div>
            <div className="flex gap-4 mt-3 ">
              {" "}
              {/* Use flex and add gap between inputs */}
              <div className="relative h-10 w-full min-w-[200px] mt-5">
                <input
                  className="peer h-full w-full rounded-[7px] border border-gray-200     border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  name="sportstype"
                  onChange={addStadium}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none  absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Sports type
                </label>
              </div>
              <div className="relative h-10 w-full min-w-[200px] mt-5">
                <input
                  className="peer h-full w-full rounded-[7px] border border-gray-200 border-t-transparent   bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  name="location"
                  onChange={addStadium}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Location
                </label>
              </div>
            </div>
            <div className="flex gap-4 mt-3 ">
              {" "}
              {/* Use flex and add gap between inputs */}
              <div className="relative h-10 w-full min-w-[200px] mt-5">
                <input
                  className="peer h-full w-full rounded-[7px] border border-gray-200  border-t-transparent   bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  name="price"
                  onChange={addStadium}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Price
                </label>
              </div>
              <div className="relative h-10 w-full min-w-[200px] mt-5">
                <input
                  className="peer h-full w-full rounded-[7px] border border-gray-200  border-t-transparent   bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  type="file"
                  multiple
                  name="image"
                  onChange={handleImageChange}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Image
                </label>
              </div>
            </div>
            <div className="flex gap-4 mt-3 ">
              {" "}
              {/* Use flex and add gap between inputs */}
              <div className="relative h-10 w-full min-w-[200px] mt-5">
                <input
                  className="peer h-full w-full rounded-[7px] border border-gray-200     border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  name="fromdate"
                  type="date"
                  onChange={addStadium}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none  absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  From Date
                </label>
              </div>
              <div className="relative h-10 w-full min-w-[200px] mt-5">
                <input
                  className="peer h-full w-full rounded-[7px] border border-gray-200     border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  name="todate"
                  type="date"
                  onChange={addStadium}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none  absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  To date
                </label>
              </div>
            </div>
            <div className="flex gap-4 mt-3">
              <div className="relative h-10 w-full min-w-[200px] mt-5">
                <input
                  className="peer h-full w-full rounded-[7px] border border-gray-200 border-t-transparent   bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  name="discription"
                  onChange={addStadium}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Description
                </label>
              </div>
            </div>
            <div className=" text-center mt-6">
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

export default Stadium;
