import { useEffect, useState, useRef } from "react";
import { FaLinkedin } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import sound from '../constants/hover.mp3'
import { API_IMG, API_URL } from "../data/api";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const hoverSoundRef = useRef(null); // Ref for hover sound

  // Fetch team members data from API
  useEffect(() => {
    Aos.init({ duration: 2000 });
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(`${API_URL}/team`);
        setTeamMembers(response.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };
    fetchTeamData();
  }, []);

  // Play hover sound
  const playHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0; // Reset sound to start
      hoverSoundRef.current.play();
    }
  };

  return (
    <div className="py-16 px-6">
      {/* Sound Effect */}
      <audio ref={hoverSoundRef} src={sound} preload="auto"></audio>

      <h2 className="text-3xl font-bold text-white text-center mb-12">
        Meet Our <span className="text-indigo-500">Team</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member._id}
            className="relative group w-full min-h-[260px] rounded-lg shadow-lg overflow-hidden border-2 border-gray-700 transition-transform duration-300 hover:scale-105 hover:border-indigo-500 hover:shadow-md hover:shadow-indigo-500"
            data-aos="fade-up"
            onMouseEnter={playHoverSound} // Trigger sound on hover
          >
            {/* Card Image */}
            <img
              src={`${API_IMG}${member.profileImage}`}
              alt={member.name}
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Card Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-35 transition-opacity duration-300 group-hover:opacity-80"></div>

            {/* Card Content */}
            <div className="relative z-10 p-4 flex flex-col justify-between h-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-center">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-300">{member.position}</p>
                <p className="text-xs text-gray-400 mt-1">{member.department}</p>
              </div>
              <div className="flex justify-center mt-4">
                <a
                  href={member.linkedInURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-white hover:text-indigo-400 transition-colors"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
