import { Droplet, Layers, MapPin, TrendingUp } from "lucide-react";

function HomeComponent1() {
  return (
    // <section className="mb-10 bg-white py-10 md:px-10 px-5 text-center flex flex-col items-center justify-center">
    //   <h1 className="md:text-[50px] text-[20px] font-bold text-black font-poppins">
    //     Advancing Global Sustainability
    //   </h1>
    //   <p className="text-[#000000] py-4 md:text-base text-sm font-openSans md:w-[80%]">
    //     Our work supports the UN Sustainable Development Goals, ensuring access
    //     to clean water, responsible resource management, and resilient
    //     infrastructure. By leveraging data-driven insights, we empower
    //     governments and organizations to improve water accessibility, promote
    //     environmental sustainability, and drive lasting impact.
    //   </p>
    //   <div className="flex flex-row flex-wrap text-left md:gap-4 gap-2 items-center md:justify-between justify-center w-[100%]">
    //     <div className="bg-radial from-[#26BDE2] to-[#0A97D9] p-4 rounded-lg md:w-[24%] md:p-14 w-36">
    //       <Droplet className="w-6 h-6 text-white" />
    //       <h1 className="pt-2 font-bold text-[16px] text-white">SDG 6</h1>
    //       <p className="text-white md:text-base text-sm w-[70%]">Clean Water & Sanitation</p>
    //     </div>
    //     <div className="bg-radial from-[#FD6925] to-[#DD1367] p-4 rounded-lg w-36 md:w-[24%] md:p-14">
    //       <Layers className="w-6 h-6 text-white" />
    //       <h1 className="pt-2 font-bold text-[16px] text-white">SDG 9</h1>
    //       <p className="text-white md:text-base text-sm w-[70%]">Industry & Infrastructure</p>
    //     </div>
    //     <div className="bg-radial from-[#FD9D24] to-[#FD6925] p-4 rounded-lg w-36 md:w-[24%] md:p-14">
    //       <MapPin className="w-6 h-6 text-white" />
    //       <h1 className="pt-2 font-bold text-[16px] text-white">SDG 11</h1>
    //       <p className="text-white md:text-base text-sm w-[50%]">Sustainable Cities</p>
    //     </div>
    //     <div className="bg-radial from-[#48773C] to-[#2D5F21] p-4 rounded-lg w-36 md:w-[24%] md:p-14">
    //       <TrendingUp className="w-6 h-6 text-white" />
    //       <h1 className="pt-2 font-bold text-[16px] text-white">SDG 13</h1>
    //       <p className="text-white md:text-base text-sm w-[40%]">Climate Action</p>
    //     </div>
    //   </div>
    // </section>

    // <section className="mb-10 bg-white py-10 md:px-10 px-5 text-center flex flex-col items-center justify-center">
    //   <h1 className="md:text-[50px] text-[20px] font-bold text-black font-poppins">
    //     Advancing Global Sustainability
    //   </h1>
    //   <p className="text-[#000000] py-4 md:text-base text-sm font-openSans md:w-[80%]">
    //     Our work supports the UN Sustainable Development Goals, ensuring access
    //     to clean water, responsible resource management, and resilient
    //     infrastructure. By leveraging data-driven insights, we empower
    //     governments and organizations to improve water accessibility, promote
    //     environmental sustainability, and drive lasting impact.
    //   </p>
    //   <div className="flex flex-row flex-wrap text-left md:gap-4 gap-2 items-center md:justify-between justify-center w-[100%]">
    //     <div className="bg-radial from-[#26BDE2] to-[#0A97D9] p-6 rounded-lg md:w-[24%] md:flex md:flex-row w-36 items-center">
    //       <div className="pb-2 flex flex-col gap-2">
    //         <h1 className="font-bold md:text-[30px] text-white font-poppins">
    //           SDG 6 :
    //         </h1>
    //         <p className="text-white md:text-[24px] text-sm w-[70%] font-openSans custom-line-height">
    //           CLEAN WATER & SANITATION
    //         </p>
    //       </div>
    //       <div className="md:w-full flex md:flex-row md:justify-center">
    //         <Droplet className="md:w-30 md:h-30 w-6 h-6 text-white" />
    //       </div>
    //     </div>
    //     <div className="bg-radial from-[#FD6925] to-[#DD1367] p-6 rounded-lg md:w-[24%] md:flex md:flex-row items-center w-36">
    //       <div className="pb-2 flex flex-col gap-2">
    //         <h1 className="font-bold md:text-[30px] text-white font-poppins">
    //           SDG 9 :
    //         </h1>
    //         <p className="text-white md:text-[24px] text-sm w-[60%] font-openSans custom-line-height">
    //           Industry & Infrastructure
    //         </p>
    //       </div>
    //       <div className="md:w-full flex md:flex-row md:justify-center">
    //         <Layers className="md:w-30 md:h-30 w-6 h-6 text-white" />
    //       </div>
    //     </div>
    //     <div className="bg-radial from-[#FD9D24] to-[#FD6925] md:h-49 p-6 rounded-lg md:w-[24%] md:flex md:flex-row items-center w-36">
    //       <div className="pb-2 flex flex-col gap-2">
    //         <h1 className="font-bold md:text-[30px] text-white font-poppins">
    //           SDG 11 :
    //         </h1>
    //         <p className="text-white md:text-[24px] text-sm w-[60%] font-openSans custom-line-height">
    //           Sustainable Cities
    //         </p>
    //       </div>
    //       <div className="md:w-full flex md:flex-row md:justify-center">
    //         <MapPin className="md:w-30 md:h-30 w-6 h-6 text-white" />
    //       </div>
    //     </div>
    //     <div className="bg-radial from-[#48773C] to-[#2D5F21] p-4 rounded-lg md:w-[24%] md:flex md:flex-row justify-center items-center w-36">
    //       <div className="pb-2 flex flex-col gap-2">
    //         <h1 className="font-bold md:text-[30px] text-white font-poppins">
    //           SDG 13:
    //         </h1>
    //         <p className="text-white md:text-[24px] text-sm w-[90%] font-openSans custom-line-height">
    //           Climate Action
    //         </p>
    //       </div>
    //       <div className="md:w-full flex md:flex-row md:justify-center">
    //         <TrendingUp className="md:w-30 md:h-30 w-6 h-6 text-white" />
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="bg-white py-12 lg:py-16 px-4 sm:px-6 lg:px-8 w-full block-div">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-poppins leading-tight">
            Advancing Global{" "}
            <span className="text-[#0A2647]">Sustainability</span>
          </h1>
          <div className="mt-6 mx-auto h-1 w-24 bg-[#0A2647] rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="lg:w-1/2 lg:pr-8 md:pl-10">
            <p className="text-black text-lg sm:text-xl leading-relaxed font-openSans md:w-[100%]">
              Our work supports the UN Sustainable Development Goals, ensuring
              access to clean water, responsible resource management, and
              resilient infrastructure. By leveraging data-driven insights, we
              empower governments and organizations to improve water
              accessibility, promote environmental sustainability, and drive
              lasting impact.
            </p>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="grid sm:grid-cols-1 grid-cols-2 sm:grid-cols-2 grid-rows sm:gap-5 gap-2">
              {[
                {
                  section: "SDG 6",
                  detail: "CLEAN WATER & SANITATION",
                  bg_from: "#26BDE2",
                  bg_to: "#0A97D9",
                  icon: (
                    <Droplet className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-90" />
                  ),
                  delay: "100",
                },
                {
                  section: "SDG 9",
                  detail: "Industry & Infrastructure",
                  bg_from: "#FD6925",
                  bg_to: "#DD1367",
                  icon: (
                    <Layers className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-90" />
                  ),
                  delay: "200",
                },
                {
                  section: "SDG 11",
                  detail: "Sustainable Cities",
                  bg_from: "#FD9D24",
                  bg_to: "#FD6925",
                  icon: (
                    <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-90" />
                  ),
                  delay: "300",
                },
                {
                  section: "SDG 13",
                  detail: "Climate Action",
                  bg_from: "#48773C",
                  bg_to: "#2D5F21",
                  icon: (
                    <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-90" />
                  ),
                  delay: "400",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className={`group flex relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-50 sm:h-48  w-[100%]`}
                  style={{
                    background: `radial-gradient(circle at top left, ${card.bg_from}, ${card.bg_to})`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="relative h-full p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-poppins">
                        {card.section}
                      </h3>
                      <p className="text-white text-sm sm:text-base font-openSans mt-2 opacity-90">
                        {card.detail}
                      </p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="w-12 h-1 bg-white opacity-80 mt-2"></div>
                      <div className="transform group-hover:scale-110 transition-transform duration-300">
                        {card.icon}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeComponent1;
