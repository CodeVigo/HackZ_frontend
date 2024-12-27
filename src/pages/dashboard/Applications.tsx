import React from 'react';

export default function Applications() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Applications</h1>
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="text-center text-gray-500">
                No applications yet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}