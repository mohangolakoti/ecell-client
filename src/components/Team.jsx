import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../data/api';
import { FaLinkedin, FaTrashAlt } from 'react-icons/fa'; // Import Trash Icon
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`${API_URL}/team`);
        setTeamMembers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch team members.');
        setLoading(false);
        console.log(err);
      }
    };

    fetchTeamMembers();
  }, []);

  const deleteTeamMember = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await axios.delete(`${API_URL}/team/${id}`);
        setTeamMembers((prevMembers) =>
          prevMembers.filter((member) => member._id !== id)
        );
        alert('Team member deleted successfully.');
      } catch (err) {
        console.error('Error deleting team member:', err);
        alert('Failed to delete team member.');
      }
    }
  };

  if (loading) return <p className='text-center mt-10'>Loading team members...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='mx-6 my-10 w-full'>
      <div className="flex justify-between w-full px-6">
        <h2 className="text-3xl font-bold font-Montserrat">Team Details</h2>
        <Link to='/create-team'><button className="bg-teal-400 px-6 py-2 rounded-lg text-background flex items-center gap-1 font-OpenSans hover:bg-teal-500"><IoMdAdd className='mt-[3px] text-lg'/> Add Team Member</button></Link>
      </div>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 ">
        {teamMembers.map((member) => (
          <div
            key={member._id}
            className="group relative bg-white rounded-lg shadow-2xl hover:scale-105 transform transition-transform duration-300"
          >
            {/* Profile Image with Hover Effect */}
            {member.profileImage && (
              <div className="relative w-full mx-auto mb-6 overflow-hidden rounded-t-lg shadow-lg ">
                <img
                  src={`http://localhost:4000${member.profileImage}`} // Update URL as per your setup
                  alt={member.name}
                  className="w-full h-60 object-cover"
                />
                <a
                  href={member.linkedInURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <FaLinkedin className="text-white text-4xl" />
                </a>
              </div>
            )}

            {/* Member Details */}
            <h3 className="text-2xl font-bold text-coral_red capitalize px-4 font-Montserrat">
              {member.name}
            </h3>
            <p className=" text-gray-600 capitalize px-4 mt-2">{member.position}</p>

            {/* Optional: Department info */}
            <p className="text-sm text-gray-500 px-4 pb-2">
              <strong>Department:</strong> {member.department}
            </p>

            {/* Delete Button */}
            <button
              onClick={() => deleteTeamMember(member._id)}
              className="absolute bottom-2 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              title="Delete Member"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
