import { DecisionTree } from "./libraries/decisiontree.js";
import { VegaTree } from "./libraries/vegatree.js";

//
// DATA
//
const csvFile = "./data/heartfailure.csv"; // dataset
const trainingLabel = "DEATH_EVENT";
const ignored = ["sex"];

//
// laad csv data als json
//
function loadData() {
  Papa.parse(csvFile, {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: (results) => trainModel(results.data), // gebruik deze data om te trainen
  });
}

//
// MACHINE LEARNING - Decision Tree
//
function trainModel(data) {
  data.sort(() => Math.random() - 0.5); // get rid of sort on labels
  // todo: splits data in traindata en testdata
  let trainData = data.slice(0, Math.floor(data.length * 0.8));
  let testData = data.slice(Math.floor(data.length * 0.8) + 1);
  console.log(testData);

  // maak het algoritme aan
  let decisionTree = new DecisionTree({
    ignoredAttributes: [ignored],
    trainingSet: trainData,
    categoryAttr: trainingLabel,
  });

  // Model opslaan als JSON
  let json = decisionTree.stringify;
  console.log(json);

  // Teken de decision tree -- node, breedte, hoogte, decision tree
  let visual = new VegaTree("#view", 900, 500, decisionTree.toJSON());

  // todo: maak een prediction met een sample uit de testdata
  const amountCorrect = [];
  const totalAmount = [];

  let correctSAmount = 0;
  let correctDAmount = 0;
  let incorrectDAmount = 0;
  let incorrectSAmount = 0;

  // todo: schrijf een for-loop waarin je alle rijen uit de testdata haalt
  for (let heartFailure of testData) {
    const heartFailureWithoutDeathEvent = { ...heartFailure };
    delete heartFailureWithoutDeathEvent.DEATH_EVENT;

    let heartFailurePrediction = decisionTree.predict(
      heartFailureWithoutDeathEvent
    );
    totalAmount.push(heartFailure);
    console.log(
      `Death label ${heartFailure.DEATH_EVENT} predicted ${heartFailurePrediction}`
    );
    console.log(`Goede voorspelling!`);

    if (heartFailure.DEATH_EVENT == heartFailurePrediction) {
      amountCorrect.push(heartFailurePrediction);
      if (heartFailure.DEATH_EVENT == 1 && heartFailurePrediction == 1) {
        correctDAmount++;
      }

      if (heartFailure.DEATH_EVENT == 0 && heartFailurePrediction == 0) {
        correctSAmount++;
      }
    } else {
      console.log(`Slechte voorspelling!`);

      if (heartFailure.DEATH_EVENT == 1 && heartFailurePrediction == 0) {
        incorrectDAmount++;
      }

      if (heartFailure.DEATH_EVENT == 0 && heartFailurePrediction == 1) {
        incorrectSAmount++;
      }
    }
  }

  // todo: bereken de accuracy met behulp van alle testdata
  let accuracy = document.getElementById("accuracy");
  let roundedAccuracy = Math.round(
    (amountCorrect.length / totalAmount.length) * 100
  );
  accuracy.innerText = `Accuracy = ${roundedAccuracy}%`;

  // Maak een confusion matrix
  let correctDeath = document.getElementById(`correctD`);
  let incorrectDeath = document.getElementById(`incorrectD`);
  let correctSurvived = document.getElementById(`correctS`);
  let incorrectSurvived = document.getElementById(`incorrectS`);

  correctDeath.innerText = `${correctDAmount}`;
  incorrectDeath.innerText = `${incorrectDAmount}`;
  correctSurvived.innerText = `${correctSAmount}`;
  incorrectSurvived.innerText = `${incorrectSAmount}`;
}

loadData();
