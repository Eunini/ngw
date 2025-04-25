import CountUp from "./CountUp";

function HomeComponent2() {
  return (
    <main className="bg-white pt-4 block-div">
      <div className="flex flex-col items-center md:py-8 py-2">
        <h1 className="font-extrabold text-[#0A2647] md:text-[50px] text-[30px] outline-white-200 sm:block hidden text-center">
          Our Impact Across Nigeria
        </h1>
        <div className="w-full md:flex md:flex-row hidden gap-4 justify-center items-center">
          <div className="my-2 w-[10%] h-1 bg-[#0A2647] rounded-full flex flex-row justify-center"></div>
          <div className="my-2 w-[2%] h-1 bg-[#0A2647] rounded-full flex flex-row justify-center"></div>
        </div>
      </div>
      <section className="flex flex-col md:justify-center text-center items-center py-4 md:px-10 px-5 md:bg-[url('/nigeriaMap.png')] md:bg-cover md:h-120">
        <h1 className="text-[#0A2647] md:text-[50px] text-[30px] outline-white-200 font-bold sm:hidden block">
          Our Impact Across Nigeria
        </h1>
        <div className="w-full md:hidden flex flex-row gap-4 justify-center items-center">
          <div className="my-2 w-[10%] h-1 bg-[#0A2647] rounded-full flex flex-row justify-center"></div>
          <div className="my-2 w-[2%] h-1 bg-[#0A2647] rounded-full flex flex-row justify-center"></div>
        </div>
        <div className="p-2 md:bg-white bg-transparent md:hidden block md:w-[40%] md:h-[30%] w-[80%] h-[70%] my-4">
          <img
            src="/nigeriaMap.png"
            alt="Nigeria Map"
            className="rounded-lg object-fit"
          />
        </div>
        {/* Just for mobile */}
        <div className="flex flex-row flex-wrap gap-4 md:hidden items-center justify-center">
          <div className="bg-[F4FCFE] shadow-xl text-left p-4 rounded-lg md:w-50 w-36">
            <h1 className="font-bold text-[20px] text-[#1B4965]">200+</h1>
            <p className="text-[14px] text-[#4B5563] w-20">Active Projects</p>
          </div>
          <div className="bg-[F4FCFE] shadow-xl text-left p-4 rounded-lg md:w-50 w-36">
            <h1 className="font-bold text-[20px] text-[#1B4965]">500+</h1>
            <p className="text-[14px] text-[#4B5563] w-20">
              Communities Served
            </p>
          </div>
          <div className="bg-[F4FCFE] shadow-xl text-left p-4 rounded-lg md:w-50 w-36">
            <h1 className="font-bold text-[20px] text-[#1B4965]">1,000+</h1>
            <p className="text-[14px] text-[#4B5563] w-20">Water Sources</p>
          </div>
          <div className="bg-[F4FCFE] shadow-xl text-left p-4 rounded-lg md:w-50 w-36">
            <h1 className="font-bold text-[20px] text-[#1B4965]">10,000+</h1>
            <p className="text-[14px] text-[#4B5563] w-16">Data Points</p>
          </div>
        </div>
        {/* For tablet n pc */}
        <div className="bg-white/60 p-4 rounded-lg w-full py-10 rounded-2xl text-center md:flex md:flex-row md:justify-between px-14 md:items-center hidden">
          <div className="">
            {/* <h1 className="lg:text-[48px] text-[35px] text-[#0A2647] font-bold">200+</h1> */}
            <h1 className="lg:text-[48px] text-[35px] text-[#0A2647] font-bold flex flex-row">
              <CountUp target={200}></CountUp>+
            </h1>
            <p className="lg:text-[18px] text-[12px]">Active Projects</p>
          </div>
          <div>
            {/* <h1 className="lg:text-[48px] text-[35px] text-[#0A2647] font-bold">500+</h1> */}
            <h1 className="lg:text-[48px] text-[35px] text-[#0A2647] font-bold flex flex-row">
              <CountUp target={500}></CountUp>+
            </h1>
            <p className="lg:text-[18px] text-[12px]">Communities Served</p>
          </div>
          <div>
            {/* <h1 className="lg:text-[48px] text-[35px] text-[#0A2647] font-bold">1000+</h1> */}
            <h1 className="lg:text-[48px] text-[35px] text-[#0A2647] font-bold flex flex-row">
              <CountUp target={1000}></CountUp>+
            </h1>
            <p className="lg:text-[18px] text-[12px]">Water Sources</p>
          </div>
          <div>
            {/* <h1 className="lg:text-[48px] text-[35px] text-[#0A2647] font-bold">10,000+</h1> */}
            <h1 className="lg:text-[48px] text-[35px] text-[#0A2647] font-bold flex flex-row">
              <CountUp target={10000}></CountUp>+
            </h1>
            <p className="lg:text-[18px] text-[12px]">Data Points</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomeComponent2;
