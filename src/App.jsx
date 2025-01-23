import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import EventForm from './components/Forms/EventForm';
import RegistrationForm from './components/Forms/RegistrationForm';
import JudgingCriteriaForm from './components/Forms/JudgingCriteriaForm';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Event from './components/Events';
import Judging from './components/Judging';
import Registrations from './components/Registrations';
import TeamForm from './components/Forms/TeamForm';
import Team from './components/Team';
import CaseStudy from './components/CaseStudy';
import CaseStudyForm from './components/Forms/CaseStudyForm';
import Analytics from './components/Analytics';
import AdminSettings from './components/AdminSettings';
import LandingPage from './LandingPage/LandingPage';
import Login from './components/Login'; // Import your Login component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const location = useLocation(); // Current location
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    // Fixed credentials
    const adminEmail = 'admin@ecell.com';
    const adminPassword = 'ecell123';

    if (email === adminEmail && password === adminPassword) {
      setIsLoggedIn(true); // Update login state
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      alert('Invalid email or password');
    }
  };

  const isLandingPage =
    location.pathname === '/' || location.pathname === '/registration'; // Landing and Registration

  return (
    <div className="flex min-h-screen bg-background w-full">
      {/* Conditionally render Sidebar */}
      {!isLandingPage && isLoggedIn && (
        <div className="w-[17%]">
          <Sidebar />
        </div>
      )}
      <div className={isLandingPage || !isLoggedIn ? 'w-full' : 'w-[80%]'}>
        <Routes>
          {/* Routes accessible without login */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/registration" element={<RegistrationForm />} />
          
          {/* Login route */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Protected routes (only visible when logged in) */}
          {isLoggedIn ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/events" element={<Event />} />
              <Route path="/judging" element={<Judging />} />
              <Route path="/registrations" element={<Registrations />} />
              <Route path="/team" element={<Team />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/case-studies" element={<CaseStudy />} />
              <Route path="/settings" element={<AdminSettings />} />
              <Route path="/event-register" element={<EventForm />} />
              <Route path="/judging-form" element={<JudgingCriteriaForm />} />
              <Route path="/create-team" element={<TeamForm />} />
              <Route path="/create-casestudy" element={<CaseStudyForm />} />
            </>
          ) : (
            // Redirect to login if accessing a protected route
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
