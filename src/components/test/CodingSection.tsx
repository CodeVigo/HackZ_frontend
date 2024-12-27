import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { Play } from 'lucide-react';
import { CodingQuestion } from '../../types/test';
import CodeOutput from './CodeOutput';
import { executeJavaScript } from '../../utils/codeExecutor';

interface CodingSectionProps {
  questions: CodingQuestion[];
  answers: Record<number, string>;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  onCodeChange: (questionId: number, code: string | undefined) => void;
}

const PROGRAMMING_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' }
];

export default function CodingSection({
  questions,
  answers,
  selectedLanguage,
  onLanguageChange,
  onCodeChange
}: CodingSectionProps) {
  const [outputs, setOutputs] = useState<Record<number, string>>({});

  const handleRunCode = async (questionId: number) => {
    const code = answers[questionId];
    if (!code) return;

    if (selectedLanguage === 'javascript') {
      const output = await executeJavaScript(code);
      setOutputs(prev => ({ ...prev, [questionId]: output }));
    } else {
      setOutputs(prev => ({
        ...prev,
        [questionId]: 'Only JavaScript execution is supported at the moment.'
      }));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4 mb-4">
        <label className="font-medium">Programming Language:</label>
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="border rounded-md px-3 py-1.5"
        >
          {PROGRAMMING_LANGUAGES.map(lang => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      
      {questions.map((question, index) => (
        <div key={question.id} className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">
            Question {index + 1}: {question.title}
          </h3>
          <p className="text-gray-600 mb-4">{question.description}</p>
          <div className="bg-gray-50 p-4 rounded mb-4">
            <h4 className="font-medium mb-2">Test Cases:</h4>
            {question.testCases.map((testCase, i) => (
              <pre key={i} className="text-sm text-gray-700">
                {testCase}
              </pre>
            ))}
          </div>
          <div className="relative">
            <Editor
              height="300px"
              language={selectedLanguage}
              value={answers[question.id] || ''}
              onChange={(value) => onCodeChange(question.id, value)}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'Fira Code', monospace",
                scrollBeyondLastLine: false,
              }}
            />
            <button
              onClick={() => handleRunCode(question.id)}
              className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center space-x-1"
            >
              <Play className="h-4 w-4" />
              <span>Run</span>
            </button>
          </div>
          <CodeOutput output={outputs[question.id] || ''} />
        </div>
      ))}
    </div>
  );
}