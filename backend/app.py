import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np
import pickle as pkl

app = Flask(__name__)
CORS(app)  # Allow CORS for all origins

# Get the base path of the current directory (where app.py is located)
base_path = os.path.dirname(os.path.abspath(__file__))

# Load your trained model
model = tf.keras.models.load_model(os.path.join(base_path, 'cropcare_final.h5'))

# Load class labels (assumed to be stored in a pickle file)
with open(os.path.join(base_path, 'class_labels.pkl'), 'rb') as f:
    class_names = pkl.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        img = Image.open(file)
        img = img.resize((128, 128))  # Resize image to match model input
        img = np.array(img) / 255.0  # Normalize image
        img = np.expand_dims(img, axis=0)  # Add batch dimension

        # Make prediction
        prediction = model.predict(img)
        predicted_class = np.argmax(prediction, axis=1)[0]
        disease_name = class_names[predicted_class]

        return jsonify({
            'disease': disease_name,
            'confidence': float(prediction[0][predicted_class])
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
