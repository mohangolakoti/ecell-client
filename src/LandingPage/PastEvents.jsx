import { useState, useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";
import Aos from "aos";
import "aos/dist/aos.css";
import { API_IMG, API_URL } from "../data/api";

export default function PastEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  useEffect(() => {
    // Fetch the events data from the API
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/events`);
        const data = await response.json();

        // Filter past events based on the current date
        const pastEvents = data.filter((event) => new Date(event.eventDate) < new Date());
        setEvents(pastEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="text-white mx-20 mt-24">
      <h1 className="font-bold text-3xl text-center py-10 pb-14 font-Montserrat">Past Events</h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div className="p-2 w-full" data-aos="fade-up" key={event._id}>
              <img
                src={`${API_IMG}${event.image}`} // Default image if imageUrl is missing
                alt={event.name}
                className="h-64 w-full rounded-t-xl hover:scale-105"
              />
              <div className="bg-slate-950 border-b-2 py-6 rounded-b-md px-4 flex flex-col gap-3 justify-center font-OpenSans">
                <h1 className="font-Roboto font-semibold text-xl mb-2 capitalize">{event.name}</h1>
                <div className="flex">
                  <Calendar className="h-5 w-5 mr-2 text-red-500" />
                  <p className="text-gray-400">{new Date(event.eventDate).toLocaleDateString()}</p>
                </div>
                <div className="flex">
                  <MapPin className="h-5 w-5 mr-2 text-red-500" />
                  <p className="text-gray-400">{event.location}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 font-OpenSans">No past events available</p>
        )}
      </div>
    </div>
  );
}
