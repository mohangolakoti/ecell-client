import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../data/api';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';

const JudgingCriteriaComponent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [judgingCriteria, setJudgingCriteria] = useState([]);
  const [teams, setTeams] = useState([]);
  const [scores, setScores] = useState({}); // Stores scores for teams and criteria

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/events`);
        setEvents(response.data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (!selectedEventId) return;

    const fetchJudgingCriteria = async () => {
      try {
        const response = await axios.get(`${API_URL}/events/${selectedEventId}/judgingDetails`);
        setJudgingCriteria(response.data.judgingDetails[0]?.criteria || []);
      } catch (error) {
        console.error('Error fetching judging criteria:', error);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${API_URL}/events/${selectedEventId}/teams`);
        setTeams(response.data.teams || []);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchJudgingCriteria();
    fetchTeams();
  }, [selectedEventId]);

  const handleScoreChange = (teamId, criterionName, weightage, value) => {
    const parsedValue = Math.min(Number(value), weightage); // Ensure input doesn't exceed weightage
    setScores((prevScores) => ({
      ...prevScores,
      [teamId]: {
        ...prevScores[teamId],
        [criterionName]: parsedValue,
      },
    }));
  };

  const calculateOverallScore = (teamId) => {
    if (!scores[teamId]) return 0;
    return judgingCriteria.reduce(
      (total, criterion) => total + (scores[teamId][criterion.name] || 0),
      0
    );
  };

  const handleSaveScores = async () => {
    try {
      await axios.post(`${API_URL}/events/${selectedEventId}/saveScores`, { scores });
      alert('Scores saved successfully!');
    } catch (error) {
      console.error('Error saving scores:', error);
      alert('Failed to save scores.');
    }
  };

  return (
    <div className="mx-6 my-10 w-full">
      <div className="flex justify-between w-full px-6">
        <h2 className="text-3xl font-bold font-Montserrat">Judging Criteria</h2>
        <Link to='/judging-form'><button className="bg-yellow-400 px-6 py-2 rounded-lg text-background flex items-center gap-1 hover:bg-yellow-500"><IoMdAdd className='mt-[3px] text-lg'/> Add Criteria</button></Link>
      </div>

      {/* Dropdown to Select Event */}
      <div className="my-10 mx-8">
        <label htmlFor="events" className="block font-semibold text-lg mb-2 font-Montserrat">
          Select Event:
        </label>
        <select
          id="events"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
          className="border p-2 rounded w-full font-OpenSans"
        >
          <option value="">Select Event For Judging </option>
          {events.map((event) => (
            <option key={event._id} value={event._id} className='p-2'>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table to Display Criteria, Input Scores, and Overall Score */}
      {judgingCriteria.length > 0 && teams.length > 0 && (
        <div className='mx-8'>
          <h3 className="text-lg font-semibold mb-4 font-Montserrat">Judging Criteria and Scores</h3>
          <table className="table-auto w-full font-OpenSans">
            <thead>
              <tr className='bg-accent text-background font-semibold font-Montserrat'>
                <th className="p-4 rounded-tl-xl">Team Name</th>
                {judgingCriteria.map((criterion, index) => (
                  <th key={index} className="px-4 py-2">
                    {criterion.name} (Max: {criterion.weightage})
                  </th>
                ))}
                <th className="p-4 rounded-tr-xl">Overall Score</th>
              </tr>
            </thead>
            <tbody className='text-[#676767] text-sm font-OpenSans'>
              {teams.map((team) => (
                <tr key={team._id} className='border-b-2 border-muted text-[#676767] bg-yellow-50 hover:bg-yellow-100'>
                  <td className="p-4">{team.teamName}</td>
                  {judgingCriteria.map((criterion, index) => (
                    <td key={index} className="p-4">
                      <input
                        type="number"
                        value={scores[team._id]?.[criterion.name] || ''}
                        onChange={(e) =>
                          handleScoreChange(
                            team._id,
                            criterion.name,
                            criterion.weightage,
                            e.target.value
                          )
                        }
                        className="border p-2 rounded w-full bg-transparent"
                      />
                    </td>
                  ))}
                  <td className="p-4 font-semibold text-blue-900">
                    {calculateOverallScore(team._id)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleSaveScores}
            className="mt-4 bg-blue-800 text-white px-4 py-2 rounded"
          >
            Save Scores
          </button>
        </div>
      )}
    </div>
  );
};

export default JudgingCriteriaComponent;
