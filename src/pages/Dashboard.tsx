import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHome from './dashboard/DashboardHome';
import CandidateProfile from './dashboard/CandidateProfile';
import CandidateResume from './dashboard/CandidateResume';
import Applications from './dashboard/Applications';
import Settings from './dashboard/Settings';
import TestPage from './dashboard/TestPage';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          {user?.role === 'candidate' && (
            <>
              <Route path="/profile" element={<CandidateProfile />} />
              <Route path="/resume" element={<CandidateResume />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/test" element={<TestPage />} />
            </>
          )}
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}