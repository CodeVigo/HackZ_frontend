import React from 'react';
import { Terminal } from 'lucide-react';

interface CodeOutputProps {
  output: string;
}

export default function CodeOutput({ output }: CodeOutputProps) {
  return (
    <div className="bg-gray-900 rounded-lg mt-4">
      <div className="flex items-center px-4 py-2 border-b border-gray-800">
        <Terminal className="h-4 w-4 text-gray-400 mr-2" />
        <span className="text-sm text-gray-400">Output</span>
      </div>
      <pre className="p-4 text-sm font-mono text-white overflow-auto max-h-40">
        {output || 'No output yet. Run your code to see the results.'}
      </pre>
    </div>
  );
}