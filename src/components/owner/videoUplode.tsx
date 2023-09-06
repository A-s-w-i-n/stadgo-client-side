import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import api from "../../servises/api/axios interceptor ";
// import { useNavigate } from "react-router-dom";
import { stadim } from "../../domain/modals/stadium";
import OwnerNav from "../navbar/ownerNav";
import Loader from "../loader/loader";

const VideoUpload = () => {
  // const navigate = useNavigate();
  const [stadiumInfo, setStadiumInfo] = useState<stadim[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uplodeVideo, setVideoUplode] = useState<string>("");
  const [uplodeVideoModal, setuplodeVideoModal] = useState(false);
  const [loding,setLoding] = useState<boolean>(false)
  

  const openUplodeVideoModal = () => {
    setuplodeVideoModal(true);
  };
  const closeUplodeVideoModal = () => {
    setuplodeVideoModal(false);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   
    if (e.target.files && e.target.files.length>0 ) {
      setLoding(true)
      console.log("jiii");
      
      setSelectedFile(e.target.files[0]);
      setLoding(false)
     
    }
  };

  const uploadVideoToS3 = async (file: File) => {
    console.log("working");
    
    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    });

    const params : any = {
      Bucket: process.env.REACT_APP_S3BUCKET_NAME,
      Key: `videos/${file.name}`,
      Body: file,
      ContentType: file.type,
    };

    try {
      setLoding(true)
      const response = await s3.upload(params ).promise();
      console.log("File uploaded:", response.Location);
      setVideoUplode(response.Location);
      setLoding(false)
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
console.log(selectedFile);

  const handleUpload = () => {
    if (selectedFile) {
      if(selectedFile.type.startsWith('video/')){

        uploadVideoToS3(selectedFile);
        setLoding(true)
      }else{
        console.log("Selected file is not a valid video");
        
      }
    }
  };

  const emailId = JSON.parse(localStorage.getItem("owner") as string);
  const emailCheck = emailId.OwnerLoginCheck;
  const email = emailCheck.email;

  const fetchVideo=()=>{

    
      api.post("/stadium/fetchStadium", { email }).then((result) => {
        console.log(result.data.fetchStadiumData[0]._id);

        setStadiumInfo(result.data.fetchStadiumData);
        // setLoding(false)
        // console.log(stadiumInfo[0].video);
    });
  

}

useEffect(()=>{
  fetchVideo()
},[])

  const uplodeVideos = async () => {
    handleUpload();
    const id = stadiumInfo[0]._id;
    if (uplodeVideo) {
      const uplode = await api.post("/owner/videoUplode", {
        uplodeVideo,
        id,
      });
      fetchVideo()
      if (uplode.status) {
        closeUplodeVideoModal();
        // stadiumInfo[0].video;
      }
    } 
  };
  // useEffect(()=>{

  // },[])

  return (
    <div>
      {loding&&<Loader/>}
      <OwnerNav />
      <div>
        {stadiumInfo.map((item) => (
          <div className="flex w-full h-full  ">
            <div className="  w-[30rem] ml-[6rem]      rounded overflow-hidden shadow-lg">
              <img
                className="w-full rounded-2xl"
                src={item.image[0]}
                alt="Sunset in the mountains"
              />
              <video
                className="grid w-full rounded-2xl mt-9"
                controls
                width="400"
                src={item.video}
                />
                </div>
<div className="flex">
              <div className="flex justify-betwee items-center    px-6 py-4">
                <div className="font-bold  text-xl text-center mb-2">
                  {item.stadiumname}
              <div className=" items-center justify-center px-6 pt-4 pb-5">
                <button
                  className="bg-cyan-400  px-3 py-2 rounded-2xl"
                  onClick={openUplodeVideoModal}
                >
                  UPLODE
                </button>
              </div>
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
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                     
                    </p>
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
                  className="bg-cyan-400 px-3 py-3 rounded-2xl"
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
