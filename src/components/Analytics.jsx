import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../data/api";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,  // Register the ArcElement for Pie charts
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
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
          axios.get(`${API_URL}/events/eventCounts`),
          axios.get(`${API_URL}/registrations/participantStats`),
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

  const pieChartData = {
    labels: ['Active Events', 'Completed Events'],
    datasets: [
      {
        data: [dashboardData.activeEvents, dashboardData.completedEvents],
        backgroundColor: ['#34D399', '#F59E0B'],
      },
    ],
  };

  const barChartData = {
    labels: ['Total Events', 'Total Registrations', 'Total Participants', 'Avg Team Size'],
    datasets: [
      {
        label: 'Statistics',
        data: [
          dashboardData.totalEvents,
          dashboardData.totalRegistrations,
          dashboardData.totalParticipants,
          dashboardData.avgTeamSize,
        ],
        backgroundColor: '#3B82F6',
        borderColor: '#2563EB',
        borderWidth: 1,
      },
    ],
  };

  const progressData = {
    percentage: (dashboardData.avgTeamSize / 10) * 100, // Assuming avg team size scale
  };

  return (
    <div className="mx-6 my-10">
      <div className="flex justify-between w-full px-6">
        <h2 className="text-3xl font-bold font-Montserrat">Dashboard</h2>
        <Link to='/'>
          <button className="hover:bg-[#dc2626] px-6 py-2 rounded-lg text-background flex items-center gap-1 bg-coral_red">
            <IoIosLogOut className='mt-[3px] text-lg' /> Logout
          </button>
        </Link>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-14 my-14 mx-10 font-OpenSans">
        
        {/* Active Events Card with Pie Chart */}
        <div className="border-l-8 border-green-500 px-5 py-4 gap-10 bg-white shadow-lg rounded-lg flex items-center justify-center hover:shadow-xl hover:scale-105">
          
          <div className="text-xl">
            <p className="text-gray-600 py-2">Active vs Completed Events</p>
            <Pie data={pieChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        </div>

        {/* Total Participants Card with Bar Chart */}
        <div className="border-l-8 border-purple-500 px-5 py-4 gap-10 bg-white shadow-lg rounded-lg flex justify-center items-center hover:shadow-xl hover:scale-105">
          <div className="text-xl">
            <p className="text-gray-600 py-2">Total Participants</p>
            <Bar data={barChartData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Avg Team Size Card with Progress Bar */}
        {/* <div className="border-l-8 border-teal-500 px-5 py-4 gap-10 bg-white shadow-lg rounded-lg flex items-center hover:shadow-xl hover:scale-105">
          <div className="text-xl">
            <p className="text-gray-600 py-2">Avg Team Size</p>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="font-semibold text-sm">Team Size Progress</span>
                </div>
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600">
                    {Math.round(progressData.percentage)}%
                  </span>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="relative flex w-full flex-grow items-center">
                  <div className="flex h-2 w-full mb-2 bg-gray-200">
                    <div
                      className="flex flex-col text-center justify-center text-xs text-teal-100 bg-teal-500 leading-none"
                      style={{ width: `${progressData.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

      </div>

      {/* Bar Chart for Overall Stats */}
      <div className="w-full p-4 mt-10">
        <h3 className="text-2xl font-semibold text-gray-800">Overall Stats</h3>
        <Bar data={barChartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Analytics;
