import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, Briefcase, Brain } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">NextGen Recruitment</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">AI-Powered</span>
              <span className="block text-blue-600">Campus Recruitment</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Streamline your campus placement process with our AI-driven platform. Connect students with their dream companies effortlessly.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link
                to="/register"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Brain className="h-8 w-8 text-blue-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">AI Resume Parsing</h3>
                <p className="mt-2 text-gray-500">
                  Automatically extract and analyze resume data with our AI technology.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Users className="h-8 w-8 text-blue-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Smart Matching</h3>
                <p className="mt-2 text-gray-500">
                  Match candidates with the perfect opportunities using AI algorithms.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Briefcase className="h-8 w-8 text-blue-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Streamlined Process</h3>
                <p className="mt-2 text-gray-500">
                  Simplify the entire recruitment process for all stakeholders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}