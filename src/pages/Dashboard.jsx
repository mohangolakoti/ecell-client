import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCheck,
  FaUsers,
  FaRegClipboard,
  FaChartPie,
  FaUsersCog,
} from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../data/api";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalEvents: 0,
    activeEvents: 0,
    completedEvents: 0,
    totalRegistrations: 0,
    totalParticipants: 0,
    avgTeamSize: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [eventCounts, participantStats] = await Promise.all([
          axios.get(`${API_URL}/events/eventCounts`), // Endpoint for event counts
          axios.get(`${API_URL}/registrations/participantStats`), // Endpoint for participant stats
        ]);

        setDashboardData({
          totalEvents: eventCounts.data.totalEvents,
          activeEvents: eventCounts.data.activeEvents,
          completedEvents: eventCounts.data.pastEvents,
          totalRegistrations: participantStats.data.totalTeams,
          totalParticipants: participantStats.data.totalParticipants,
          avgTeamSize: participantStats.data.avgTeamSize,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="mx-6 my-10">
      <div className="flex justify-between w-full px-6">
        <h2 className="text-3xl font-bold font-Montserrat">Dashboard</h2>
        <Link to='/'><button className="hover:bg-[#dc2626] px-6 py-2 rounded-lg text-background flex items-center gap-1 bg-coral_red"><IoIosLogOut className='mt-[3px] text-lg'/> Logout</button></Link>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-14 my-14 mx-10 font-OpenSans">
        <div className="border-l-8 border-blue-500 px-5 py-4 gap-10 bg-white shadow-lg rounded-lg flex items-center hover:shadow-xl hover:scale-105">
          <FaCalendarAlt className="text-blue-500 text-6xl mr-4" />
          <div className="text-xl">
            <p className="text-gray-600 py-2">Total Events</p>
            <p className="text-2xl font-bold py-2">{dashboardData.totalEvents}</p>
          </div>
        </div>
        <div className="border-l-8 border-green-500 px-5 py-4 gap-10 bg-white shadow-lg rounded-lg flex items-center hover:shadow-xl hover:scale-105">
          <FaCheck className="text-green-500 text-6xl mr-4" />
          <div className="text-xl">
            <p className="text-gray-600 py-2">Active Events</p>
            <p className="text-2xl font-bold py-2">{dashboardData.activeEvents}</p>
          </div>
        </div>
        <div className="border-l-8 border-yellow-500 px-5 py-4 gap-10 bg-white shadow-lg rounded-lg flex items-center hover:shadow-xl hover:scale-105">
          <FaRegClipboard className="text-yellow-500 text-6xl mr-4" />
          <div className="text-xl">
            <p className="text-gray-600 py-2">Total Registrations</p>
            <p className="text-2xl font-bold py-2">{dashboardData.totalRegistrations}</p>
          </div>
        </div>
        <div className="border-l-8 border-red-500 px-5 py-4 gap-10 bg-white shadow-lg rounded-lg flex items-center hover:shadow-xl hover:scale-105">
          <FaChartPie className="text-red-500 text-6xl mr-4" />
          <div className="text-xl">
            <p className="text-gray-600 py-2">Completed Events</p>
            <p className="text-2xl font-bold py-2">{dashboardData.completedEvents}</p>
          </div>
        </div>
        <div className="border-l-8 border-purple-500 px-5 py-4 gap-10 bg-white shadow-lg rounded-lg flex items-center hover:shadow-xl hover:scale-105">
          <FaUsers className="text-purple-500 text-6xl mr-4" />
          <div className="text-xl">
            <p className="text-gray-600 py-2">Total Participants</p>
            <p className="text-2xl font-bold py-2">{dashboardData.totalParticipants}</p>
          </div>
        </div>
        <div className="border-l-8 border-teal-500 px-5 py-4 gap-10 bg-white shadow-lg rounded-lg flex items-center hover:shadow-xl hover:scale-105">
          <FaUsersCog className="text-teal-500 text-6xl mr-4" />
          <div className="text-xl">
            <p className="text-gray-600 py-2">Avg Team Size</p>
            <p className="text-2xl font-bold py-2">{dashboardData.avgTeamSize}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
