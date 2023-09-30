import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import api from "../../servises/api/axios interceptor ";
// import { useNavigate } from "react-router-dom";
import { stadim } from "../../domain/modals/stadium";
import { ToastContainer, toast } from "react-toastify";
import OwnerNav from "../navbar/ownerNav";
import Loader from "../loader/loader";

const VideoUpload = () => {
  // const navigate = useNavigate();
  const [stadiumInfo, setStadiumInfo] = useState<stadim[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null | any>(null);
  const [uplodeVideo, setVideoUplode] = useState<string>("");
  const [uplodeVideoModal, setuplodeVideoModal] = useState(false);
  const [loding, setLoding] = useState<boolean>(false);

  const openUplodeVideoModal = () => {
    setuplodeVideoModal(true);
  };
  const closeUplodeVideoModal = () => {
    setuplodeVideoModal(false);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const maxSize = 25 * 1024 * 1024;
       if(file.size<=maxSize){

         setSelectedFile(e.target.files[0]);
         setLoding(true);
       }
      else {
        // File size exceeds the limit
        toast.error("File size exceeds the 25MB limit.", {
          position: "top-right",
          autoClose: 3000,
        });
      }

      setLoding(false);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      if (selectedFile.type.startsWith("video/")) {
        setLoding(true);

        try {
          await uploadVideoToS3(selectedFile);
          fetchVideo();
          closeUplodeVideoModal();
        } catch (error) {}
      } else {
        toast.error("Upload video formate", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };
  const uploadVideoToS3 = async (file: File) => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    });

    const params: any = {
      Bucket: process.env.REACT_APP_S3BUCKET_NAME,
      Key: `videos/${file.name}`,
      Body: file,
      ContentType: file.type,
    };

    try {
      setLoding(true);
      const response = await s3.upload(params).promise();
      setVideoUplode(response.Location);
      setLoding(false);
    } catch (error) {}
  };

  const emailId = JSON.parse(localStorage.getItem("owner") as string);
  const emailCheck = emailId.OwnerLoginCheck;
  const email = emailCheck.email;

  const fetchVideo = () => {
    api.post("/stadium/fetchStadium", { email }).then((result) => {
      setStadiumInfo(result.data.fetchStadiumData);
      // setLoding(false)
    });
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  const uplodeVideos = async () => {
    const maxSize = 25 * 1024 * 1024;
    if (selectedFile?.size <= maxSize) {
      handleUpload();
      const id = stadiumInfo[0]._id;
      if (uplodeVideo) {
        const uplode = await api.post("/owner/videoUplode", {
          uplodeVideo,
          id,
        });
        fetchVideo();
        if (uplode.status) {
          closeUplodeVideoModal();
          // stadiumInfo[0].video;
        }
      }
    } else {
      toast.error("File size exceeds the 25MB limit.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  // useEffect(()=>{

  // },[])

  return (
    <div>
      {loding && <Loader />}
      <OwnerNav />
      <ToastContainer />
      <div className="">
        {stadiumInfo.map((item) => (
          <div className="flex w-full h-full   ">
            <div className="  w-full     rounded ">
              <div className="lg:flex gap-3 h-[36rem] md:grid">
                <div className="flex">
                  <img
                    className="w-full rounded-2xl"
                    src={item.image[0]}
                    alt="Sunset in the mountains"
                  />
                </div>
                <div className="lg:flex md:grid">
                  <div className="lg:flex justify-betwee items-center    px-6 py-4 md:grid">
                    <div className="font-bold  text-xl text-center mb-2">
                      {item.stadiumname}
                      <div className=" items-center justify-center px-6 pt-4 pb-5">
                        <button
                          className="bg-black text-white  px-3 py-2 rounded-2xl"
                          onClick={openUplodeVideoModal}
                        >
                          UPLOAD
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex ">
                  <video
                    className="object-cover w-full rounded-2xl"
                    controls
                    width="400"
                    height="400"
                    src={item.video}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {uplodeVideoModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="border rounded-xl bg-slate-200 border-black w-100">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400"></p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className=" border border-black bg-white text-black  py-2 px-4 rounded-md hover:bg-slate-300 mt-4"
                  onClick={uplodeVideos}
                >
                  Upload
                </button>
              </div>
              <div>
                <button
                  className="bg-black text-white px-3 py-3 rounded-2xl"
                  onClick={closeUplodeVideoModal}
                >
                  close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
