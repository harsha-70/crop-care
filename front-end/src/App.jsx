import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import PredictionResult from './components/PredictionResult';

const App = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();
      console.log(data);
      setResult(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-opacity-10 backdrop-blur-sm rounded-xl">
      <h1 className="text-7xl text-black mb-6 text-center drop-shadow-lg font-serif font-extrabold">CROPCARE</h1>
      <h2 className="text-4xl text-black mb-12 text-center drop-shadow-md font-serif font-extrabold">
        AI - POWERED PLANT DISEASE DETECTION
      </h2>
      <ImageUploader onUpload={handleUpload} />
      {loading && <p className="mt-4 text-blue-600 font-semibold text-lg">Predicting...</p>}
      <PredictionResult result={result} />
    </div>
  );
};

export default App;
