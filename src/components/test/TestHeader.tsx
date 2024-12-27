import React from 'react';
import { Brain, Code, Camera } from 'lucide-react';

interface TestHeaderProps {
  currentSection: 'aptitude' | 'coding';
  timeLeft: number;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export default function TestHeader({ currentSection, timeLeft, videoRef }: TestHeaderProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {currentSection === 'aptitude' ? (
          <Brain className="h-6 w-6 text-blue-600" />
        ) : (
          <Code className="h-6 w-6 text-blue-600" />
        )}
        <h1 className="text-xl font-semibold">
          {currentSection === 'aptitude' ? 'Aptitude Test' : 'Coding Test'}
        </h1>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Camera className="h-5 w-5 text-gray-500" />
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-32 h-24 rounded-lg border border-gray-200"
          />
        </div>
        <div className="text-lg font-mono bg-gray-100 px-3 py-1 rounded">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
}