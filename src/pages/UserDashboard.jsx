import SideNav from "../components/SideNav";
import UserDashboardHome from "../components/UserDashBoardHome";
import { useActiveTab } from "../components/ActiveTabContext";
import DatabaseCard from "../components/DatabaseCard";
import NewEntryForm from "../components/NewEntryForm";
import Footer from "./AdminDashboard/components/Footer";
import FeedbackForm from "./Feedback";
import UserDashboardHeader from "../components/UserDashboardHeader";
import Reports from "../components/Reports";

export const userData = [
  {
    userName: "Temitope Akinsola",
    specialization: "Hydrogeologist",
    profile_pic: "/userpfp.png",
  },
];

function UserDashboard() {
  const { isActive, setIsActive } = useActiveTab();

  return (
    <section className="w-full flex flex-col justify-between min-h-screen">
      <section className="flex flex-row gap-4">
        <SideNav />
        {isActive === "Home" && <UserDashboardHome />}
        {isActive === "Projects" && <DatabaseCard />}
        {isActive === "New Entry" && <NewEntryForm />}
        {isActive === "Reports" && <Reports />}
        {isActive === "Feedback" && (
          <div className="md:pl-64 pl-0">
            <UserDashboardHeader activeSection={"Feedback Form"} />
            <FeedbackForm />
          </div>
        )}
      </section>
      <section className="pl-64 md:block hidden">
        <Footer />
      </section>
    </section>
  );
}

export default UserDashboard;
