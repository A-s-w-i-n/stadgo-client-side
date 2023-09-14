import {ReactNode, useEffect,useState} from "react";
import UserNav from "../navbar/userNav";
import UserPremium from "../payment/Paypal";
import { useParams } from "react-router-dom";
import api from "../../servises/api/axios interceptor ";


const UserPayment = () => {
  
    const [stadium,setStadium] = useState<any>("")
    const [owner,setOwner] = useState<any>("")
    const [checked, setChecked] = useState(false);

    const {ownerid,id} = useParams()

   const user =JSON.parse(localStorage.getItem("user")as string) 
   
   const username = user.LoginCheck.username
   
   const handleChange = (e:any) => {
    setChecked(e.target.checked );
    console.log(e.target.checked);
    
  };

    useEffect(()=>{
        const ownerDetails =async () =>{
            const data =await api.post("/owner/fetchOwnerById",{ownerid})
            console.log(data.data.fetch);   
            setOwner(data.data.fetch[0])
        }
        ownerDetails()

    },[])
   
    useEffect(()=>{
        const stadiumDetails =async () =>{
            console.log("hiiiiiiiiiiiiiii");
            const data =await api.post("/stadium/detaildView", { id })
            console.log(data.data.fetchDetails);
            setStadium(data.data.fetchDetails)
        }
        stadiumDetails()
        
    },[])

  return (
    <div>
      <UserNav />
      <div className="w-full flex h-screen">
        <div className="w-1/2 h-full">
          <div className="w-full h-10 flex justify-center">
            <p className="text-3xl font-extrabold">AGREEMENT</p>
          </div>
          <div className="w-full mt-5 bg-white rounded-2xl shadow-2xl h-[33.5rem]">
            <p>This Stadium Booking Agreement  is entered into between Stadium Owner {owner?.ownername} and Booking Party's  {username} on {stadium?.fromdate} To {stadium.todate}</p>
           <p className="mt-3"> Stadium Name: {stadium.stadiumname}</p>
<p>Match Name: {stadium.sportstype} Match</p>
<p>Date of Booking: {stadium.fromdate}</p>
<p>End of Booking: {stadium.todate}</p>
<p>Rental Fee: {stadium.price}</p>

<p className="font-extrabold ">1.Payment Terms</p>

<p>1. The Booking Party agrees to pay the full rental fee specified above to the Stadium Owner prior to the event/match.</p>
<p>2.  There is no refund or cancelation in the case of rent payment</p>


<p className="font-extrabold">2.Liability</p>

 <p>The Booking Party assumes full responsibility for any damage or loss of property during the stadium booking period and shall be liable for any associated repair or replacement costs.</p>

 <p className="mt-7 font-semibold"> This Agreement constitutes the entire agreement between the Stadium Owner and the Booking Party and supersedes all prior agreements and understandings, whether written or oral.</p>
          <div>
        
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <label htmlFor="checkbox"  onChange={handleChange}>Agree Conditions</label>
    </div>
          </div>
          
        </div>
        <div className="w-1/2 h-full ">
          <div className="w-full h-10 flex justify-center ">
            <p className="text-3xl font-extrabold">RENT DETAILS</p>
          </div>
          <div className=" flex justify-center mt-5  bg-white rounded-lg   w-full h-[33.5rem]">
            <div className="w-full flex  h-full">
            <div className="  flex-row justify-end items-end   w-11/12 h-full">
            <div className="w-full text-center  flex justify-end h-96 ">
                <div className="w-72 h-64 rounded-lg mt-10 shadow-2xl bg-white">
                <p className="font-extrabold mt-7 text-2xl">{stadium?.stadiumname}</p>
                <p className="mt-6 font-mono">{stadium?.fromdate} -- {stadium.todate}</p>
                <p className="mt-6">{stadium.location}</p>
                <p className="mt-6">{stadium.sportstype}</p>
                <p className="mt-6">₹{stadium.price}</p>
                </div>
            </div>
            {checked ? <div className="w-[full] text-center rounded-xl  text-lg font-semibold bg-white shadow-2xl h-32"> 
            <p>Rent Amount Pay Using Paypal</p><span className="mt-10"> <UserPremium stadium={stadium}></UserPremium> </span></div> : 
           <div className="w-[full] text-center rounded-xl  text-lg font-semibold bg-white shadow-2xl h-32"> 
           <p className="pt-10">Agree terms and conditions for continue payment</p>
           </div>
           }
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPayment;
