/**
 * Sleep Processor Web Worker
 * Offloads heavy sensor data analysis from the main thread.
 */

let isTracking = false;
let sessionStartTime = 0;

self.onmessage = (e: MessageEvent) => {
  const { type, payload } = e.data;

  switch (type) {
    case 'START_TRACKING':
      isTracking = true;
      sessionStartTime = Date.now();
      startAnalysisLoop();
      break;
    case 'STOP_TRACKING':
      isTracking = false;
      break;
    case 'PROCESS_SENSOR_DATA':
      // In a real app, we would process raw accelerometer/mic data here
      // For this implementation, we simulate analysis results
      break;
  }
};

function startAnalysisLoop() {
  if (!isTracking) return;

  // Simulate periodic analysis of "sensor data"
  const analysisInterval = setInterval(() => {
    if (!isTracking) {
      clearInterval(analysisInterval);
      return;
    }

    const elapsedMinutes = (Date.now() - sessionStartTime) / (1000 * 60);
    
    // Mock sleep stage detection logic
    let stage = 'AWAKE';
    if (elapsedMinutes > 20) stage = 'LIGHT';
    if (elapsedMinutes > 45) stage = 'DEEP';
    if (elapsedMinutes > 90) stage = 'REM';

    self.postMessage({
      type: 'ANALYSIS_UPDATE',
      payload: {
        stage,
        confidence: 0.85 + Math.random() * 0.1,
        heartRate: 60 + Math.random() * 10,
        timestamp: Date.now()
      }
    });
  }, 5000); // Send update every 5 seconds
}
