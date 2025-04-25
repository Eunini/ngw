import { Bell, ChevronDown } from "lucide-react"
import { userData } from "../pages/UserDashboard";

function UserDashboardHeader({activeSection}) {
  return (
    <div className="w-full p-4 flex flex-row justify-between items-center">
      <h1 className="font-extrabold text-[24px] text-[#1A365D]">{activeSection}</h1>
      <div className="items-center flex flex-row gap-6">
        <Bell className="w-5 h-5" />
        <div className="flex flex-row gap-2 items-center">
          <div className="w-6 h-6">
            <img
              src={userData.map((data) => data.profile_pic)}
              alt="pfp"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <p className="text-[#1A365D] text-[12px] font-bold">{userData.map((data) => data.userName)}</p>
            <p className="text-[#1A365D] text-[10px]">{userData.map((data) => data.specialization)}</p>
          </div>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default UserDashboardHeader;
