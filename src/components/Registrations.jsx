import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../data/api";
import { GrStatusGoodSmall } from "react-icons/gr";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";

const Registrations = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/events`);
        setEvents(response.data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events.");
      }
    };
    fetchEvents();
  }, []);

  const fetchRegistrations = async (eventId) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/events/${eventId}/registeredTeams`);
      setRegistrations(response.data.registrations || []);
    } catch (err) {
      console.error("Error fetching registrations:", err);
      setError("Failed to fetch registrations.");
    } finally {
      setLoading(false);
    }
  };

  const handleEventChange = (e) => {
    const eventId = e.target.value;
    setSelectedEvent(eventId);
    if (eventId) {
      fetchRegistrations(eventId);
    } else {
      setRegistrations([]);
    }
  };

  const updateStatus = async (teamId, status) => {
    try {
      const response = await axios.patch(`${API_URL}/registrations/${teamId}`, { status });
      setRegistrations((prev) =>
        prev.map((team) =>
          team._id === teamId ? { ...team, status: response.data.registration.status } : team
        )
      );
      alert(`Team status updated to ${status}`);
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update team status.");
    }
  };

  return (
    <div className="mx-6 my-10 w-full">
      <div className="flex justify-between w-full px-6">
        <h2 className="text-3xl font-bold font-Montserrat">Manage Registrations</h2>
      </div>

      <div className="flex flex-col my-6 mx-8 mt-10">
        <label htmlFor="eventSelect" className="text-lg mb-2 font-semibold font-Montserrat">
          Select Event:
        </label>
        <select
          id="eventSelect"
          value={selectedEvent}
          onChange={handleEventChange}
          className="border px-4 py-2 rounded-md mb-4 w-full text-gray-700 font-OpenSans"
        >
          <option value="">Select an Event For Registrations</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-center text-red-600 font-semibold">{error}</p>}
      {loading && <p className="text-center text-blue-600 font-semibold">Loading registered teams...</p>}

      {!loading && registrations.length > 0 && (
        <div className="flex justify-center mx-8">
          <table className="text-left my-6 w-full shadow-md">
            <thead className="bg-accent text-background font-semibold">
              <tr className="font-Montserrat text-base">
                <th className="px-4 py-4 rounded-tl-xl">Team Name</th>
                <th className="px-4 py-4">Team Size</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4 rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="font-OpenSans text-sm">
  {registrations.map((team) => (
    <tr
      key={team._id}
      className="hover:bg-red-100 bg-red-50 border-b-2 border-muted hover:shadow-sm text-gray-500 font-medium"
    >
      <td className="px-4 py-3">{team.teamName}</td>
      <td className="px-4 py-3">{team.teamSize}</td>
      <td className="px-4 py-3 "
      >
        <button className={`px-4 py-1 rounded-full border flex gap-1
        ${team.status === 'Pending' ? 'border-yellow-500 text-yellow-500' : ''}
        ${team.status === 'Approved' ? 'border-green-600 text-green-600' : ''}
        ${team.status === 'Rejected' ? 'border-red-600 text-red-600' : ''}`}>
<GrStatusGoodSmall className="mt-1" />{team.status}
        </button>
      </td>
      <td className="px-4 py-3 flex gap-2">
        <button
          onClick={() => updateStatus(team._id, "Approved")}
          className="hover:border-green-500 border hover:text-green-500 px-2 py-2 rounded-full bg-green-600 hover:bg-transparent text-white"
        >
          <MdOutlineDone />
        </button>
        <button
          onClick={() => updateStatus(team._id, "Rejected")}
          className="hover:border-red-500 border hover:text-red-500 px-2 py-2 rounded-full bg-red-600 hover:bg-transparent text-white"
        >
          <IoCloseOutline />
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      )}

      {!loading && registrations.length === 0 && selectedEvent && (
        <p className="text-center text-gray-600 font-medium">No registered teams for this event.</p>
      )}
    </div>
  );
};

export default Registrations;
