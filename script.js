
/*
document.getElementById('startCamera').addEventListener('click', async function() {
    const video = document.getElementById('video');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error('Error al acceder a la cámara:', error);
    }
});
*/


document.addEventListener('DOMContentLoaded', async function() {
    const video = document.getElementById('video');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error('Error al acceder a la cámara:', error);
    }
});

document.getElementById('predictButton').addEventListener('click', async function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 160;
    canvas.height = 160;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
/*
    const model = await tf.loadLayersModel('model/model.json');
    const tensor = tf.browser.fromPixels(canvas).toFloat().expandDims(0);
    const normalizedTensor = tf.div(tensor, 255.0);

    const predictions = await model.predict(normalizedTensor).data();
    const maxPrediction = Math.max(...predictions);
    const predictedClass = predictions.indexOf(maxPrediction);

    const categoryNames = ["anillos", "aretes", "collares", "pulseras"];
    const predictedCategory = categoryNames[predictedClass];

    document.getElementById('predictedCategory').textContent = `Categoría: ${predictedCategory}`;*/

    // Agrega un tiempo de demora de 3 segundos (3000 milisegundos) antes de realizar la predicción
    const delayMilliseconds = 1000;
    setTimeout(async function() {
        const model = await tf.loadLayersModel('model/model.json');
        const tensor = tf.browser.fromPixels(canvas).toFloat().expandDims(0);
        const normalizedTensor = tf.div(tensor, 255.0);

        const startTime = performance.now(); // Registro de tiempo de inicio
        const predictions = await model.predict(normalizedTensor).data();
        const endTime = performance.now(); // Registro de tiempo de finalización

        const maxPrediction = Math.max(...predictions);
        const predictedClass = predictions.indexOf(maxPrediction);

        const categoryNames = ["anillos", "aretes", "collares", "pulseras"];
        const predictedCategory = categoryNames[predictedClass];

        document.getElementById('predictedCategory').textContent = `${predictedCategory}`;

        // Calcula y muestra el tiempo que tardó la predicción
        const predictionTime = (endTime - startTime).toFixed(2); // En milisegundos
        console.log(`Tiempo de predicción: ${predictionTime} ms`);
        document.getElementById('predictionTime').textContent = `${predictionTime} ms`;

        // Calcula y muestra el tiempo que tardó la predicción en segundos
        const predictionTimeInSeconds = ((endTime - startTime) / 1000).toFixed(2); // En segundos
        console.log(`Tiempo de predicción en segundos: ${predictionTimeInSeconds} s`);
        document.getElementById('predictionTimeInSeconds').textContent = `${predictionTimeInSeconds} s`;


    }, delayMilliseconds);
});















// Función para obtener la categoría predicha
/*function getPredictedClass(predictions) {
    // Encuentra el índice de la categoría con la probabilidad más alta
    const maxPredictionIndex = predictions.indexOf(Math.max(...predictions));

    // Mapea el índice de la categoría a un nombre de categoría (personaliza según tus categorías)
    const categoryNames = ["anillos","aretes","collares","pulseras"];
    return categoryNames[maxPredictionIndex];
}*/