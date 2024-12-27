import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Building2, Users, Briefcase, FileText } from 'lucide-react';

export default function DashboardHome() {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Total Applications',
      value: '0',
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      name: 'Active Jobs',
      value: '0',
      icon: Briefcase,
      color: 'bg-green-500',
    },
    {
      name: 'Total Candidates',
      value: '0',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      name: 'Companies',
      value: '0',
      icon: Building2,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.full_name}
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
              >
                <dt>
                  <div className={`absolute rounded-md p-3 ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </p>
                </dt>
                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </dd>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}