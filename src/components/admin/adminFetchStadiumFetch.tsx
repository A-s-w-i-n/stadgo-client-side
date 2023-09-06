import React, { useState, useEffect } from "react";
import  { apiAuth } from "../../servises/api/axios interceptor ";
import AdminHome from "./adminHome";
import { stadim } from "../../domain/modals/stadium";

const AdminFetchStadium: React.FC = () => {
  const itemPerpage = 8;

  const [ownerData, setOnwerData] = useState<stadim[]>([]);
  const [currentPage, setCurrentpage] = useState<number>(1);

  useEffect(() => {
    apiAuth
      .get("/stadium/fetchStadiumList")
      .then((fetchOwner) => {
        console.log(fetchOwner.data.fetchList);

        setOnwerData(fetchOwner.data.fetchList);
      })
      .catch(() => {});
  }, []);

  // pagination part

  const startIndex: number = (currentPage - 1) * itemPerpage;
  const endIndex: number = startIndex + itemPerpage;
  const currentPageData: stadim[] = ownerData.slice(startIndex, endIndex);

  const goToPage = (page: number): void => {
    setCurrentpage(page);
  };
  return (
    <div>
      <AdminHome />
      <div className="flex flex-row w-full bg-red-400 ">
        <form action="">
         
            <div className="w-[66rem] sm:w-[50rem] xl:w-[66rem] lg:w-[58rem] md:w-[40rem] ml-72 ">
              <table className="table-auto w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-4 py-2">No</th>
                    <th className="px-4 py-2">User</th>
                    <th className="px-4 py-2">Org Name</th>
                    <th className="px-4 py-2">Rented Stadium</th>
                    <th className="px-4 py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map((item, index) => (
                    <tr>
                      <td className="border px-4 py-2" key={index}>
                        {index + 1}
                      </td>
                      <td className="border px-4 py-2">{item.stadiumname}</td>
                      <td className="border px-4 py-2">{item.email}</td>
                      <td className="border px-4 py-2">{item.location}</td>
                      <td className="border px-4 py-2">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          
        </form>
      </div>

      <div className="flex items-center justify-center">
        {currentPage > 1 && (
          <button
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => goToPage(currentPage - 1)}
          >
            Previous
          </button>
        )}
        {/* {paginationControll()} */}

        {currentPage < Math.ceil(ownerData.length / itemPerpage) && (
          <button
            className="flex items-center justify-center px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminFetchStadium;
