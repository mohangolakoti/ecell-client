import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import VRaju from '../constants/logos/VishnuRaju.jpg'

const Visonary = () => {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  return (
    <div className="py-10 px-4 pt-1 mt-40 ">
        <h2 className="font-bold text-3xl mt-14 text-center py-10 pb-14 font-Montserrat text-white">Our <span className="text-red-600">Visonary Leader</span></h2>
    <div className="flex max-w-7xl">
    <div className="mx-24 " data-aos='fade-right'>
        <img src={VRaju} alt="" className="h-96 mb-4 shadow-lg shadow-gray-500 rounded-xl" />
    </div>
      <div className="text-white font-roboto mt-4 w-2/3 leading-7 text-lg font-medium" data-aos='fade-left'>
      Dr. Vishnu Raju is a visionary leader, educationist, and accomplished entrepreneur, steadfastly committed to excellence in education and corporate governance. As Chairman, he has been instrumental in driving innovation, fostering academic growth, and empowering communities through strategic initiatives. With decades of experience shaping institutions and guiding organizations to success, he is dedicated to building a legacy of transformative leadership, inspiring progress, and creating opportunities for future generations. 

He initially gained field experience at E.T. DuPont de Nemours, USA (1991-1998), where he headed the R&D department in polymers, ceramics, and adhesives. Subsequently, he acquired essential administrative and leadership skills while serving at Raasi Cement Ltd., Hyderabad (1992–1998). In 1999, he took over as Managing Director of Anjani Portland Cement Ltd., Hyderabad, further advancing his leadership journey.
      </div>
    </div>
    </div>
  );
}

export default Visonary;