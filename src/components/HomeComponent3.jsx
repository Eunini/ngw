import { Users } from "lucide-react";

function HomeComponent3() {
  return (
    <div className="md:py-0 md:pb-8 md:py-10 py-4 w-[100%] md:p-4 flex flex-row flex-wrap md:bg-white bg-transparent md:justify-around block-div">
      <div className="w-full flex flex-col items-center md:py-8">
        <h1 className=" md:block hidden text-[#0A2647] md:text-[50px] text-center font-extrabold">
            Expert Network
          </h1>
          <div className="w-full md:flex md:flex-row hidden gap-4 justify-center items-center">
            <div className="my-2 w-[10%] h-1 bg-[#0A2647] rounded-full flex flex-row justify-center"></div>
            <div className="my-2 w-[2%] h-1 bg-[#0A2647] rounded-full flex flex-row justify-center"></div>
          </div>
      </div>
      <section className="md:block hidden w-[40%] h-100 ">
        <img src="/ngwater-expert3.png" alt="network" className="rounded-3xl object-cover w-full h-full border-1 border-[#0A2647]"/>
      </section>
      <section className="md:w-[55%] md:p-1 md:pb-1 p-4 pb-8 md:bg-transparent bg-white md:flex md:flex-col">
        <h1 className="md:hidden block text-[#0A2647] md:text-[40px] text-[30px] font-bold font-poppins py-4">
          Expert Network
        </h1>
        <div className="md:block-fade-2 bg-[#F0F7F9] md:bg-radial md:from-[#F0F7F9] md:to-[#F0F7FA] p-4 md:pl-8 rounded-lg md:rounded-3xl text-[#0A2647] md:w-full w-[90%] md:border-1 md:border-[#0A2647] md:h-100 h-72 flex flex-col md:justify-center">
          <Users className="md:w-14 md:h-14" />
          <div className="font-openSans md:py-6">
            <p className="py-4 md:w-[90%] md:text-lg md:text-xl text-[16px] py-8">
              We collaborate with hundreds of experienced and licensed
              hydrogeologists, civil/water engineers, and drilling contractors
              across Nigeria, ensuring a trusted and reliable database.
            </p>
            <div className="flex flex-row items-center">
              <div className="w-8 h-8 rounded-full bg-[#62B6CB] border-3 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-[#62B6CB] -ml-4 border-3 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-[#62B6CB] -ml-4 border-3 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-[#62B6CB] -ml-4 border-l-3 border-t-3 border-b-3 border-white"></div>
              <h1 className="px-4 md:text-[20px] text-[16px]">500+ Experts</h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeComponent3;
