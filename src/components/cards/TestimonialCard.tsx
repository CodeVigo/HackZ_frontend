import React from 'react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}

export default function TestimonialCard({
  name,
  role,
  company,
  image,
  quote,
}: TestimonialCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {role} at {company}
          </p>
        </div>
      </div>
      <blockquote className="text-gray-600 dark:text-gray-300 italic">
        "{quote}"
      </blockquote>
    </div>
  );
}