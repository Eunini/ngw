import { DropletIcon, Rss, Activity, History, Clock } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelectedTab } from "../components/SelectedItemProvider";
import NewEntryForm from "../components/NewEntryForm";

// borehole data
const borehole_info = [
  {
    total_boreholes: 234,
    active_sensors: 808,
    active_projects: 34,
    recent_updates: 10,
  },
];

const graphsLink = [
  {
    monthDataBarGragh: "/monthData.png",
    projectsDataPieGraph: "/projectData.png",
  },
];

const recentActivities = [
  {
    activity: "Borehole assessment completed at Lagos Site",
    time: "2 hours ago",
  },
  { activity: "Sensor data updated for Abuja Project", time: "4 hours ago" },
  { activity: "Monthly analysis report generated", time: "6 hours ago" },
  { activity: "Site survey initiated in Port Harcourt", time: "8 hours ago" },
];

function NewEntry() {
  const [searchParams] = useSearchParams();
  // const [activeTab, setActiveTab] = useState("newentry");
  const { isActive, setIsActive } = useSelectedTab();

  useEffect(() => {
    if (searchParams.get("activeTab") === "newentry") {
      isActive("newentry");
    }
  }, [searchParams]);

  return (
    <section className="md:pt-24 pt-12 md:px-6 px-0">
      {/* data and others */}
      <div className="md:block hidden w-full">
        {borehole_info.slice(0, 1).map((info, index) => (
          <div
            key={index}
            className="flex flex-row gap-8 items-center justify-center"
          >
            <div className="bg-white p-4 flex flex-col gap-3 rounded-lg shadow w-[25%]">
              <div className="p-2 bg-[#EFF6FF] rounded-full w-fit">
                <DropletIcon className="text-blue-500 fill-current" />
              </div>
              <div>
                <p className="text-[16px] text-[#4B5563] p-1 rounded-full bg-[#EFF6FF] w-fit">
                  Total boreholes
                </p>
                <p className="text-[#111827] md:text-[24px] font-bold">
                  {info.total_boreholes}
                </p>
              </div>
            </div>
            <div className="bg-white p-4 flex flex-col gap-3 rounded-lg shadow w-[25%]">
              <div className="p-2 bg-[#F0FDF4] rounded-full w-fit">
                <Rss className="text-[#16A34A] fill-current" />
              </div>
              <div>
                <p className="text-[16px] text-[#4B5563] p-1 rounded-full bg-[#EFF6FF] w-fit">
                  Active sensors
                </p>
                <p className="text-[#111827] md:text-[24px] font-bold">
                  {info.active_sensors}
                </p>
              </div>
            </div>
            <div className="bg-white p-4 flex flex-col gap-3 rounded-lg shadow w-[25%]">
              <div className="p-2 bg-[#EFF6FF] rounded-full w-fit">
                <Activity className="text-[#9333EA] " />
              </div>
              <div>
                <p className="text-[16px] text-[#4B5563] p-1 rounded-full bg-[#EFF6FF] w-fit">
                  Active Projects
                </p>
                <p className="text-[#111827] md:text-[24px] font-bold">
                  {info.active_projects}
                </p>
              </div>
            </div>
            <div className="bg-white p-4 flex flex-col gap-3 rounded-lg shadow w-[25%]">
              <div className="p-2 bg-[#EFF6FF] rounded-full w-fit">
                <History className="text-[#EA580C]" />
              </div>
              <div>
                <p className="text-[16px] text-[#4B5563] p-1 rounded-full bg-[#EFF6FF] w-fit">
                  Total boreholes
                </p>
                <p className="text-[#111827] md:text-[24px] font-bold">
                  {info.total_boreholes}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* body */}
      <div className="flex flex-row justify-between mt-4 gap-3">
        {isActive === "newentry" && <NewEntryForm />}

        {/* data and others */}
        <div className="md:flex md:flex-col gap-4 hidden">
          {graphsLink.map((link, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="bg-white rounded-lg p-3 flex flex-col gap-2">
                <h1 className="text-[18px] font-semibold">Monthly Boreholes</h1>
                <div className="lg:w-[320px] lg:h-[200px] md:w-[260px] md:h-[140px]">
                  <img src={link.monthDataBarGragh} alt="" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 flex flex-col gap-2">
                <h1 className="text-[18px] font-semibold">Project Status</h1>
                <div className="lg:w-[320px] lg:h-[200px] md:w-[260px] md:h-[140px]">
                  <img src={link.projectsDataPieGraph} alt="" />
                </div>
              </div>
            </div>
          ))}
          <div className="bg-white rounded-lg p-3 flex flex-col gap-4 lg:w-[340px] md:w-[280px]">
            <h1 className="text-[18px] font-semibold w-fit">
              Recent Activities
            </h1>
            {recentActivities.slice(0, 4).map((activity, index) => (
              <div
                key={index}
                className="flex flex-col bg-[#F8F9FA] p-1 rounded-lg"
              >
                <div className="flex flex-row items-center gap-2">
                  <Clock className="w-[17.75px] h-[17.75px] text-[#9CA3AF]" />
                  <p className="text-[16px] text-[#111827] font-semibold lg:w-[80%] md:w-[70%]">
                    {activity.activity}
                  </p>
                </div>
                <p className="pl-6 text-[14px] text-[#6B7280]">
                  {activity.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewEntry;
