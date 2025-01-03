import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardHome from "./dashboard/DashboardHome";
import CandidateProfile from "./dashboard/CandidateProfile";
import CandidateResume from "./dashboard/CandidateResume";
import Applications from "./dashboard/Applications";
import Settings from "./dashboard/Settings";
import TestPage from "./dashboard/TestPage";
import Jobs from "./dashboard/Jobs";
import Students from "./dashboard/Students";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        {user?.role === "candidate" && (
          <>
            <Route path="/profile" element={<CandidateProfile />} />
            <Route path="/resume" element={<CandidateResume />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/test" element={<TestPage />} />
          </>
        )}
        {user?.role === "recruiter" && (
          <Route path="/jobs" element={<Jobs />} />
        )}
        {user?.role === "recruiter" && (
          <Route path="/students" element={<Students />} />
        )}
        {user?.role === "candidate" && (
          <Route path="/jobs" element={<Jobs />} />
        )}
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
}
