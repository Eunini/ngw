import { ChevronLeft, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function SignInForm() {
  const [fullName, setFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [licenseBody, setLicenseBody] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [userState, setUserState] = useState("");
  const [userLGA, setUserLGA] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [areaOfSpec, setAreaOfSpec] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [niwrmcOrOthers, setNiwrmcOrOthers] = useState("");

  // const [form, setForm] = useState({
  //   fullname: fullName,
  //   email: userEmail,
  //   phoneNumber: userPhoneNumber,
  //   areaOfSpec: areaOfSpec,
  //   licenseType: licenseType,
  //   licenseBody: licenseBody,
  //   licenseNumber: licenseNumber,
  //   role: "user",
  //   userState: userState,
  //   userLGA: userLGA,
  //   address: userAddress,
  //   password: userPassword,
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullname: fullName,
      email: userEmail,
      phoneNumber: userPhoneNumber,
      password: userPassword,
      role: "user",
      areaOfSpec: areaOfSpec,
      licenseType: licenseType,
      licenseBody: licenseBody,
      licenseNumber: licenseNumber,
      userState: userState,
      userLGA: userLGA,
      address: userAddress,
    };
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        payload,
        { withCredentials: true }
      );
      
      console.log('Registered user:', response.data);
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
    }
  };


  return (
    <div id="signup-section" className="md:p-10 p-6 md:w-[50%] w-[100%]">
      {/* Go back home */}
      <div className="text-black md:pb-8 w-full pt-4">
        <ArrowLeft
          onClick={() => window.history.back()}
          className="md:w-8 md:h-8 w-6 h-6 md:block hidden cursor-pointer"
        />
      </div>
      <div className="w-full flex flex-col">
        <h1
          id="signup"
          className="sm:text-[40px] text-[32px] text-[#1F2937] font-bold sm:pb-8 pb-4 sm:px-0 px-1 flex flex-row items-center gap-2"
        >
          <ChevronLeft
            onClick={() => window.history.back()}
            className="h-10 w-10 md:hidden block cursor-pointer"
          />
          Create Account
        </h1>
        <div>
          <h1 className="text-[#1F2937] md:text-[22px] text-[20px]">Join Us</h1>
          <p className="text-[#6B7280] md:text-[18px] text-[16px]">
            Fill in your details
          </p>
          <form action="" className="flex flex-col py-4 w-full">
            <div className="flex flex-col pb-2 lg:w-[70%] md:w-[90%] w-full">
              <label htmlFor="fullname" className="text-[#6B7280] md:pb-2">
                Fullname:
              </label>
              <input
                type="text"
                name="fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your Fullname"
                className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%]"
              />
            </div>
            <div className="flex flex-col lg:w-[70%] md:w-[90%] w-full pb-2">
              <label htmlFor="emailregister" className="text-[#6B7280] md:pb-2">
                Email:
              </label>
              <input
                type="email"
                name="emailregister"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your Email"
                className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%]"
              />
            </div>
            <div className="flex flex-col lg:w-[70%] md:w-[90%] w-full pb-2">
              <label htmlFor="phonenumber" className="text-[#6B7280] md:pb-2">
                Phone Number:
              </label>
              <input
                type="tel"
                name="phonenumber"
                value={userPhoneNumber}
                onChange={(e) => setUserPhoneNumber(e.target.value)}
                placeholder="Enter your Phone Number"
                className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%]"
              />
            </div>
            <div className="flex flex-col lg:w-[70%] md:w-[90%] w-full pb-2">
              <label
                htmlFor="areaofspecialization"
                className="text-[#6B7280] md:pb-2"
              >
                Area of Specialization
              </label>
              <select
                name="areaofspecialization"
                id="areaofspecialization"
                value={areaOfSpec}
                onChange={(e) => {
                  setAreaOfSpec(e.target.value);
                  setLicenseType(null);
                  setNiwrmcOrOthers(null);
                }}
                className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%]"
              >
                <option value="">Select Area of Specialization</option>
                <option value="Hydrogeologist">Hydrogeologist</option>
                <option value="Water / Civil Engineer">
                  Water / Civil Engineer
                </option>
                <option value="Licensed Driller">Licensed Driller</option>
                <option value="Licensed Contractor">Licensed Contractor</option>
                <option value="Licensed Drilling Company">
                  Licensed Drilling Company
                </option>
              </select>
            </div>
            {(areaOfSpec === "Hydrogeologist" ||
              areaOfSpec === "Water / Civil Engineer") && (
              <div className="flex flex-col lg:w-[70%] md:w-[90%] w-full pb-2">
                <label
                  htmlFor="licensenumber"
                  className="text-[#6B7280] md:pb-2"
                >
                  License Number (NMGS or COMEG):
                </label>
                <input
                  type="text"
                  name="licensenumber"
                  placeholder="Enter your License Number"
                  className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%]"
                />
              </div>
            )}
            {(areaOfSpec === "Licensed Driller" ||
              areaOfSpec === "Licensed Contractor" ||
              areaOfSpec === "Licensed Drilling Company") && (
              <div className="flex flex-col lg:w-[70%] md:w-[90%] w-full pb-2">
                <select
                  name="license-type"
                  id="license-type"
                  value={licenseType}
                  onChange={(e) => {
                    setLicenseType(e.target.value);
                    setNiwrmcOrOthers(null);
                  }}
                  className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%]"
                >
                  <option value="">Select License Type</option>
                  <option value="Federal">Federal</option>
                  <option value="State">State</option>
                </select>
              </div>
            )}
            {licenseType === "Federal" && (
              <div className="flex flex-col lg:w-[70%] md:w-[90%] w-full pb-2">
                <select
                  name="niwrmcOrOthers"
                  id="niwrmcOrOthers"
                  value={niwrmcOrOthers}
                  onChange={(e) => setNiwrmcOrOthers(e.target.value)}
                  className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%]"
                >
                  <option value="">Select License Body</option>
                  <option value="niwrmc">NIWRMC</option>
                  <option value="others">Others</option>
                </select>
              </div>
            )}
            {niwrmcOrOthers === "niwrmc" && (
              <div className="flex flex-col lg:w-[70%] md:w-[90%] w-full pb-2">
                <input
                  type="text"
                  name="licensenumber"
                  placeholder="Enter your License Number"
                  value={licenseNumber}
                  onChange={(e) => {
                    setLicenseNumber(e.target.value);
                    setLicenseBody("NIWRMC");
                  }}
                  className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%]"
                />
              </div>
            )}
            {niwrmcOrOthers === "others" && (
              <div className="flex flex-col lg:w-[70%] md:w-[90%] w-full pb-2">
                <input
                  type="text"
                  name="name-of-body"
                  value={licenseBody}
                  onChange={(e) => setLicenseBody(e.target.value)}
                  placeholder="Enter Name of Body"
                  className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%] my-2"
                />
                <input
                  type="text"
                  name="licensenumber"
                  placeholder="Enter your License Number"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%]"
                />
              </div>
            )}
            {licenseType === "State" && (
              <div className="flex flex-col lg:w-[70%] md:w-[90%] w-full pb-2">
                <label
                  htmlFor="licensenumber"
                  className="text-[#6B7280] md:pb-2"
                >
                  License Number:
                </label>
                <input
                  type="text"
                  name="licensenumber"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="Enter your License Number"
                  className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%]"
                />
              </div>
            )}
            <div className="flex flex-col lg:w-[70%] md:w-[90%] w-full pb-2">
              <label htmlFor="userState" className="text-[#6B7280] md:pb-2">
                State:
              </label>
              <input
                type="text"
                name="userState"
                id="userState"
                value={userState}
                onChange={(e) => setUserState(e.target.value)}
                placeholder="Enter your State"
                className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%]"
              />
            </div>
            <div className="flex flex-col lg:w-[70%] md:w-[90%] w-full pb-2">
              <label htmlFor="userlga" className="text-[#6B7280] md:pb-2">
                LGA:
              </label>
              <input
                type="text"
                name="userlga"
                id="userlga"
                value={userLGA}
                onChange={(e) => setUserLGA(e.target.value)}
                placeholder="Local Government Area"
                className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%]"
              />
            </div>
            <div className="flex flex-col lg:w-[70%] md:w-[90%] w-full pb-2">
              <label htmlFor="useraddress" className="text-[#6B7280] md:pb-2">
                Address:
              </label>
              <input
                type="text"
                name="useraddress"
                id="useraddress"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                placeholder="Enter your Address"
                className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%]"
              />
            </div>
            <div className="flex flex-col lg:w-[70%] md:w-[90%] w-full">
              <label
                htmlFor="passwordregister"
                className="text-[#6B7280] md:pb-2"
              >
                Password:
              </label>
              <input
                type="password"
                name="passwordregister"
                id="passwordregister"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Password"
                className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%]"
              />
            </div>
            <div className="flex flex-col lg:w-[70%] md:w-[90%] w-full pb-2">
              <p className="text-[#6B7280] md:text-base text-sm py-2">
                By creating an account, you agree to our Terms of Service and
                Privacy Policy
              </p>
            </div>
            <div className="lg:w-[70%] md:w-[90%] w-full flex flex-row justify-center pb-4">
              <button type="submit" onClick={handleSubmit} className="bg-[#1F2937] text-white font-bold w-[70%] p-2 rounded-3xl">
                Create Account
              </button>
            </div>
            <div>
              <p className="text-[#6B7280]">
                Already have an account?{" "}
                <span className="text-[#1F2937]">
                  <Link to={"/login"} onClick={() => scrollToTop}>
                    Log in
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
