import { useState, useEffect } from "react";
import { Calendar, User, X } from "lucide-react";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import { API_IMG, API_URL } from "../data/api";

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState(null);

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  useEffect(() => {
    // Fetch case studies from the API
    const fetchCaseStudies = async () => {
      try {
        const response = await fetch(`${API_URL}/casestudy`);
        const data = await response.json();
        setCaseStudies(data);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      }
    };

    fetchCaseStudies();
  }, []);

  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-white flex justify-center mt-14">
      <div className="mx-auto w-1/2">
        <h1 className="font-bold text-3xl text-center py-10 pb-14 font-Montserrat">
          Case <span className="text-violet-600">Studies</span>
        </h1>
        <div className="grid grid-cols-1 gap-6" data-aos="fade-in">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedStudy(study)}
            >
              <div className="relative">
                <img
                  src={`${API_IMG}${study.coverImage}`}
                  alt={study.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 " />
              </div>
              <div className="p-6 group relative">
                <h3 className="relative z-10 text-xl font-semibold text-white mb-2 font-Roboto capitalize">
                  {study.title}
                </h3>
                <p className="relative z-10 text-gray-300 mb-4 line-clamp-2 font-OpenSans">
                  {study.summary}
                </p>
                <div className="relative z-10 flex items-center justify-between text-sm text-gray-300">
                  <div className="flex items-center font-OpenSans">
                    <User className="h-4 w-4 mr-1" />
                    <span>{study.author}</span>
                  </div>
                  <div className="flex items-center font-OpenSans">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {new Date(study.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedStudy && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedStudy(null)}
              className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="mb-6">
              <img
                src={`${API_IMG}${selectedStudy.coverImage}`}
                alt={selectedStudy.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {selectedStudy.title}
            </h2>
            <div className="flex items-center text-gray-300 mb-6">
              <User className="h-5 w-5 mr-2" />
              <span>{selectedStudy.author}</span>
              <span className="mx-2">•</span>
              <Calendar className="h-5 w-5 mr-2" />
              <span>
                {new Date(selectedStudy.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedStudy.content }}
            />
            <button
              onClick={() => setSelectedStudy(null)}
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
