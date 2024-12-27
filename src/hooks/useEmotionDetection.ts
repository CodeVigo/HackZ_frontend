import { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

export function useEmotionDetection(onSuspiciousActivity: (activity: string) => void) {
  const detectionRef = useRef<boolean>(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models')
        ]);
        detectionRef.current = true;
      } catch (error) {
        console.error('Error loading face detection models:', error);
        onSuspiciousActivity('Failed to load face detection');
      }
    };

    loadModels();
  }, []);

  const detectEmotions = async (video: HTMLVideoElement) => {
    if (!detectionRef.current || !video) return;

    try {
      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (!detection) {
        onSuspiciousActivity('No face detected in frame');
        return;
      }

      const { expressions } = detection;
      
      // Check for suspicious expressions
      if (expressions.happy > 0.8) {
        onSuspiciousActivity('Excessive happiness detected - possible cheating');
      }
      if (expressions.surprised > 0.8) {
        onSuspiciousActivity('Surprised expression detected - possible external help');
      }
      if (expressions.neutral < 0.3) {
        onSuspiciousActivity('Non-neutral expression detected - possible communication');
      }
    } catch (error) {
      console.error('Error detecting emotions:', error);
    }
  };

  return { detectEmotions };
}