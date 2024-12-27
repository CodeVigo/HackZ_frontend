export interface AptitudeQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface CodingQuestion {
  id: number;
  title: string;
  description: string;
  testCases: string[];
}

export interface TestSubmission {
  aptitudeAnswers: Record<number, string>;
  codingAnswers: Record<number, string>;
  timeSpent: number;
  suspiciousActivities?: Array<{
    timestamp: string;
    activity: string;
  }>;
}