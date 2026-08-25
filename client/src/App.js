import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import SceneConfigurator from './components/SceneConfigurator';
import AnimationPreview from './components/AnimationPreview';
import VideoGenerator from './components/VideoGenerator';
import './App.css';

function App() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [sceneConfig, setSceneConfig] = useState({
    transitionDuration: 1,
    framerate: 30,
    quality: 'high',
    preserveFaceFeatures: true,
    smoothTransitions: true
  });
  const [currentStep, setCurrentStep] = useState('upload');
  const [generatedVideoId, setGeneratedVideoId] = useState(null);

  const handleImagesSelected = (images) => {
    setUploadedImages(images);
    if (images.length >= 2) {
      setCurrentStep('configure');
    }
  };

  const handleSceneConfigChange = (config) => {
    setSceneConfig(config);
  };

  const handleAnimationGenerated = (videoId) => {
    setGeneratedVideoId(videoId);
    setCurrentStep('preview');
  };

  const resetApp = () => {
    setUploadedImages([]);
    setCurrentStep('upload');
    setGeneratedVideoId(null);
  };

  return (
    <div className="App bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <header className="bg-black bg-opacity-50 border-b border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">🎬 AI Face Animator</h1>
          <p className="text-gray-300">Transform your photos into seamless animated videos with AI-powered face preservation</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex justify-between mb-12">
          {['upload', 'configure', 'generate', 'preview'].map((step, index) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                currentStep === step ? 'bg-blue-500 border-blue-500' : 
                ['upload', 'configure', 'generate'].indexOf(currentStep) > index ? 'bg-green-500 border-green-500' :
                'bg-gray-700 border-gray-600'
              }`}>
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              {index < 3 && <div className="flex-1 h-1 mx-2 bg-gray-700"></div>}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {currentStep === 'upload' && (
          <ImageUploader onImagesSelected={handleImagesSelected} />
        )}

        {currentStep === 'configure' && uploadedImages.length >= 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SceneConfigurator 
                images={uploadedImages}
                config={sceneConfig}
                onConfigChange={handleSceneConfigChange}
              />
            </div>
            <div>
              <VideoGenerator
                images={uploadedImages}
                config={sceneConfig}
                onAnimationGenerated={handleAnimationGenerated}
                onStepChange={setCurrentStep}
              />
            </div>
          </div>
        )}

        {currentStep === 'preview' && generatedVideoId && (
          <AnimationPreview 
            videoId={generatedVideoId}
            onReset={resetApp}
          />
        )}

        {currentStep === 'generate' && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="loader mb-4"></div>
            <p className="text-gray-300 text-lg">Generating your animation...</p>
            <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
          </div>
        )}
      </main>

      <footer className="bg-black bg-opacity-50 border-t border-gray-700 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 AI Face Animator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
