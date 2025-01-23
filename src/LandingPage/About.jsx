import { motion } from 'framer-motion';
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  return (
    <section className='bg h-96 my-20 pb-20 flex justify-center items-center flex-col'>
<motion.p
              initial={{ opacity: 0, y: 20 }} // Fade in and slide up
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
              className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed font-light 
             font-Montserrat text-center bg-gradient-to-r 
             from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent 
             animate-gradient text-shadow-glow"
             data-aos="fade-in"
              style={{
                textTransform: "none",
                animation: "blink-shadow 2s infinite",
              }}
            >
              Welcome to E-Cell VITB, where innovation meets collaboration. We
              empower students to bring their entrepreneurial ideas to life
              through resources, mentorship, and an inspiring community. Let’s
              create, lead, and innovate together for a brighter future!
            </motion.p>
            <style>{`
              @keyframes blink-shadow {
                0%,
                100% {
                  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.9);
                }
                50% {
                  text-shadow: none;
                }
              }
            `}</style>
            {/* Button Animation */}
            
      <div className="flex items-center justify-center mt-5">
  <div className="relative group">
    <a href="/">
    <button
      className="relative inline-block p-px font-semibold leading-6 border hover:border-none text-white bg-transparent shadow-2xl cursor-pointer rounded-full shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
    >
      <span
        className="absolute inset-0 rounded-full bg-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      ></span>

      <span
        className="relative z-10 block px-6 py-3 rounded-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:via-blue-500 group-hover:to-purple-500"
      >
        <div className="relative z-10 flex items-center space-x-2">
          <span
            className="transition-all duration-500 group-hover:translate-x-1 font-OpenSans"
          >
            Get started
          </span>
          <svg
            className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
            data-slot="icon"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              
            ></path>
          </svg>
        </div>
      </span>
    </button>
    </a>
  </div>
</div>

      </section>
  );
}
