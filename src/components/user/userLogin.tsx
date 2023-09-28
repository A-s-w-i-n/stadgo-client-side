import React, { useState, useEffect } from "react";
import { apiAuth } from "../../servises/api/axios interceptor ";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// import { jwtPaylode } from "../../domain/modals/jwtDecode";
import { useDispatch } from "react-redux";
import { userLogged } from "../../Redux/user/userSlice";

// import {
//   GoogleOAuthProvider,
//   GoogleLogin,
//   GoogleCredentialResponse,
// } from "@react-oauth/google";
// import jwt_Decode from "jwt-decode";
// import auth from "../../servises/api/auth";

const genarateError = (err: any) =>
  toast.error(err, {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  });

const UserLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpEmail,setOptEmail] = useState('')
  const [changedpassword,setChangedpassword] =useState('')
  const [newPassword,setNewPassword] =useState('')
  const [otp,setOtp] = useState('')
  const [forgot,setForgot] = useState<any>("")
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    let user = localStorage.getItem("user");

    if (user) {
      navigate("/userHome");
    }
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleClodeModal = () => {
    setIsModalOpen(false);
  };
  console.log(forgot);
  

  // const googleLogin = async (credentialResponse: GoogleCredentialResponse) => {
  //   const { credential } = credentialResponse as GoogleCredentialResponse;
  //   if (credential) {
  //     try {
  //       const decode: jwtPaylode = jwt_Decode(credential);
  //       const Guser = {
  //         firstname: decode.name,
  //         lastname: decode.name.split("")[0],
  //         username: decode.name.split("@")[0],
  //         email: decode.email,
  //         phone: decode.exp.toString(),
  //         password: decode.email.split("@")[0],
  //         isGoogle: true,
  //       };
  //       const { data } = await api.post("/userRegister", {
  //         ...Guser,
  //         isGoogle: true,
  //       });
  //       if (data) {
  //         const Glogincheck = data.Guser;
  //         localStorage.setItem("user", JSON.stringify(Glogincheck));
  //         navigate("/userHome");
  //       } else {
  //       }
  //     } catch (error) {
  //     }
  //   } else {
  //   }
  // };
  const email = forgot
  const manageForgotPassword =async () => {
    handleModalOpen();
  };
  const handleForgotEmail =async() =>{
    const {data} = await apiAuth.post("/forgotpassword",{email})
    console.log(data);
    
    if(data.status){
      setOptEmail(data.status)
      
     console.log(data);
     
    }else{
      toast.error("You are not registered with us. Please sign up", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    console.log(data);
  }
const validOtp =async ()=>{
  if(otp.trim().length== 0 ){
    toast.error("Enter otp", {
      position: "top-right",
      autoClose: 3000,
    });
  }else{

    const {data} =await apiAuth.post("/verifyOtp",{email,otp})
    console.log(data.success);
    if(data.success){
      setNewPassword(data.success)
      
    }else{
    toast.error("Otp is invalid", {
      position: "top-right",
      autoClose: 3000,
    });
    
  }
  
}
  // navigate('/login')
  // handleClodeModal()
}
const spacePattern = /^\s+$/
const changePassword =async () =>{
 if(changedpassword.trim().length ===0 || spacePattern.test(changedpassword) ){
  toast.error("Enter a password", {
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

 const data = await apiAuth.post('/updatePassword',{email,changedpassword})

 if(data){
  toast.success("password updated", {
    position: "top-right",
    autoClose: 3000,
  });
   navigate('/login')
   handleClodeModal()
   setNewPassword("")
   setChangedpassword("")
   setOptEmail("")
 }
}
 }
  
  const handleLoginUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    {
      setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await apiAuth.post("/login", { ...userLogin });
      if (data) {
        const LoginCheck = data.LoginCheck;
      
        
        
        const token = data.accessToken;
        if (data.message) {
          if (data.message) genarateError(data.message);
          console.log(data.message);
        }

        if (data.LoginCheck.isblocked == true) {
          toast.error("user is blocked", {
            position: "top-right",
            autoClose: 3000,
          });
          navigate("/login");
        } else {
          localStorage.setItem(`user`, JSON.stringify({ token, LoginCheck }));

          dispatch(
            userLogged({
              username: data.LoginCheck.username,
              email: data.LoginCheck.email,
              userId: data.LoginCheck._id,
            })
          );

          navigate("/userHome");
        }
      }
    } catch (error) {}
  };

  return (
    <div className="relative h-screen  ">
              <ToastContainer />
      <form action="" onSubmit={handleLogin}>
        <div className="flex justify-center h-full">
          <div className="w-1/2 p-4  bg-whilte-600"></div>
        </div>
        <div className="absolute top-64 left-1/2   transform -translate-x-1/2 -translate-y-1/2 bg-white w-96 h-96  shadow-xl rounded-2xl p-4 bg-opacity-30 ">
          <p className="text-center text-2xl">USER</p>

          <div className="">
            <input
              className="w-60 rounded-xl border-gray-300 border ml-14 p-2 mt-14"
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleLoginUser}
            />
          </div>
          <div className=" h-20">
            <input
              className="w-60 rounded-xl  border-gray-300 border m-14 p-2 mt-9"
              type="text"
              name="password"
              placeholder="password"
              onChange={handleLoginUser}
            />
          </div>
          <div className="items-center   mt-3 justify-center">
            <button className="rounded-full ml-[7rem] border-2 font-semibold text-xl bg-black  border-black text-white hover:bg-transparent hover:text-black h-12 px-10">
              Login
            </button>
            {/* <h3 className="text-center my-2 ">or</h3> */}
            <div className="flex justify-center items-center ">
              {/* <button className="rounded-3xl bg-white border-y border-black h-2">
                <GoogleOAuthProvider clientId="369233122526-6jq1er61ihvpfenp7aosiovivct318d4.apps.googleusercontent.com">
                  <GoogleLogin
                    size="medium"
                    type="icon"
                    onSuccess={googleLogin}
                    onError={() => {
                    }}
                  />
                </GoogleOAuthProvider>
              </button> */}
            </div>

            <p className="mt-7 text-center text-white ">
              create new account{" "}
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
                      id="email"
                      required
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
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

export default UserLogin;
