import React from 'react';

const PredictionResult = ({ result }) => {
  if (!result) return null;

  return (
    <div className="p-4 mt-6 border rounded-lg bg-gray-100">
      <h2 className="text-xl font-semibold mb-2">Prediction Result</h2>
      <p><strong>Disease:</strong> {result.disease || "Not available"}</p>
      {/* <p><strong>Confidence:</strong> {result.confidence ? `${result.confidence}%` : "Not available"}</p> */}
    </div>
  );
};

export default PredictionResult;
