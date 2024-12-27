import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Account Settings
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Manage your account settings and preferences.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}