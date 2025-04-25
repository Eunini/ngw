import HomeComponent1 from "../components/HomeComponent1";
import HomeComponent2 from "../components/HomeComponent2";
import HomeComponent3 from "../components/HomeComponent3";
import HomeComponent4 from "../components/HomeComponent4";
import HomeComponent5 from "../components/HomeComponent5";
import { useNavigate, Link } from "react-router-dom";
import SubscribeNewsletter from "../components/SubscribeNewsletter";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#F0F7F9] w-[100%] block-hero-section">
      <div className="relative w-full md:h-screen sm:px-10 px-5 overflow-hidden flex sm:items-center items-start justify-center text-white bg-gradient-to-b from-[#1B4965] to-[#62B6CB]">
        <div className="absolute inset-0 bg-[url('/background2.jpg')] bg-cover bg-center opacity-30 z-0 zoom-in-out" />
        <div className="md:py-0 py-24 md:pt-26 relative">
          <div className="">
            <h1 className="z-10 font-poppins text-white font-extrabold text-[30px] md:text-[60px] custom-line-height custom-line-spacing w-[80%] sm:w-[98%] md:w-[72%] pb-8">
              Smart Data{" "}
              <span className="text-white">
                Management for Sustainable Water Projects in Nigeria
              </span>
            </h1>
            <p className="text-white font-normal font-openSans line-height-semi text-[15px] md:text-[18px] w-[80%] md:w-[50%] md:pb-6">
              Unlock data-driven efficiency, transparency, and sustainability in
              Nigeria's water projects—track resources, monitor impact, and
              ensure clean water for all.
            </p>
            <button className="z-40 cursor-pointer hover:bg-white py-3 md:px-3 px-3 border border-white md:rounded-3xl rounded-full md:text-[16px] text-xs text-white hover:text-[#1B4965] flex flex-row items-center">
              Learn More
            </button>
          </div>
        </div>
        <div className="absolute bg-blue-100 rounded-full w-4 h-4 top-[15%] left-[15%] animate-droplet animation-delay-100"></div>
        <div className="absolute bg-blue-100 rounded-full w-3 h-3 top-[10%] left-[30%] animate-droplet animation-delay-300"></div>
        <div className="absolute bg-blue-100 rounded-full w-5 h-5 top-[25%] left-[50%] animate-droplet animation-delay-200"></div>
        <div className="absolute bg-blue-100 rounded-full w-4 h-4 top-[40%] left-[70%] animate-droplet animation-delay-400"></div>
        <div className="absolute bg-blue-100 rounded-full w-3 h-3 top-[30%] left-[80%] animate-droplet animation-delay-150"></div>
        <div className="absolute bg-blue-100 rounded-full w-6 h-6 top-[60%] left-[20%] animate-droplet animation-delay-500"></div>
        <div className="absolute bg-blue-100 rounded-full w-4 h-4 top-[75%] left-[40%] animate-droplet animation-delay-250"></div>
        <div className="absolute bg-blue-100 rounded-full w-5 h-5 top-[65%] left-[60%] animate-droplet animation-delay-350"></div>
        <div className="absolute bg-blue-100 rounded-full w-3 h-3 top-[80%] left-[85%] animate-droplet animation-delay-450"></div>
      </div>

      {/* components */}
      <HomeComponent1 />
      <HomeComponent2 />
      <HomeComponent3 />
      {/* <HomeComponent4 /> */}
      <HomeComponent5 />
      <SubscribeNewsletter />
    </section>
  );
}

export default Home;
