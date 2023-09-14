import { useEffect, useState } from "react";
import { ownerAuth } from "../../domain/modals/owner";
import { useNavigate } from "react-router-dom";
import { apiAuth } from "../../servises/api/axios interceptor ";

const OwnerForm: React.FC = () => {
  const navigate = useNavigate();
  const [userOtp, setUserOtp] = useState<boolean>(false);
  const [inputOtp, setInputOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState<number>(60);
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);
  const [owner, setOwner] = useState<ownerAuth>({
    firstname: "",
    lastname: "",
    ownername: "",
    email: "",
    companyname: "",
    phone: "",
    password: "",
    location: "",
  });
  console.log(setResendDisabled);

  const addOwner = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwner({ ...owner, [e.target.name]: e.target.value });
  };
  console.log(resendDisabled);

  const handleOwnerSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const {
        firstname,
        lastname,
        ownername,
        email,
        phone,
        companyname,
        location,
        password,
      } = owner;
      console.log(owner);
      console.log("heloooooooooooooo");

      if (
        firstname !== " " &&
        lastname !== " " &&
        ownername !== " " &&
        password !== " " &&
        phone !== " " &&
        email !== " " &&
        companyname !== " " &&
        location !== " "
      ) {
        await apiAuth.post("/owner/ownerRegister", {
          ...owner,
        });

        handleOwnerOtp();
      }
    } catch (error) {}
  };

  const handleOwnerOtp = async () => {
    try {
      setUserOtp(true);
      await apiAuth.post("/otp", { ...owner });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (userOtp && otpTimer > 0) {
      timeout = setTimeout(() => {
        setOtpTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [userOtp, otpTimer]);
  // const handleResendOtp = () => {
  //   setOtpTimer(60); // Reset the timer
  //   setResendDisabled(true);
  //   handleOwnerOtp()
  // };

  const verifyOtp = async () => {
    // e.preventDefault();
    const email = owner.email;
    const otp = inputOtp;

    try {
      await apiAuth.post("/verifyOtp", { email, otp });
      navigate("/login");
      setUserOtp(false);
    } catch (error) {}
  };

  return (
    <div className="fixed">
      <form action="" onSubmit={handleOwnerSignUp}>
        <div className="relative h-screen flex mt-8">
          <div className="left w-1/2 h-screen bg-white">
            <div className="absolute top-56 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="center shadow-2xl bg-white rounded-xl w-max h-4/5 gap-y-px bg-opacity-40">
                <div className="text-center pt-3">OWNER REGISTER</div>
                <div className="grid grid-cols-2 gap-4 mt-5 ">
                  <input
                    type="text"
                    id="firstName"
                    pattern="[A-Za-z]+"
                    required
                    title="Please enter a valid first name (letters only)"
                    name="firstname"
                    className="ml-7 w-60 rounded-xl border-gray-300 border p-2 mr-4 mt-3"
                    placeholder="firstname"
                    onChange={addOwner}
                  />
                  <input
                    type="text"
                    className="w-60 rounded-xl border-gray-300 border p-2 mt-3"
                    placeholder="lastname"
                    name="lastname"
                    onChange={addOwner}
                  />
                  <input
                    type="text"
                    className="ml-7 w-60 rounded-xl border-gray-300 border p-2 mr-4 mt-4"
                    placeholder="ownername"
                    name="ownername"
                    onChange={addOwner}
                  />
                  <input
                    type="email"
                    className="w-60 rounded-xl border-gray-300 border p-2 mt-4"
                    placeholder="email"
                    name="email"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    required
                    title="Please enter a valid email address"
                    onChange={addOwner}
                  />
                  <input
                    type="text"
                    className="ml-7 w-60 rounded-xl border-gray-300 border p-2 mr-4 mt-4"
                    placeholder="password"
                    name="password"
                    onChange={addOwner}
                  />
                  <input
                    type="text"
                    className="w-60 rounded-xl border-gray-300 border p-2 mt-4"
                    placeholder="companyname"
                    name="companyname"
                    onChange={addOwner}
                  />
                  <input
                    type="text"
                    className="ml-7 w-60 rounded-xl border-gray-300 border p-2 mr-4 mt-4"
                    placeholder="location"
                    name="location"
                    onChange={addOwner}
                  />
                  <input
                    type="text"
                    className="w-60 rounded-xl border-gray-300 border p-2 mt-4"
                    id="phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    required
                    title="Please enter a valid phone number in the format XXX-XXX-XXXX"
                    placeholder="phone"
                    name="phone"
                    onChange={addOwner}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6 ml-48">
                  <div className="flex flex-col items-center justify-center">
                    <button className="rounded-full bg-cyan-300 px-3 py-2  transition ease-in-out delay-150 bg-cyan-300 hover:-translate-y-1 hover:scale-110 hover:bg-cyan-300 duration-300">
                      REGISTER
                    </button>
                    <h3 className="text-center my-2">or</h3>

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
          <div className="right w-1/2 h-screen bg-cyan-300"></div>
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
              <p className="text-gray-600 text-sm">
                Resend OTP in {otpTimer} seconds
              </p>
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

export default OwnerForm;
