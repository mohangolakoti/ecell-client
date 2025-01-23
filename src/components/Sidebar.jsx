import { Link } from 'react-router-dom';
import Ecell from '../constants/logos/ecell_logo.svg';
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaGavel,
  FaClipboardList,
  FaChartBar,
  FaUsers,
  FaBook,
  FaCog,
} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="h-full w-full px-4 bg-primary text-white font-Roboto font-medium shadow-xl shadow-black rounded-r-lg border-red-500">
      <div className="text-center text-3xl font-bold font-Montserrat flex items-center gap-3">
        <Link to='/'>
        <img src={Ecell} alt="logo" className="w-16" /></Link>
        <p className="mt-6">Ecell</p>
      </div>
      <hr />
      <ul className="leading-10 mt-6">
        <Link to="/dashboard">
          <li className="px-4 py-2 hover:bg-text cursor-pointer rounded-md flex items-center hover:text-blue-400">
            <FaTachometerAlt className="mr-2 text-blue-400" /> Dashboard
          </li>
        </Link>
        <Link to="/events">
          <li className="px-4 py-2 hover:bg-text cursor-pointer rounded-md flex items-center hover:text-[#5ad157]">
            <FaCalendarAlt className="mr-2 text-[#5ad157]" /> Events
          </li>
        </Link>
        <Link to="/judging">
          <li className="px-4 py-2 hover:bg-text cursor-pointer rounded-md flex items-center hover:text-yellow-400">
            <FaGavel className="mr-2 text-yellow-400" /> Judging
          </li>
        </Link>
        <Link to="/registrations">
          <li className="px-4 py-2 hover:bg-text cursor-pointer rounded-md flex items-center hover:text-red-400">
            <FaClipboardList className="mr-2 text-red-400" /> Registrations
          </li>
        </Link>
        <Link to="/analytics">
          <li className="px-4 py-2 hover:bg-text cursor-pointer rounded-md flex items-center hover:text-purple-400">
            <FaChartBar className="mr-2 text-purple-400" /> Analytics
          </li>
        </Link>
        <Link to="/team">
          <li className="px-4 py-2 hover:bg-text cursor-pointer rounded-md flex items-center hover:text-teal-400">
            <FaUsers className="mr-2 text-teal-400" /> Team
          </li>
        </Link>
        <Link to="/case-studies">
          <li className="px-4 py-2 hover:bg-text cursor-pointer rounded-md flex items-center hover:text-pink-400">
            <FaBook className="mr-2 text-pink-400" /> Case Studies
          </li>
        </Link>
        <Link to="/settings">
          <li className="px-4 py-2 hover:bg-text cursor-pointer rounded-md flex items-center hover:text-gray-400">
            <FaCog className="mr-2 text-gray-400" /> Settings
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
