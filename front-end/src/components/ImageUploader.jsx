import React, { useState, useEffect } from 'react';

const ImageUploader = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  // Cleanup previewUrl when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="flex flex-col items-center gap-4">
      <label className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
        Choose Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {selectedFile && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-700">
            Selected File: <strong>{selectedFile.name}</strong>
          </p>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-2 max-w-xs max-h-64 rounded border shadow"
            />
          )}
          <button
            onClick={handleRemove}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer"
          >
            Remove Image
          </button>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile}
        className="px-20 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 text-lg hover:cursor-pointer"
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUploader;
