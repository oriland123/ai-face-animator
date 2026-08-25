import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiX, FiCheck } from 'react-icons/fi';
import axios from 'axios';

const ImageUploader = ({ onImagesSelected }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      uploadImages(acceptedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'] },
    multiple: true
  });

  const uploadImages = async (files) => {
    setUploading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    try {
      const response = await axios.post('http://localhost:5000/api/upload/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress({ ...uploadProgress, total: percent });
        }
      });

      const newImages = response.data.files.map(file => ({
        ...file,
        id: Math.random().toString(36).substr(2, 9)
      }));

      setUploadedImages([...uploadedImages, ...newImages]);
      onImagesSelected([...uploadedImages, ...newImages]);
      setUploadProgress({});
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (id) => {
    const updated = uploadedImages.filter(img => img.id !== id);
    setUploadedImages(updated);
    onImagesSelected(updated);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">📸 Upload Your Photos</h2>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition ${
          isDragActive
            ? 'border-blue-500 bg-blue-500 bg-opacity-10'
            : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700 hover:bg-opacity-30'
        }`}
      >
        <input {...getInputProps()} />
        <FiUploadCloud className="mx-auto text-4xl text-blue-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          {isDragActive ? 'Drop your images here' : 'Drag & drop your photos here'}
        </h3>
        <p className="text-gray-400 mb-4">or click to select files from your computer</p>
        <p className="text-gray-500 text-sm">Supported formats: JPG, PNG, WebP, GIF (Max 20 images)</p>
      </div>

      {uploadProgress.total && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Uploading...</span>
            <span className="text-blue-400 font-semibold">{uploadProgress.total}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full progress-bar"
              style={{ width: `${uploadProgress.total}%` }}
            ></div>
          </div>
        </div>
      )}

      {uploadedImages.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Uploaded Images ({uploadedImages.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {uploadedImages.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.url}
                  alt="Uploaded"
                  className="w-full h-32 object-cover rounded-lg border-2 border-gray-700 group-hover:border-blue-500 transition"
                />
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <FiX size={16} />
                </button>
                <div className="absolute top-1 left-1 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
                  <FiCheck size={16} />
                </div>
              </div>
            ))}
          </div>
          {uploadedImages.length >= 2 && (
            <div className="mt-6 p-4 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg">
              <p className="text-green-300">✅ Ready to proceed! You have {uploadedImages.length} images.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
