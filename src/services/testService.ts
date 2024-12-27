import { TestSubmission } from '../types/test';

const API_URL = 'http://localhost:5000';

export async function submitTest(testData: TestSubmission): Promise<void> {
  const response = await fetch(`${API_URL}/test/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit test');
  }
}

export async function fetchAptitudeQuestions(): Promise<any[]> {
  try {
    const questions = await Promise.all(
      Array(5).fill(0).map(() => 
        fetch('https://aptitude-api.vercel.app/Random')
          .then(res => res.json())
      )
    );
    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch aptitude questions');
  }
}