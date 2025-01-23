import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MagicParticles from "./MagicParticles";
import { TypeAnimation } from "react-type-animation";
import Ecell from "../constants/logos/ecell_logo.svg";
import Navbar from "./Navbar";
import Visonary from "./Visonary";
import UpcomingEvent from "./UpcomingEvent";
import PastEvents from "./PastEvents";
import CaseStudy from "./CaseStudy";
import About from "./About";
import Team from "./Team";
import Initiatives from "./Initiatives";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-black scroll-smooth" id="home">
      <Navbar />
      <section className="h-screen relative overflow-hidden bg-black">
        {/* Magic Particles Canvas */}
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[20, 20, 0]} />
            <MagicParticles />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>

        {/* Main Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center mt-[-90px]">
          <div className="z-10 flex flex-col items-center gap-5">
            {/* Heading */}
            <img src={Ecell} className="w-28" alt="E-Cell Logo" />

            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text font-Montserrat">
              E-Cell VITB
            </h1>

            {/* Subtext */}
            <p className="text-xl md:text-2xl font-bold font-mono text-transparent bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text">
              <TypeAnimation
                sequence={["Create.", 1100, "Lead.", 1100, "Innovate.", 1100]}
                repeat={Infinity}
              />
            </p>

            {/* Button */}
            <div className="flex items-center justify-center mt-5">
              <div className="relative group">
                <a href="#visonary">
                  <button className="relative inline-block p-px font-semibold leading-6 border hover:border-none text-white bg-transparent shadow-2xl cursor-pointer rounded-full shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                    <span className="absolute inset-0 rounded-full bg-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

                    <span className="relative z-10 block px-6 py-3 rounded-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:via-blue-500 group-hover:to-purple-500">
                      <div className="relative z-10 flex items-center space-x-2">
                        <span className="transition-all duration-500 group-hover:translate-x-1">
                          Get started
                        </span>
                        <svg
                          className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="visonary">
        <Visonary />
      </section>
      <section id="events">
        <UpcomingEvent/>
      </section>
      <section >
        <PastEvents/>
      </section>
      <section id="case-studies">
        <CaseStudy/>
      </section>
      <section id="about">
        <Initiatives/>
      </section>
      <section id="team">
        <Team/>
      </section>
      <section>
        <About/>
      </section>
      <section>
        <Footer/>
      </section>
    </div>
  );
};

export default LandingPage;
