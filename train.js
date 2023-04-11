import { createChart, updateChart } from "./scatterplot.js";

// Creating a empty variable for ML5's neural network
let nn;

// Data input DOM elements
const ageInputField = document.getElementById("age-input-field");
const diabetesInputField = document.getElementById("diabetes-input-field");
const highBloodPressureInputField = document.getElementById(
  "high-blood-pressure-input-field"
);
const sexInputField = document.getElementById("sex-input-field");

// DOM Element Buttons
const predictButton = document.getElementById("prediction-btn");
const saveButton = document.getElementById("save-btn");

// Display result reference
const resultDiv = document.getElementById("result");

// Hide the elements on the first boot
predictButton.style.display = "none";

/**
 * Fires the prediction and shows it in the viewport
 */
predictButton.addEventListener("click", (e) => {
  e.preventDefault();
  let ageInputFieldValue = document.getElementById("age-input-field").value;
  let diabetesInputFieldValue = document.getElementById(
    "diabetes-input-field"
  ).value;
  let highBloodPressureInputFieldValue = document.getElementById(
    "high-blood-pressure-input-field"
  ).value;
  let sexInputFieldValue = document.getElementById("sex-input-field").value;
  makePrediction(
    +ageInputFieldValue,
    +diabetesInputFieldValue,
    +highBloodPressureInputFieldValue,
    +sexInputFieldValue
  );
});

/**
 * Save the trained model
 */
saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  nn.save();
});

/**
 * Loading the heartfailure.csv file
 */
function loadData() {
  Papa.parse("./data/heartfailure.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: (results) => createNeuralNetwork(results.data),
  });
}

/**
 * Creating a Neural Network
 */
function createNeuralNetwork(data) {
  // Prevents that the Neural Network learns the exact order of CSV data
  data.sort(() => Math.random() - 0.5);

  // Slice data into test and training data
  let trainData = data.slice(0, Math.floor(data.length * 0.8));
  let testData = data.slice(Math.floor(data.length * 0.8) + 1);

  // Filter out the unnecessary null values from test and training data
  let filteredTrainData = trainData.filter(
    (trainItem) => trainItem.age !== null
  );
  let filteredTestData = testData.filter((testItem) => testItem.age !== null);

  // Specify working with regression
  const options = {
    task: "regression",
    debug: true,
  };

  // Create an ML5 Neural Network
  nn = ml5.neuralNetwork(options);

  addItems(filteredTrainData, filteredTestData);
}

/**
 * Adds items to the ML5 Neural Network
 */
function addItems(trainData, testData) {
  for (let healthItem of trainData) {
    let inputs = {
      age: healthItem.age,
      diabetes: healthItem.diabetes,
      high_blood_pressure: healthItem.high_blood_pressure,
      sex: healthItem.sex,
    };

    nn.addData(inputs, { death: healthItem.platelets });
  }

  // Normalize: Prevents that some columns have higher precedence than others
  nn.normalizeData();

  checkData(trainData, testData);
}

/**
 * Checks if loading of the CSV file was succesful
 */
function checkData(trainData, testData) {
  console.table(testData);
  createScatterplot(trainData, testData);
}

/**
 * Creates a scatterplot
 */
function createScatterplot(trainData, testData) {
  // Prepare the data for the scatterplot
  const chartData = trainData.map((healthItem) => ({
    x: healthItem.high_blood_pressure,
    y: healthItem.death,
  }));

  // Create a scatterplot
  createChart(chartData, "Age", "High Blood Pressure");

  // Pass data to next function
  startTraining(trainData, testData);
}

function startTraining(trainData, testData) {
  nn.train({ epochs: 10 }, () => finishedTraining(trainData, testData));
}

async function finishedTraining(traindata = false, testData) {
  // Empty array to push all the data in later on
  let predictions = [];

  // For loop for every possible death in CSV
  for (let dh = 0; dh < 70; dh += 5) {
    const testPlatelets = {
      age: testData[0].age,
      diabetes: testData[0].diabetes,
      high_blood_pressure: testData[0].high_blood_pressure,
      sex: testData[0].sex,
    };
    const pred = await nn.predict(testPlatelets);
    predictions.push({ x: dh, y: pred[0].death });
  }

  // Adds the neural network data to the chart
  updateChart("Heart Failure", predictions);
  console.log("Finished training!");
  predictButton.style.display = "inline-block";
}

/**
 * Creates a prediction of the amount of deaths based on age, diabetes, high blood pressure, and sex
 */
async function makePrediction(age, diabetes, high_blood_pressure, sex) {
  if (
    age &&
    diabetes !== undefined &&
    high_blood_pressure !== undefined &&
    sex < 2
  ) {
    const results = await nn.predict(
      {
        age: age,
        diabetes: diabetes,
        high_blood_pressure: high_blood_pressure,
        sex: sex,
      },
      () => console.log("Prediction successful!")
    );
    const deathProb = results[0].death;
    console.log(deathProb);
    const deathEvent = deathProb >= 0.5 ? 1 : 0;
    if (deathEvent === 1) {
      resultDiv.innerText = `De patient krijgt een hartaanval -- De originele voorspelling is ${deathProb}`;
    } else {
      resultDiv.innerText = `De patient krijgt geen hartaanval -- De originele voorspelling is ${deathProb}`;
    }
  } else {
    resultDiv.innerText = `Please fill in all the fields, numbskull!`;
  }
}

loadData();
