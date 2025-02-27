import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Ecell from '../constants/logos/ecell_logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '#next_event', label: 'Events' },
    { path: '#case-studies', label: 'Case Studies' },
    { path: '#about', label: 'About' },
    { path: '#team', label: 'Team' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black shadow-md text-white font-Montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <img src={Ecell} alt="logo" className="w-16" />
              <span className="text-xl font-bold text-white mt-4 font-Montserrat">
                E-Cell VITB
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="flex items-baseline space-x-4 gap-5 ">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className={`nav-link text-base font-medium ${
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-white hover:text-red-600'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`p-2 rounded-lg font-medium ${
                  isActive(link.path)
                    ? 'bg-red-600 text-white'
                    : 'text-black hover:text-white hover:bg-red-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
