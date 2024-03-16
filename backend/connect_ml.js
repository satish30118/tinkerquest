// Example using TensorFlow.js

// Install TensorFlow.js
// npm install @tensorflow/tfjs

const tf = require('@tensorflow/tfjs');

// Load your exported model
async function loadModel() {
    const model = await tf.loadLayersModel('./ml_file/main1.py');
    return model;
}

// Use the model for prediction
async function predict(inputData) {
    const model = await loadModel();
    const inputTensor = tf.tensor(inputData);
    const output = model.predict(inputTensor);
    return output.dataSync(); // Assuming synchronous prediction
}

// Example usage
const inputData = [1, 2, 3, 4];
predict(inputData)
    .then(prediction => console.log('Prediction:', prediction))
    .catch(err => console.error('Prediction error:', err));
