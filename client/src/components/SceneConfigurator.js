import React from 'react';
import { FiSettings } from 'react-icons/fi';

const SceneConfigurator = ({ images, config, onConfigChange }) => {
  const handleConfigChange = (key, value) => {
    const updatedConfig = { ...config, [key]: value };
    onConfigChange(updatedConfig);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-8">
      <div className="flex items-center mb-6">
        <FiSettings className="text-blue-400 text-2xl mr-3" />
        <h2 className="text-2xl font-bold text-white">⚙️ Scene Configuration</h2>
      </div>

      {/* Images Preview */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Image Sequence</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 relative">
              <img
                src={image.url}
                alt={`Image ${index + 1}`}
                className="w-24 h-24 object-cover rounded-lg border-2 border-blue-500"
              />
              <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transition Settings */}
      <div className="mb-8 p-6 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">🎞️ Transition Settings</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Transition Duration (seconds): {config.transitionDuration}
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={config.transitionDuration}
              onChange={(e) => handleConfigChange('transitionDuration', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-gray-400 text-sm mt-1">Smoother transitions take longer</p>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Frame Rate (FPS): {config.framerate}
            </label>
            <select
              value={config.framerate}
              onChange={(e) => handleConfigChange('framerate', parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
            >
              <option value={24}>24 FPS (Cinematic)</option>
              <option value={30}>30 FPS (Standard)</option>
              <option value={60}>60 FPS (Smooth)</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Video Quality
            </label>
            <select
              value={config.quality}
              onChange={(e) => handleConfigChange('quality', e.target.value)}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
            >
              <option value="low">Low (360p)</option>
              <option value="medium">Medium (720p)</option>
              <option value="high">High (1080p)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Face Preservation Settings */}
      <div className="mb-8 p-6 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">👤 Face Preservation</h3>
        
        <div className="space-y-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.preserveFaceFeatures}
              onChange={(e) => handleConfigChange('preserveFaceFeatures', e.target.checked)}
              className="w-5 h-5 rounded border-gray-500 text-blue-600"
            />
            <span className="ml-3 text-gray-300">Preserve facial features and expressions</span>
          </label>
          <p className="text-gray-400 text-sm ml-8">Maintains facial landmarks, expressions, and identity consistency</p>

          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.smoothTransitions}
              onChange={(e) => handleConfigChange('smoothTransitions', e.target.checked)}
              className="w-5 h-5 rounded border-gray-500 text-blue-600"
            />
            <span className="ml-3 text-gray-300">Smooth transitions between frames</span>
          </label>
          <p className="text-gray-400 text-sm ml-8">Creates seamless morphing effects between images</p>
        </div>
      </div>

      {/* Preview Info */}
      <div className="p-4 bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg">
        <p className="text-blue-300 text-sm">
          <strong>📊 Video Info:</strong> {images.length} images × {config.transitionDuration}s transition × {config.framerate} FPS = ~{Math.round(images.length * config.transitionDuration * config.framerate)} frames
        </p>
      </div>
    </div>
  );
};

export default SceneConfigurator;
