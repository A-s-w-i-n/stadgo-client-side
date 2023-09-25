import React, { useState, useEffect } from "react";
import UserNav from "../navbar/userNav";
import { stadim } from "../../domain/modals/stadium";
import api from "../../servises/api/axios interceptor ";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import  Loader from '../loader/loader'
import {FiSearch}  from 'react-icons/fi'
const UserSatdiumList = () => {
  // const { email }: any = useSelector((state: any) => state.user);
  const [location, setLocation] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [stadiumData, setStadiumData] = useState<stadim[]>([]);
  const [loading,setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStadiums, setFilteredStadiums] =
    useState<stadim[]>(stadiumData);
  const navigate = useNavigate();
  

  const fetchStadium = () => {
    api
      .get("/stadium/fetchStadiumList")
      .then((stadiumList) => {
        setStadiumData(stadiumList.data.fetchList);
        setLoading(false)
      })
      .catch(() => {});
  };
  
  useEffect(() => {
    const filtered = stadiumData.filter((item) =>
    item.stadiumname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStadiums(filtered);
  }, [searchTerm, stadiumData]);
  useEffect(() => {
    fetchStadium();
  }, []);
  const handleLocationFilter =async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.selectedOptions;
    setLocation(filter[0].value);
    if(filter[0].value == "option1"){
      fetchStadium();
    }else{
      const stadiumlocationFilter = await api.post('/stadium/stadiumLocationFilter',{location})
      setFilteredStadiums(stadiumlocationFilter.data.filter)
    }
  };

  const handleFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.selectedOptions;

    if (filter[0].value == "option1") {

      fetchStadium();
    } else {
      setSelectedFilter(filter[0].value);
      const [minValue, maxValue] = filter[0].value.split(" - ");

      const firstValue = minValue;
      const secondValue = maxValue;
      const filterdata = await api.post("/stadium/stadFilter", {
        firstValue,
        secondValue,
      });
      setFilteredStadiums(filterdata.data.filter);
    }
  };


  return (
    <div className=''>
      {<Loader/>&&loading}
      <UserNav />
      <form>
        <div className="relative w-full  p-2 flex justify-between items-end ">
        <div className="flex items-center">
  <select
    className="mr-4 px-2 py-1 border rounded-md"
    onChange={handleFilter}
  >
    <option value="option1">Capacity</option>
    <option value="10000 - 30000">10000 - 30000</option>
    <option value="30000 - 50000">30000 - 50000</option>
    <option value="50000 - 70000">50000 - 70000</option>
    <option value="70000 - 100000">70000 - 100000</option>
  </select>
  <select
    className="px-2 py-1 border rounded-md"
    onChange={handleLocationFilter}
  >
    <option value="option1">ALL</option>
    {stadiumData.map((item) => (
      <option value={item.location}>{item.location}</option>
    ))}
  </select>
</div>
<div className="w-100 h-10  flex justify-end items-center">
  <FiSearch/>
          <input
            type="search"
            id="default-search"
            className="block w-[20rem] h-10 p-4  text-sm  text-black shadow-2xl rounded-lg  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Stadiums"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />

</div>
          
        </div>
      </form>
      <div className="flex   flex-wrap justify-center mt-5 md:ml-10 md:mr-10">
        {filteredStadiums?.length > 0 ? (
          filteredStadiums?.map((item) => (
            <div className="relative  w-96 mx-4 my-6 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="relative  h-40 overflow-hidden rounded-t-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                <img
                  className="w-full"
                  src={item.image[0]}
                  alt="profile-picture"
                />
              </div>
              <div className="p-6 text-center">
                {" "}
                <h4 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {item.stadiumname}
                </h4>
                <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-700 antialiased">
                  Maximum Capacity: {item.maxcapacity}
                </p>
              </div>
              <div className="flex justify-center gap-7 p-6 pt-2">
                <button
                  className="bg-cyan-300 rounded-xl px-5 py-3"
                  onClick={() => navigate(`/detailedView/${item._id}`)}
                >
                  Check Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 mt-10">
            <img src="/mainImages/noResultFound.png" alt="" className="object-cover" />
          </p>
        )}
      </div>
    </div>
  );
};

export default UserSatdiumList;
