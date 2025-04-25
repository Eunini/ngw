import {
  Droplet,
  TrendingUpDown,
  Users,
  Handshake,
  ForwardIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { scrollToTop } from "../App";

function HomeComponent5() {
  return (
    <section className="bg-gradient-to-b from-[#1B4965] to-[#1B4965] to-[#1B4965] to-[#62B6CB] p-4 flex flex-col items-center block-div pb-8">
      <h1 className="text-white md:text-[50px] text-[30px] font-extrabold py-2 text-center">
        Creating Lasting Impact
      </h1>
      <p className="py-12 w-[100%] md:text-[20px] text-[18px] text-white text-center">
        By working with us, you're not just managing water projects—you're
        contributing to a better, more sustainable world.
      </p>
      <div className="flex flex-row flex-wrap text-left md:gap-8 sm:gap-4 gap-2 items-center justify-center mb-20 w-[100%]">
        {[
          {
            title: "Water Access",
            amount: "2M+",
            icon: (
              <Droplet className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-90" />
            ),
          },
          {
            title: "Data Points",
            amount: "10k+",
            icon: (
              <TrendingUpDown className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-90" />
            ),
          },
          {
            title: "Communities",
            amount: "500+",
            icon: (
              <Users className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-90" />
            ),
          },
          {
            title: "Partners",
            amount: "100+",
            icon: (
              <Handshake className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-90" />
            ),
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] p-6 rounded-lg md:w-70 w-36 relative flex flex-col justify-between h-full"
          >
            <div className="flex flex-row w-[100%] justify-between items-end md:mb-8">
              <div className="w-12 h-1 bg-white opacity-80 mt-2"></div>
              {item.icon}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white font-poppins">
                {item.amount}
              </h1>
              <p className="text-white text-sm sm:text-base font-openSans mt-2 opacity-90">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center text-center md:bg-white/20 md:p-4 md:rounded-3xl">
        <h1 className="font-poppins text-white md:text-[50px] text-[30px] font-extrabold py-2 text-center flex flex-col">
          Join Us in Building a Sustainable Future
        </h1>
        <p className="py-4 font-poppins w-[100%] md:text-lg text-[14px] text-white text-center">
          Start managing your water projects more efficiently today.
        </p>
        <div className="w-[100%] flex flex-row justify-center items-center">
          <Link to="/login?signup=true" className="md:w-[40%]">
            <button onClick={() => scrollToTop()} className="md:w-[100%] font-bold shadow-lg flex flex-row gap-2 text-[#1B4965] text-[14px] p-2 bg-white rounded-3xl items-center justify-center cursor-pointer hover:bg-[#1B4965] hover:text-white">
              Get Started <ForwardIcon />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeComponent5;
