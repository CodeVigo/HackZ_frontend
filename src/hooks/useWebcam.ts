import { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

export function useWebcam(onSuspiciousActivity: (activity: string) => void) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);
    };

    loadModels();
    startWebcam();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const detectFace = async () => {
      if (!videoRef.current) return;

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length === 0) {
        onSuspiciousActivity('No face detected');
      } else {
        detections.forEach(detection => {
          const expressions = detection.expressions;
          if (expressions.happy > 0.8) {
            onSuspiciousActivity('Suspicious expression detected');
          }
        });
      }
    };

    interval = setInterval(detectFace, 5000);
    return () => clearInterval(interval);
  }, [onSuspiciousActivity]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (error) {
      console.error('Error accessing webcam:', error);
      throw new Error('Failed to access webcam');
    }
  };

  return { videoRef };
}