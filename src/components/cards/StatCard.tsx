import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
}

export default function StatCard({
  icon: Icon,
  title,
  value,
  description,
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
        {value}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}