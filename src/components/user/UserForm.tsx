import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../../domain/modals/user";
import  { apiAuth } from "../../servises/api/axios interceptor ";
// import jwt_Decode from "jwt-decode";
// import { jwtPaylode } from "../../domain/modals/jwtDecode";
// import {
//   GoogleOAuthProvider,
//   GoogleLogin,
//   GoogleCredentialResponse,
// } from "@react-oauth/google";

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const [userOtp, setUserOtp] = useState<boolean>(false);
  const [inputOtp, setInputOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState<number>(60)
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);
  const [user, setUser] = useState<userAuth>({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    let user = localStorage.getItem("user");

    if (user) {
      navigate("/userHome");
    }
  }, []);

  const addUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // google auth

  // const googleSignup = async (credentialResponse: GoogleCredentialResponse) => {
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
  //         const GsignCheck = data.Guser.email;
  //         const GaccessToken = data.Guser.username;

  //         localStorage.setItem(
  //           "user",
  //           JSON.stringify(GaccessToken, GsignCheck)
  //         );
  //         navigate("/userhome");
  //       }
  //     } catch (error) {
  //       console.error("Token not found");
  //     }
  //   } else {
  //     console.log(credentialResponse);
  //   }
  // };
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (userOtp && otpTimer > 0) {
      timeout = setTimeout(() => {
        setOtpTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }else if(otpTimer === 0 ){
      setResendDisabled(false); 

    }
    return () => {
      clearTimeout(timeout);
    };
  },[userOtp, otpTimer])
  const handleResendOtp = () => {
    setOtpTimer(60); // Reset the timer
    setResendDisabled(true); 
    handleUserOtp()
  };

  // user Register

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { firstname, lastname, username, password, phone, email } = user;
      if (
        firstname !== " " &&
        lastname !== " " &&
        username !== " " &&
        password !== " " &&
        phone !== " " &&
        email !== " "
      ) {
        console.log("its workinnnnnng");
        console.log(user);

         await apiAuth.post("/userRegister", { ...user });
        handleUserOtp();
      }
    } catch (error) {}
  };

  const handleUserOtp = async () => {
    try {
      setUserOtp(true);
       await apiAuth.post("/otp", { ...user });
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = user.email;
    const otp = inputOtp;

    try {
      await apiAuth.post("/verifyOtp", { email, otp });
      navigate("/login");
      setUserOtp(false);
    } catch (error) {}
  };

  return (
    <div className="fixed bg-customcolor ">
      <form action="" onSubmit={handleSignup}>
        <div className="relative h-screen flex mt-8 bg-blue-500  ">
          <div className="left w-1/2 h-screen bg-blue-300 ">
            <div className="absolute top-56 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
              <div className="center shadow-2xl bg-white rounded-2xl w-max h-4/5 gap-y-px bg-opacity-40  ">
                <div className="text-center pt-3">USER REGISTER </div>
                <div className="grid grid-cols-2 gap-4 mt-5 ">
                  <input
                    type="text"
                    id="firstName"
                    pattern="[A-Za-z]+"
                    required
                    title="Please enter a valid first name (letters only)"
                    name="firstname"
                    className="ml-7 w-60 rounded-xl border-gray-300 border-2 p-2 mr-4 mt-3 "
                    placeholder="firstname"
                    onChange={addUser}
                  />
                  <input
                    type="text"
                    id="firstName"
                    pattern="[A-Za-z]+"
                    required
                    title="Please enter a valid last name (letters only)"
                    name="lastname"
                    className="w-60 rounded-xl border-gray-300 border p-2 mt-3"
                    placeholder="lastname"
                    onChange={addUser}
                  />
                  <input
                    type="text"
                    id="ownername"
                    pattern="[A-Za-z]+"
                    required
                    title="Please enter a valid username (letters only)"
                    name="username"
                    className="ml-7 w-60 rounded-xl border-gray-300 border p-2 mr-4 mt-4"
                    placeholder="username"
                    onChange={addUser}
                  />
                  <input
                    type="email"
                    name="email"
                    className="w-60 rounded-xl border-gray-300 border p-2 mt-4"
                    placeholder="email"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    required
                    title="Please enter a valid email address"
                    onChange={addUser}
                  />
                  <input
                    type="text"
                    name="password"
                    className="ml-7 w-60 rounded-xl border-gray-300 border p-2 mr-4 mt-4"
                    placeholder="password"
                    onChange={addUser}
                  />
                  <input
                    type="text"
                    id="phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    required
                    title="Please enter a valid phone number in the format XXX-XXX-XXXX"
                    name="phone"
                    className="w-60 rounded-xl border-gray-300 border p-2 mt-4"
                    placeholder="phone"
                    onChange={addUser}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6 ml-48 ">
                  <div className="flex flex-col items-center justify-center">
                    <button className="rounded-3xl px-3 py-2  transition ease-in-out delay-150 bg-cyan-300 hover:-translate-y-1 hover:scale-110 hover:bg-cyan-300 duration-300">
                      REGISTER
                    </button>
                    <h3 className="text-center my-2 ">or</h3>
                    <button className="rounded-3xl bg-white border-y border-black   h-7">
                      {/* <GoogleOAuthProvider clientId="369233122526-6jq1er61ihvpfenp7aosiovivct318d4.apps.googleusercontent.com">
                        <GoogleLogin
                          size="medium"
                          type="icon"
                          onSuccess={googleSignup}
                          onError={() => {
                            console.log("Login Failed");
                          }}
                        />
                      </GoogleOAuthProvider> */}
                    </button>
                    <p>
                      alredy have an accout{" "}
                      <span
                        className="text-cyan-500 cursor-pointer"
                        onClick={() => navigate("/login")}
                      >
                        {" "}
                        LOGIN
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {userOtp && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-400 bg-opacity-30 rounded-xl flex items-center justify-center">
          <div className="bg-white rounded-lg w-11/12 max-w-md mx-auto p-6">
            <div className=" justify-between text-center items-center mb-4">
              <h5 className="text-xl text-center font-semibold text-gray-800 ">
                Enter Otp
              </h5>
            </div>
            <div className="flex justify-center items-center">
              <input
                type="text"
                name="otp"
                className="rounded-lg h-9 border-gray-300  border text-center"
                placeholder="otp"
                onChange={(e) => setInputOtp(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center">
              {otpTimer > 0 ? (
                <p className="text-gray-600 text-sm">
                  Resend OTP in {otpTimer} seconds
                </p>
              ) : (
                <button
                  className="bg-cyan-300 px-3 py-2 rounded-lg"
                  onClick={handleResendOtp}
                  disabled={resendDisabled}
                >
                  Resend OTP
                </button>
              )}
            </div>
            <div className="flex justify-center items-center">
              <button
                className="bg-cyan-300 px-3 mt-3 py-2 rounded-lg just "
                onClick={verifyOtp}
                // disabled ={otpTimer >0}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserForm;
