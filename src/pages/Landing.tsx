import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🧠",
      title: "AI-Powered Resume Screening",
      description:
        "Automated parsing and evaluation of resumes using NLP and ML.",
      ctaText: "Learn More",
      onClick: () => navigate("/features"),
    },
    {
      icon: "🛠️",
      title: "Integrated Code Editor",
      description:
        "A secure platform for coding assessments with AI monitoring.",
      ctaText: "Explore",
      onClick: () => navigate("/editor"),
    },
    {
      icon: "🎯",
      title: "Behavioral Analysis",
      description: "AI-driven analysis of speech and behavior for evaluation.",
      ctaText: "Start Now",
      onClick: () => navigate("/analysis"),
    },
    {
      icon: "📊",
      title: "Data Insights",
      description: "Dashboards and reports for actionable insights.",
      ctaText: "Join Us",
      onClick: () => navigate("/dashboard"),
    },
  ];

  const abstract = {
    title: "NextGen Recruitment: AI Solutions",
    problemStatement: `The traditional recruitment process is time-consuming and prone to errors. Our AI-powered system automates processes to ensure fairness and efficiency.`,
    objectives: [
      "Automate the recruitment process using AI.",
      "Provide data-driven insights to enhance decision-making.",
    ],
    proposedSolution: `An AI-powered system leveraging NLP, ML, and advanced algorithms to modernize placements with features like secure test environments and candidate reports.`,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />

      {/* Hero Section */}
      <main>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-200" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">{abstract.title}</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-600 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                {abstract.problemStatement}
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <Link
                  to="/register"
                  className="group w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-100 dark:bg-gray-800 py-12 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Key Features
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md flex flex-col items-center text-center"
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {feature.description}
                  </p>
                  <button
                    onClick={feature.onClick}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    {feature.ctaText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="bg-white dark:bg-gray-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Objectives
            </h2>
            <ul className="list-disc pl-8 text-base text-gray-600 dark:text-gray-300">
              {abstract.objectives.map((objective, index) => (
                <li key={index} className="mb-2">
                  {objective}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Proposed Solution Section */}
        <div className="bg-gray-100 dark:bg-gray-800 py-12 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Proposed Solution
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 text-center">
              {abstract.proposedSolution}
            </p>
          </div>
        </div>
      </main>

      <Footer>
        <div className="text-center text-base text-gray-600 dark:text-gray-300 py-4">
          © 2024 PlacementPro | Hack-Z Edition
        </div>
      </Footer>
    </div>
  );
}
