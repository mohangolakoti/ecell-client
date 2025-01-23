import { Mail, Phone, Github, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import ecell from "../constants/logos/Ecell_dark.png";

export default function Footer() {
  return (
    <footer className="backdrop-blur-md bg-gradient-to-r from-gray-100 to-gray-200 border-t border-gray-200 text-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <Link to="/login" className="flex items-center space-x-3">
              <img src={ecell} alt="E-Cell Logo" className="w-12 h-12" />
              <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                E-Cell VITB
              </span>
            </Link>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Empowering the next generation of entrepreneurs at Vishnu Institute of Technology. Join us to ignite your
              entrepreneurial journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-500">Quick Links</h3>
            <div className="space-y-3">
              <a href="/" className="block hover:text-indigo-400 transition">
                Home
              </a>
              <a href="#events" className="block hover:text-indigo-400 transition">
                Events
              </a>
              <a href="#case-studies" className="block hover:text-indigo-400 transition">
                Case Studies
              </a>
              <a href="#about" className="block hover:text-indigo-400 transition">
                About
              </a>
              <a href="#team" className="block hover:text-indigo-400 transition">
                Team
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-500">Connect With Us</h3>
            <div className="space-y-3">
              <a
                href="mailto:ecell@vishnu.edu.in"
                className="flex items-center space-x-3 hover:text-indigo-400 transition"
              >
                <Mail className="h-5 w-5" />
                <span>ecell@vishnu.edu.in</span>
              </a>
              <a href="tel:+919490538442" className="flex items-center space-x-3 hover:text-indigo-400 transition">
                <Phone className="h-5 w-5" />
                <span>+91 9490 538 442</span>
              </a>
              <div className="flex space-x-4 mt-6">
                <a
                  href="#"
                  className="hover:text-indigo-400 transition hover:scale-110 transform"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition hover:scale-110 transform"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition hover:scale-110 transform"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center border-t border-gray-700 pt-6 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} E-Cell VITB. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
