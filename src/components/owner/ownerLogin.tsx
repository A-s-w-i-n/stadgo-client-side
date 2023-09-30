import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  { apiAuth } from "../../servises/api/axios interceptor ";
import { useDispatch } from "react-redux";
import { ownerLogged } from "../../Redux/owner/ownerSlice";
import { ToastContainer, toast } from "react-toastify";
const OwnerLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpEmail,setOptEmail] = useState('')
  const [changedpassword,setChangedpassword] =useState('')
  const [newPassword,setNewPassword] =useState('')
  const [forgot,setForgot] = useState<any>("")

  const [otp,setOtp] = useState('')
  const [ownerLogin, setOwnerLogin] = useState({
    email: "",
    password: "",
  });
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleClodeModal = () => {
    setIsModalOpen(false);
  };

  // useEffect(()=>{
  //   let onwer = localStorage.getItem('owner')

  //   if(onwer){
  //     navigate('/ownerHome')
  //   }
  // },[])

  const handleLoginOwner = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerLogin({ ...ownerLogin, [e.target.name]: e.target.value });
  };
  const genarateError = (err: any) =>
  toast.error(err, {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  });

  const handleOwnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      
      const { data } = await apiAuth.post("/owner/ownerLogin", {
        ...ownerLogin,
      });

      if (data) {
        const OwnerLoginCheck = data.ownerLoginCheck;
        const accessToken = data.accessToken;
        if (data.message) {
          if (data.message) genarateError(data.message);
          
        }
        if (data.ownerLoginCheck.isblocked == true) {
          toast.error("owner is blocked", {
            position: "top-right",
            autoClose: 3000,
          });
          navigate("/login");
        } else {
          localStorage.setItem(
            "owner",
            JSON.stringify({ accessToken, OwnerLoginCheck })
          );
          dispatch(
            ownerLogged({
              ownername: data.ownerLoginCheck.ownername,
              email: data.ownerLoginCheck.email,
              ownerId: data.ownerLoginCheck._id,
            })
          );
          navigate("/ownerHome");
        }
      }
    } catch (error) {}
  };
  const email = forgot
  const manageForgotPassword =async () => {
    handleModalOpen();
  };
  const handleForgotEmail =async() =>{
    const {data} = await apiAuth.post("/otp",{email})
    if(data.status){
      setOptEmail(data.status)
      
     
     
    }else{
      toast.success("Enter valid email", {
        position: "top-right",
        autoClose: 3000,
      });
    }
   
  }
  const validOtp =async ()=>{
    const {data} =await apiAuth.post("/verifyOtp",{email,otp})
   
    if(data.success){
      setNewPassword(data.success)
      
    }else{
      toast.success("Otp is invalid", {
        position: "top-right",
        autoClose: 3000,
      });
  
    }
    
    // navigate('/login')
    // handleClodeModal()
  }
  const spacePattern = /^\s+$/
