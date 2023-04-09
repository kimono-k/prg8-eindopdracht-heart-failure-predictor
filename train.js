import { createChart, updateChart } from "./scatterplot.js";

// Creating a empty variable for ML5's neural network
let nn;

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
  // Prevents that the Neural Network learns the exacy order of CSV data
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
      sex: healthItem.sex,
      smoking: healthItem.smoking,
    };

    nn.addData(inputs, { death: healthItem.death });
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
}

loadData();
