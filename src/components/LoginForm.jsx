import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { demoUser, adminUser } from "../App";
import { useState, useEffect } from "react";
import { scrollToTop } from "../App";
import axios from "axios";

function LoginForm() {
  // handling demo login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleDemoLogin = () => {
  //   setEmail(demoUser.email);
  //   setPassword(demoUser.password);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Check if demo credentials match
  //   if (email === demoUser.email && password === demoUser.password) {
  //     // Redirect to account page
  //     navigate("/userdashboard");
  //   } else if (email === adminUser.email && password === adminUser.password) {
  //     navigate("/admin");
  //   } else {
  //     alert("Invalid credentials");
  //   }
  // };

  // monitor for if user is previously logged in
  useEffect(() => {
    axios
      .get("/api/protected", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Protected data:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching protected data:", err);
      });
  }, []);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/userdashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid credentials or server error");
    }
  };

  return (
    <section className="md:p-10 p-6 flex flex-col md:w-[50%] w-[100%]">
      {/* Go back home */}
      <div className="text-black md:pb-8 w-full">
        <ArrowLeft
          onClick={() => window.history.back()}
          className="md:w-8 md:h-8 w-6 h-6 md:block hidden cursor-pointer"
        />
        <p
          onClick={() => window.history.back()}
          className="float-right text-xs md:hidden block cursor-pointer"
        >
          Go back
        </p>
      </div>
      <div className="w-full flex flex-col">
        <h1
          id="login"
          className="sm:text-[40px] text-[32px] text-[#1F2937] font-bold sm:pb-8 pb-4 sm:px-0 px-2"
        >
          Login
        </h1>
        <div className="w-full flex flex-col items-center">
          <img src="/logo.png" alt="Logo" className="w-14 h-18" />
          <p className="text-[#1F2937] md:text-[22px] text-[20px]">
            Welcome Back
          </p>
          <p className="md:text-[18px] text-[16px] text-[#6B7280]">
            Sign in to continue
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col py-4 w-full items-center"
          >
            <div className="flex flex-col pb-6 lg:w-[70%] md:w-[90%] w-full">
              <label htmlFor="email" className="text-[#6B7280] md:pb-2">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%]"
              />
            </div>
            <div className="flex flex-col lg:w-[70%] md:w-[90%] w-full">
              <label htmlFor="password" className="text-[#6B7280] md:pb-2">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="p-3 border border-gray-500 bg-gray-200 rounded-2xl w-[100%]"
              />
            </div>
            <div className="lg:w-[70%] md:w-[90%] w-full text-[#1F2937] pb-6">
              <p className="float-right">Forgot password?</p>
            </div>
            <div className="lg:w-[70%] md:w-[90%] w-full flex flex-row justify-center pb-4">
              <button
                type="submit"
                className="bg-[#1F2937] text-white font-bold w-[70%] p-2 rounded-3xl"
              >
                Log In
              </button>
            </div>
            <div>
              <p className="text-[#6B7280]">
                Don't have an account?{" "}
                <span className="text-[#1F2937]">
                  <Link to={"/login?signup=true"} onClick={() => scrollToTop()}>
                    Create Account
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