const changePassword =async () =>{
 if(changedpassword.trim().length === 0 || spacePattern.test(changedpassword) ){
  toast.error("enter otp", {
    position: "top-right",
    autoClose: 3000,
  });
 }
 else  if(changedpassword.trim().length<3){
  toast.error("minium 3 character needed", {
    position: "top-right",
    autoClose: 3000,
  });

 }else if (changedpassword.trim().length >15){
  toast.error("only 14 letters allowed", {
    position: "top-right",
    autoClose: 3000,
  });
 }else{

 const data = await apiAuth.post('/owner/ownerUpdatePassword',{email,changedpassword})

 if(data){
   navigate('/login')
   handleClodeModal()
   setNewPassword("")
   setChangedpassword("")
   setOptEmail("")
 }
}
 }
  return (
    <div className="relative h-screen ">
       <ToastContainer />
      <form action="" onSubmit={handleOwnerLogin}>
        <div className="flex justify-center h-full ">
          <div className="w-1/2 p-4 bg-whilte-600 "></div>
        </div>
        <div className="absolute top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-96 h-3/5 shadow-xl rounded-2xl p-4 bg-opacity-30">
          <p className="text-center text-2xl">OWNER </p>

          <div className="">
            <input
              className="w-60 rounded-xl border-gray-300 border ml-14 p-2 mt-14"
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleLoginOwner}
            />
          </div>
          <div className=" h-20">
            <input
              className="w-60 rounded-xl border-gray-300 border m-14 p-2 mt-9"
              type="password"
              name="password"
              placeholder="password"
              onChange={handleLoginOwner}
            />
          </div>
          <div className="mt-3">
          <button className="rounded-full ml-[7rem]  border-2 font-bold text-xl bg-black  border-black text-white hover:bg-transparent hover:text-black h-12 px-10">
              Login
            </button>
          </div>
          <p className="mt-7 text-center text-white ">
            Create new account{" "}
            <span
              className="text-black underline  cursor-pointer"
              onClick={() => navigate("/Register")}
            >
              signup
            </span>
          </p>
          <div className=" flex justify-center text-center"></div>

          <p
              className="text-center cursor-pointer"
              onClick={manageForgotPassword}
            >
              Forgot password
            </p>
        </div>
      </form>
      {isModalOpen && (
           
            
           <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-50 ">
             <div className="bg-white rounded-lg w-full max-w-md p-6">
               <div className="text-center font-semibold">
               <p>Enter Your Email</p>
               </div>
               <div className="grid justify-center items-center">
                 <div className="h-20">
                   <input
                     className="w-60 rounded-xl  border-gray-300 border m-14 p-2 mt-4"
                     type="email"
                     name="email"
                     pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                     required
                     placeholder="Email"
                     onChange={(e)=>setForgot(e.target.value)}
                   />
                 </div>
                 {otpEmail &&
                 <div>

                 <div className="h-20">
                   <div className="text-center">
                   <p className="font-bold">Enter Your OTP</p>
                   </div>
                   <input
                     className="w-60 rounded-xl  border-gray-300 border m-14 p-2 mt-2"
                     type="text"
                     name="otp"
                     // pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                     required
                     placeholder="Enter your otp"
                     onChange={(e)=>setOtp(e.target.value)}
                   />
                 </div>
                 {newPassword &&
                 
                 <div className="h-20">
                   <div className="text-center">
                   <p className="font-bold">Enter New password</p>
                   </div>
                   <input
                     className="w-60 rounded-xl  border-gray-300 border m-14 p-2 mt-2"
                     type="text"
                     
                     // title="Password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, one numeric digit, and one special character (!@#$%^&*)"
                     name="password"
                     // pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    
                     placeholder="Enter Your New Password"
                     onChange={(e)=>setChangedpassword(e.target.value)}
                   />
                 </div>
               
}
                 </div>
                 
                 
}
                 <div className="flex justify-center gap-4">
                 {newPassword ? <button
                     className="w-24 h-10 bg-gray-500 hover:bg-transparent hover:text-black border border-black rounded-lg text-center"
                     onClick={changePassword}
>
                     Submit
                   </button>:
                  otpEmail ? 
                   <button
                     className="w-24 h-10 bg-blue-500 hover:bg-transparent hover:text-black border border-black rounded-lg text-center"
                     onClick={validOtp}
>
                     Submit
                   </button>:
                  <button
                     className="w-24 h-10 bg-green-500 hover:bg-transparent hover:text-black border border-black rounded-lg text-center"
                     onClick={handleForgotEmail}
>
                     Submit
                   </button>

}
                   <button
                     className="w-24 h-10 bg-black text-white hover:text-black hover:bg-transparent border border-black rounded-lg text-center"
                     onClick={handleClodeModal}
                   >
                     close
                   </button>
                 </div>
               </div>
             </div>

           </div>
          
         )}
          <ToastContainer />
    </div>
  );
};

export default OwnerLogin;
