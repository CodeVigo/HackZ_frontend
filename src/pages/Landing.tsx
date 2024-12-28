import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Brain,
  Rocket,
  Target,
  Award,
  Users,
  Building2,
  Briefcase,
  ChevronRight,
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/cards/TestimonialCard';
import StatCard from '../components/cards/StatCard';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'AI Resume Parsing',
      description: 'Our advanced AI technology automatically extracts and analyzes resume data with high accuracy.',
      ctaText: 'Learn More',
      onClick: () => navigate('/register'),
    },
    {
      icon: Target,
      title: 'Smart Matching',
      description: 'Intelligent algorithms match candidates with perfect opportunities based on skills and preferences.',
      ctaText: 'Explore',
      onClick: () => navigate('/register'),
    },
    {
      icon: Rocket,
      title: 'Streamlined Process',
      description: 'Simplify the entire recruitment workflow with our intuitive and efficient platform.',
      ctaText: 'Get Started',
      onClick: () => navigate('/register'),
    },
    {
      icon: Award,
      title: 'Top Talent',
      description: 'Connect with the brightest minds and find your next star employee.',
      ctaText: 'Join Now',
      onClick: () => navigate('/register'),
    },
  ];

  const stats = [
    {
      icon: Users,
      title: 'Active Users',
      value: '10,000+',
      description: 'Talented candidates and recruiters',
    },
    {
      icon: Building2,
      title: 'Partner Companies',
      value: '500+',
      description: 'Leading tech companies',
    },
    {
      icon: Briefcase,
      title: 'Jobs Posted',
      value: '5,000+',
      description: 'New opportunities every day',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'HR Manager',
      company: 'TechCorp',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      quote: 'NextGen has revolutionized our campus recruitment process. The AI-powered matching is incredibly accurate.',
    },
    {
      name: 'Michael Chen',
      role: 'Recent Graduate',
      company: 'StartupX',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      quote: 'Found my dream job through NextGen. The platform made the job search process so much easier.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Placement Officer',
      company: 'Tech University',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      quote: 'The analytics and insights help us better prepare our students for the job market.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />

      {/* Hero Section */}
      <main>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-200" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">AI-Powered</span>
                <span className="block text-blue-600 dark:text-blue-400">
                  Campus Recruitment
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-600 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Transform your campus recruitment process with our cutting-edge AI platform. 
                Connect top talent with leading companies seamlessly.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <Link
                  to="/register"
                  className="group w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-gray-100 dark:bg-gray-800 py-16 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Why Choose NextGen?
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Our Impact
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gray-100 dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}