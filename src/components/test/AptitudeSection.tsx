import React from 'react';
import { AptitudeQuestion } from '../../types/test';

interface AptitudeSectionProps {
  questions: AptitudeQuestion[];
  answers: Record<number, string>;
  onAnswer: (questionId: number, answer: string) => void;
}

export default function AptitudeSection({ questions, answers, onAnswer }: AptitudeSectionProps) {
  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <div key={question.id} className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">
            Question {index + 1}: {question.question}
          </h3>
          <div className="space-y-3">
            {question.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className="flex items-center space-x-3 p-3 rounded hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => onAnswer(question.id, option)}
                  className="h-4 w-4 text-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}