import { useRef, useEffect, useCallback } from 'react';
import { useEmotionDetection } from './useEmotionDetection';

export function useWebcamMonitoring(onSuspiciousActivity: (activity: string) => void) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { detectEmotions } = useEmotionDetection(onSuspiciousActivity);

  const checkVisibility = useCallback(() => {
    if (document.hidden) {
      onSuspiciousActivity('Tab/window change detected');
    }
  }, [onSuspiciousActivity]);

  const checkMousePosition = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0) {
      onSuspiciousActivity('Mouse moved to top of screen - possible tab switch attempt');
    }
  }, [onSuspiciousActivity]);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
        onSuspiciousActivity('Failed to access webcam');
      }
    };

    startWebcam();

    // Set up monitoring intervals
    const emotionInterval = setInterval(() => {
      if (videoRef.current) {
        detectEmotions(videoRef.current);
      }
    }, 2000);

    // Add event listeners for suspicious behavior
    document.addEventListener('visibilitychange', checkVisibility);
    document.addEventListener('mousemove', checkMousePosition);

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      clearInterval(emotionInterval);
      document.removeEventListener('visibilitychange', checkVisibility);
      document.removeEventListener('mousemove', checkMousePosition);
    };
  }, [onSuspiciousActivity, checkVisibility, checkMousePosition, detectEmotions]);

  return { videoRef };
}