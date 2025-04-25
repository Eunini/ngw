import { BarChart, UploadCloud, Gauge, BarChart2 } from "lucide-react";

function HomeComponent4() {
  return (
    <section className="p-4 block-div">
      <div className="flex flex-col items-center md:py-8 py-4">
        <h1 className="text-[#0A2647] md:text-[50px] text-[30px] font-extrabold font-poppins text-center">
          Powerful Data Visualization
        </h1>
        <div className="w-full flex flex-row gap-4 justify-center items-center">
              <div className="my-2 w-[10%] h-1 bg-[#0A2647] rounded-full flex flex-row justify-center"></div>
              <div className="my-2 w-[2%] h-1 bg-[#0A2647] rounded-full flex flex-row justify-center"></div>
            </div>
      </div>
      <div className="w-[100%] flex flex-row md:justify-around">
        <div className="md:w-[55%] md:bg-white bg-transparent md:h-100 md:border-1 md:border-[#0A2647] md:p-4 md:rounded-3xl flex flex-col justify-around">
          <p className="font-openSans py-4 md:w-[100%] w-[100%] md:text-lg text-[16px] text-[#0A2647] md:text-left text-center">
            Our platform integrates Power BI for real-time data visualization,
            helping governments and organizations manage water projects efficiently.
          </p>
          <div className="flex flex-row flex-wrap text-left md:gap-4 gap-2 items-center md:justify-start justify-center">
            <div className="md:bg-[#F0F7F9] bg-white shadow-lg p-4 rounded-lg md:w-40 w-36">
              <BarChart className="w-6 h-6 text-[#0A2647]" />
              <p className="md:text-base text-[#0A2647] text-sm w-[70%]">
                Real-time Analytics
              </p>
            </div>
            <div className="md:bg-[#F0F7F9] bg-white shadow-lg p-4 rounded-lg md:w-40 w-36">
              <UploadCloud className="w-6 h-6 text-[#0A2647]" />
              <p className="text-[#0A2647] md:text-base text-sm w-[70%]">
                Mobile Collection
              </p>
            </div>
            <div className="md:bg-[#F0F7F9] bg-white shadow-lg p-4 rounded-lg md:w-40 w-36">
              <Gauge className="w-6 h-6 text-[#0A2647]" />
              <p className="text-[#0A2647] md:text-base text-sm w-[70%]">
                Performance Metrics
              </p>
            </div>
            <div className="md:bg-[#F0F7F9] bg-white shadow-lg p-4 rounded-lg md:w-40 w-36">
              <BarChart2 className="w-6 h-6 text-[#0A2647]" />
              <p className="text-[#0A2647] md:text-base text-sm w-[70%]">
                Smart Dashboards
              </p>
            </div>
          </div>
        </div>
        <div className="w-[40%] md:block hidden h-100">
          <img src="data-visualization.jpg" alt="data-visualization" className="object-cover w-full h-full rounded-3xl border-1 border-[]"/>
        </div>
      </div>
    </section>
  );
}

export default HomeComponent4;
