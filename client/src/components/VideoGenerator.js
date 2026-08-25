import React, { useState } from 'react';
import axios from 'axios';
import { FiPlayCircle, FiLoader } from 'react-icons/fi';

const VideoGenerator = ({ images, config, onAnimationGenerated, onStepChange }) => {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const generateAnimation = async () => {
    setGenerating(true);
    setProgress(0);
    setError(null);
    onStepChange('generate');

    try {
      const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const response = await axios.post('http://localhost:5000/api/animation/create', {
        images: images.map(img => img.url),
        sceneConfig: config,
        jobId: jobId
      });

      // Poll for job status
      let completed = false;
      let attempts = 0;
      const maxAttempts = 120; // 2 minutes with 1-second intervals

      while (!completed && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const statusResponse = await axios.get(
          `http://localhost:5000/api/animation/status/${response.data.jobId}`
        );

        setProgress(statusResponse.data.progress);

        if (statusResponse.data.status === 'completed') {
          completed = true;
          onAnimationGenerated(response.data.jobId);
        } else if (statusResponse.data.status === 'failed') {
          throw new Error(statusResponse.data.error || 'Animation generation failed');
        }

        attempts++;
      }

      if (!completed) {
        throw new Error('Animation generation timed out');
      }
    } catch (err) {
      console.error('Error generating animation:', err);
      setError(err.message || 'Failed to generate animation');
      onStepChange('configure');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-8 sticky top-8">
      <h2 className="text-2xl font-bold text-white mb-6">🎬 Generate Animation</h2>

      <div className="bg-gray-700 rounded-lg p-6 mb-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">Summary</h3>
          <div className="space-y-2 text-gray-300 text-sm">
            <p>📷 Images: <span className="text-blue-400 font-semibold">{images.length}</span></p>
            <p>⏱️ Duration per transition: <span className="text-blue-400 font-semibold">{config.transitionDuration}s</span></p>
            <p>🎞️ Frame rate: <span className="text-blue-400 font-semibold">{config.framerate} FPS</span></p>
            <p>📊 Quality: <span className="text-blue-400 font-semibold">{config.quality}</span></p>
            <div className="border-t border-gray-600 pt-2 mt-2">
              <p>⏰ Est. Duration: <span className="text-blue-400 font-semibold">
                {Math.round(images.length * config.transitionDuration)}s
              </span></p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900 bg-opacity-30 border border-red-700 rounded-lg">
          <p className="text-red-300 text-sm">❌ {error}</p>
        </div>
      )}

      {generating && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300 font-medium">Processing...</span>
            <span className="text-blue-400 font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-center mt-4">
            <FiLoader className="animate-spin text-blue-400 text-xl mr-2" />
            <span className="text-gray-300 text-sm">Generating your animation...</span>
          </div>
        </div>
      )}

      <button
        onClick={generateAnimation}
        disabled={generating || images.length < 2}
        className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
          generating || images.length < 2
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 cursor-pointer'
        }`}
      >
        <FiPlayCircle size={20} />
        {generating ? 'Generating...' : 'Generate Animation'}
      </button>

      <p className="text-gray-400 text-xs mt-4 text-center">
        🔄 Rendering your animation with AI face preservation...
      </p>
    </div>
  );
};

export default VideoGenerator;
