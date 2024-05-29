// src/components/Sidebar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGraduationCap, faChartLine, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../public/vite'; // Adjust the path to your logo

const Sidebar = () => {
  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 left-0 w-20 h-full bg-gray-800 text-white flex flex-col justify-between items-center">
      {/* Logo at the top */}
      <div className="my-4">
        <img src={logo} alt="Logo" className="w-12 h-12" />
      </div>
      
      {/* Icons in the center */}
      <div className="flex-grow flex flex-col justify-center items-center space-y-6">
        <a href="#" className="flex items-center justify-center py-4 text-gray-400 hover:text-white">
          <FontAwesomeIcon icon={faUser} className="text-xl" />
        </a>
        <a href="#" className="flex items-center justify-center py-4 text-gray-400 hover:text-white">
          <FontAwesomeIcon icon={faGraduationCap} className="text-xl" />
        </a>
        <a href="#" className="flex items-center justify-center py-4 text-gray-400 hover:text-white">
          <FontAwesomeIcon icon={faChartLine} className="text-xl" />
        </a>
      </div>

      {/* Logout icon at the bottom */}
      <div className="my-4">
        <button onClick={handleLogout} className="flex items-center justify-center py-4 text-gray-400 hover:text-white">
          <FontAwesomeIcon icon={faSignOutAlt} className="text-xl" />
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
