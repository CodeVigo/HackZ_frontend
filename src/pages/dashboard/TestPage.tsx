import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import screenfull from 'screenfull';
import { AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import TestHeader from '../../components/test/TestHeader';
import AptitudeSection from '../../components/test/AptitudeSection';
import CodingSection from '../../components/test/CodingSection';
import { useWebcamMonitoring } from '../../hooks/useWebcamMonitoring';
import { submitTest, fetchAptitudeQuestions } from '../../services/testService';
import { CODING_QUESTIONS } from '../../data/codingQuestions';

export default function TestPage() {
  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [aptitudeQuestions, setAptitudeQuestions] = useState([]);
  const [aptitudeAnswers, setAptitudeAnswers] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [codingAnswers, setCodingAnswers] = useState({});
  const [currentSection, setCurrentSection] = useState('aptitude');
  const [timeLeft, setTimeLeft] = useState(3600);
  const [suspiciousActivities, setSuspiciousActivities] = useState<string[]>(
    []
  );

  const { videoRef } = useWebcamMonitoring((activity) => {
    setSuspiciousActivities((prev) => [...prev, activity]);
    // Show warning toast for suspicious activity
    toast(
      (t) => (
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <span>{activity}</span>
        </div>
      ),
      {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#FEF2F2',
          color: '#991B1B',
          border: '1px solid #FCA5A5',
        },
      }
    );
  });

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await fetchAptitudeQuestions();
        setAptitudeQuestions(questions);
      } catch (error) {
        toast.error('Failed to load aptitude questions', {
          position: 'top-center',
        });
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFullScreen((prev) => !prev);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log({
        aptitudeAnswers,
        codingAnswers,
        timeSpent: 3600 - timeLeft,
        suspiciousActivities: suspiciousActivities.map((activity) => ({
          timestamp: new Date().toISOString(),
          activity,
        })),
      });
      await submitTest({
        aptitudeAnswers,
        codingAnswers,
        timeSpent: 3600 - timeLeft,
        suspiciousActivities: suspiciousActivities.map((activity) => ({
          timestamp: new Date().toISOString(),
          activity,
        })),
      });

      console.log({
        aptitudeAnswers,
        codingAnswers,
        timeSpent: 3600 - timeLeft,
        suspiciousActivities: suspiciousActivities.map((activity) => ({
          timestamp: new Date().toISOString(),
          activity,
        })),
      });

      toast.success('Test submitted successfully!', {
        position: 'top-center',
      });
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to submit test', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TestHeader
        currentSection={currentSection}
        timeLeft={timeLeft}
        videoRef={videoRef}
      />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentSection('aptitude')}
              className={`px-4 py-2 rounded-lg font-medium ${
                currentSection === 'aptitude'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Aptitude Questions
            </button>
            <button
              onClick={() => setCurrentSection('coding')}
              className={`px-4 py-2 rounded-lg font-medium ${
                currentSection === 'coding'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Coding Questions
            </button>
          </div>
          <button
            onClick={toggleFullScreen}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            {isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}
          </button>
        </div>

        {currentSection === 'aptitude' ? (
          <AptitudeSection
            questions={aptitudeQuestions}
            answers={aptitudeAnswers}
            onAnswer={(id, answer) =>
              setAptitudeAnswers((prev) => ({ ...prev, [id]: answer }))
            }
          />
        ) : (
          <CodingSection
            questions={CODING_QUESTIONS}
            answers={codingAnswers}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            onCodeChange={(id, code) =>
              setCodingAnswers((prev) => ({ ...prev, [id]: code }))
            }
          />
        )}

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
          >
            Submit Test
          </button>
        </div>
      </div>

      {!isFullScreen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-100 text-red-800 px-6 py-4 rounded-lg flex items-center shadow-lg">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Please enter full screen mode to continue the test
        </div>
      )}
    </div>
  );
}
