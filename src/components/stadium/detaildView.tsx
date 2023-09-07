import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../servises/api/axios interceptor ";
import UserNav from "../navbar/userNav";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
// import {GoogleMap,Marker} from '@react-google-maps/api'


import { stadim } from "../../domain/modals/stadium";
// import { userData } from "../../domain/modals/userData";
// import { toast } from "react-toastify";
import Loader from "../loader/loader";
const DetaildView: React.FC = () => {
  // const [usersPremium, setUserPremium] = useState(false);
  // const [checkDetail, setCheckDetail] = useState<userData>();
  const [chatExist,setChatExist] = useState()
  const [loding,setLoding] = useState<boolean>(true)
  // const [stadiumLatLng, setStadiumLatLng] = useState<{ lat: number; lng: number }>({
  //   lat: 0, 
  //   lng: 0 
  // });
  // const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  // const mapStyles = {
  //   height: '400px',
  //   width: '100%',
  // };
  // const defaultCenter = {
  //    lat: 22.8061, 
  //   lng: 86.1931,
  // };
  const [carosal, setCarosal] = useState<stadim>();
  // const [firstChat, setFirstChat] = useState(true);
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user") as string);
  const userId = user.LoginCheck._id;

  
  const ownerId = carosal?._id
  const ownerid =carosal?.id
  console.log(userId," ",ownerid);
  useEffect(() => {
    if (id) {
      api.post("/stadium/detaildView", { id }).then((result) => {
        setCarosal(result.data.fetchDetails);
        console.log(result.data.fetchDetails._id);
        setLoding(false)
      });
    }
    ownerUserInfo()
  }, []);
  const ownerUserInfo = async () =>{
 
    console.log(ownerid,'ffff');
    
      if(ownerid&&userId){
      const userInfos =await api.post('/owner/userList',{userId,ownerid})
      console.log(userInfos);
      
    }
    
  }
  const existChatRoom =async () =>{
    if(ownerid && userId){ 
       const data = await api.post('/chat/chatRoomExist',{userId,ownerid})
       console.log(data.data.exist);
       
       setChatExist(data.data.exist)
  
      }
    }
    
    const createChat =async () => {
      if(ownerid&&userId){

        console.log(ownerid,"aaaa");
        
        const data =  await api.post("/chat/accessChat", { ownerid, userId })
        if (data) {
          navigate("/Chat");
        }
        }
    };
    useEffect(()=>{
      existChatRoom()
    },[ownerid])
  useEffect(()=>{
    // existChatRoom()
    ownerUserInfo()
  },[ownerid])


  
  const image = carosal?.image;
  
      
  
    // const emaiId = JSON.parse(localStorage.getItem("user") as string);
  // const email = emaiId.LoginCheck.email;
  // const openPaymentModal = () => {
  //   setIsPaymentModalOpen(true);
  // };
  // const closePaymentModal = () => {
  //   setIsPaymentModalOpen(false);
  // };

        // if (checkDetail) {
      // setUserPremium(false);
      // navigate("/Chat");
    // } else {
      // openPaymentModal();
      // setUserPremium(true);
    // }


  // useEffect(() => {
  //   chatRoomExist
  //   api.post("/fetchUsers", { email }).then((fetchdata) => {
  //     // setCheckDetail(fetchdata.data.userDetail.premium);
  //   });
  // }, [chatRoomExist]);

  // const fullLocation = `${carosal?.stadiumname} ${carosal?.location}`
  // const fullLocation = " eden gardens kolkata west bengal "
  // console.log(fullLocation);

  // useEffect(()=>{

    // const geoCoder = new google.maps.Geocoder()
  
  //   geoCoder.geocode({address :fullLocation},(result,status)=>{
  //     if(status === "OK" && result!.length>0){
  //       const location  = result![0].geometry.location
  //       console.log(location);
        
  //       const latitude =location.lat()
  //       const longitude = location.lng()
  //       setStadiumLatLng({ lat: latitude, lng: longitude });
  //     }
  //   })
  // },[])
  // console.log(stadiumLatLng);

  
  

  return (
    <div className="">
      {loding&&<Loader/>}
    <UserNav />
    <div className="flex w-full space-x-4 mt-8">
      <div className="flex-1">
     
        {image && image.length>0 && (
          <Slider {...settings}>
              {image && (
                <Slider {...settings}>
                  <div>
                    <img
                      src={image[0]}
                      alt=""
                      className="w-full h-[26rem] rounded-md"
                    />
                  </div>
                  <div>
                    <img
                      src={image[1]}
                      alt=""
                      className="w-full h-[26rem]  rounded-md"
                    />
                  </div>
                  <div>
                    <img
                      src={image[2]}
                      className="w-full h-[26rem]  rounded-md"
                    />
                  </div>
                </Slider>
              )}
            {/* Other slider items */}
          </Slider>
        )}
      </div>
      <div className="flex-1">
        <video className="w-full h-[26rem] rounded-md" controls autoPlay src={carosal?.video} />
      </div>
    </div>
    <div className="bg-gray-100 p-4 rounded-lg mt-8 text-center">
      <div className="text-2xl font-bold mb-2 mt-2">{carosal?.stadiumname?.toUpperCase()}</div>
      <div className="text-lg mt-2">{carosal?.location}</div>
      <div className="text-lg mt-2">{carosal?.maxcapacity}</div>
      <div className="text-lg mt-2">{carosal?.sportstype}</div>
      <div>
        {carosal?.fromdate} / <span>{carosal?.todate}</span>
      </div>
      <div className="text-lg mt-2">{carosal?.discription}</div>
      {/* Other info */}
      {chatExist == null ?
      <button className="mt-4 py-2 px-4 rounded-lg bg-blue-500 text-white" onClick={createChat}>
       
        start chat
      </button> :
      
      <button
        className={`mt-4 py-2 px-4 rounded-lg ${
             "bg-blue-500 text-white"
        }`}
      onClick={()=>navigate('/Chat')}>
        Countinue Chat
      </button>
      }
        {/* {chatExist == null ? "START CHAT" : "Continue Chat"} */}

     
      <div className="mt-6">
      {/* <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}   
        center={defaultCenter}
      >
       <Marker position={defaultCenter} />
      </GoogleMap> */}
      </div>
     
    </div>
  </div>
  );
};

export default DetaildView;
