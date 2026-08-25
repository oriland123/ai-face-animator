import React, { useState, useEffect } from 'react';
import { FiDownload, FiRotateCcw } from 'react-icons/fi';
import axios from 'axios';

const AnimationPreview = ({ videoId, onReset }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setVideoUrl(`http://localhost:5000/api/video/preview/${videoId}`);
  }, [videoId]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/video/download/${videoId}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `animation_${videoId}.mp4`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download video');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-8 fade-in">
      <h2 className="text-3xl font-bold text-white mb-8">✅ Your Animation is Ready!</h2>

      <div className="mb-8">
        <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
          {videoUrl && (
            <video
              controls
              className="w-full"
              src={videoUrl}
              autoPlay
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className={`py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
            downloading
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
          }`}
        >
          <FiDownload size={20} />
          {downloading ? 'Downloading...' : 'Download Video'}
        </button>

        <button
          onClick={onReset}
          className="py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 bg-gray-700 text-white hover:bg-gray-600 transition"
        >
          <FiRotateCcw size={20} />
          Create Another
        </button>
      </div>

      <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">🎉 Features Used</h3>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>✓ AI-powered face feature preservation</li>
          <li>✓ Smooth morphing transitions between images</li>
          <li>✓ Facial landmark tracking and consistency</li>
          <li>✓ Expression and lighting blending</li>
          <li>✓ Scene-based animation configuration</li>
          <li>✓ High-quality video output</li>
        </ul>
      </div>

      <div className="mt-8 p-6 bg-gray-700 rounded-lg text-center">
        <p className="text-gray-300 mb-4">💡 Pro Tips:</p>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• Use photos with similar lighting for better transitions</li>
          <li>• Face-to-face angles work best for preservation</li>
          <li>• Longer transitions create smoother animations</li>
          <li>• High FPS settings produce smoother videos</li>
        </ul>
      </div>
    </div>
  );
};

export default AnimationPreview;
