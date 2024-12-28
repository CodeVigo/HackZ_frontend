import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaText: string;
  onClick: () => void;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  ctaText,
  onClick
}: FeatureCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col">
      <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 flex-grow mb-4">
        {description}
      </p>
      <button
        onClick={onClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
      >
        {ctaText}
      </button>
    </div>
  );
}