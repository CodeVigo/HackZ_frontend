import React from 'react';
import { Building2 } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';

export default function DashboardHeader() {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
            NextGen
          </span>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}