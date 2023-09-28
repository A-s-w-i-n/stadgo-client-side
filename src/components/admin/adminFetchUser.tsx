import React, { useState, useEffect } from "react";
import  { apiAuth } from "../../servises/api/axios interceptor ";
import AdminHome from "./adminHome";
import { userData } from "../../domain/modals/userData";

const AdminFetchUser: React.FC = () => {
  const itemPerpage = 5;
  const [userData, setStudetData] = useState<userData[]>([]);
  const [currentPage, setCurrentpage] = useState<number>(1);

  const handleUserBlock = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();

    try {
      const userBlock = await apiAuth.post("/admin/blockUser", { id });
    } catch (error) {}
  };
  const handleUserUnblock = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    try {
      const UserUnblock = await apiAuth.post("/admin/unBlockUser", { id });
      

    } catch (error) {}
  };
  useEffect(() => {
    apiAuth
      .get("/admin/fetchUser")
      .then((fetchUser) => {
        setStudetData(fetchUser.data.usersFetch);
      })
      .catch(() => {});
  }, [handleUserUnblock, handleUserBlock]);

  //pagination part

  const startIndex: number = (currentPage - 1) * itemPerpage;
  const endIndex: number = startIndex + itemPerpage;
  const currentPageData: userData[] = userData.slice(startIndex, endIndex);

  const goToPage = (page: number): void => {
    setCurrentpage(page);
  };

  return (
    <div>
      <AdminHome />
      <div className="flex flex-row w-screen ">
        <form action="">
          <div className="p-6  w-full">
            <div className="w-full ml-64 ">
              <table className="table-auto w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-4 py-2">No</th>
                    <th className="px-4 py-2">User</th>
                    <th className="px-4 py-2">Org Name</th>
                    <th className="px-4 py-2">Rented Stadium</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map((item, index) => (
                    <tr>
                      <td className="border px-4 py-2" key={index}>
                        {index + 1}
                      </td>
                      <td className="border px-4 py-2">{item.username}</td>
                      <td className="border px-4 py-2">a</td>
                      <td className="border px-4 py-2">a</td>
                      <td className="border px-4 py-2">a</td>
                      <td className="border px-4 py-2">
                        {item.isblocked ? (
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={(e) => handleUserUnblock(e, item._id)}
                          >
                            Unblock
                          </button>
                        ) : (
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={(e) => handleUserBlock(e, item._id)}
                          >
                            block
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

        {currentPage < Math.ceil(userData.length / itemPerpage) && (
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

export default AdminFetchUser;
