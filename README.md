== EINDOPDRACHT WEEK 9 ==

# ML5 Terminology

Neural Network

- A set of algorithms that can learn to recognize patterns in data
  and make predictions or decisions based on that data.

Regression

- A type of problem where the goal is to predict a continous numerical value based on a set of input features.

Scatterplot

- A type of data visualization that is used to display the relationship
  between two sets of numerical data.
- Each data point is represented on a Cartesian coordinate system.
- X = DEATH_EVENT
- Y = Diabetes

# Concept

<b>Beschrijf kort het idee voor jouw applicatie</b>

Voor deze applicatie wil ik door middel van een Neural Network een voorspelling hoe groot de kans is dat een persoon een hartaanval krijgt op basis leeftijd, diabetes, hoge bloeddruk en geslacht

<b>Wat is de toegevoegde waarde van AI in jouw concept?</b>
Het concept zal meerwaarde brengen voor doktoren om te beslissen een medische interventie ingezet moet worden op een patient gebaseerd op de overlevingskans. Hiermee worden eventuele zorgen en kosten bespaard.

<b>Welke data heb je nodig en hoe kom je daar aan?</b>
Ik heb een <i>Heart Failure Prediction</i> dataset nodig die afkomstig is van Kaggle.
https://www.kaggle.com/datasets/marshuu/flowers
heartfailure.csv

<b>Welke library / algoritme denk jij dat geschikt voor jouw concept?</b>
De ML5 Neural Network library is het meest geschikt denk ik.

<b>Werk je met classification of regression?</b>
Ik werk met regression.

<b>Beschrijf de uiteindelijke vorm (Website, app, installatie, etc)</b>
De vorm zal zich manifesteren in een website met inputvelden waar de dokter een voorspelling kan doen of een patient een hartaanval kan gaan krijgen.

<b>Beschrijf kort de eindgebruiker en de doelgroep</b>
De eindgebruikers zijn doktoren die rationele beslssingen moeten maken om een medische interventie voor te zetten bij de patient [bij een hartaanval].

# Prototype

- Het prototype moet 1 van de algoritmes uit les 4 t/m 8 bevatten.
- Het prototype is getraind met jouw data.
- Mijn keuze:
  - ML5 Neural Network regression met eigen data of data van Kaggle

# Voorwaardelijke liefde

- Github broncode + live project.

# Level 1

## Je prototype is in staat een model te trainen met data van Kaggle

<br />
Het model is trainbaar als je het model probeert te trainen via deze link:
https://kimono-k.github.io/prg8-eindopdracht-heart-failure-predictor/train.html

Training van het model:

```js
// Op deze regel wordt het Neural Network getraind
function startTraining(trainData, testData) {
  nn.train({ epochs: 10 }, () => finishedTraining(trainData, testData));
}
```

## Data van Kaggle: https://www.kaggle.com/datasets/fedesoriano/heart-failure-prediction

```js
function loadData() {
  Papa.parse("./data/heartfailure.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: (results) => createNeuralNetwork(results.data),
  });
}
```

## Console berichten:

![image](https://user-images.githubusercontent.com/34915099/230963879-894b8ef0-b30d-4ee7-9cfb-c26fd90c0b4c.png)

## Je dient het model op te kunnen slaan<

De afbeelding hieronder is bewijsmateriaal dat het model opgeslagen kan worden
![image](https://user-images.githubusercontent.com/34915099/230964537-f1dc4c8d-f340-4220-8339-7ad74ed1dd7e.png)

## Met de opgeslagen data moet je een voorspelling kunnen doen

Om dit te kunnen zien check de link: https://kimono-k.github.io/prg8-eindopdracht-heart-failure-predictor/model-load.html

![image](https://user-images.githubusercontent.com/34915099/230965576-c38aad8d-e2f2-49d5-b79d-42c20da8951b.png)

Via nn.load heb ik het model ingeladen zonder papa.parse te gebruiken.

# Level 2

## Je hebt een scatterplot getekend om inzicht je data te krigen (alleen bij regression)

Het scatterplot is te vinden op https://kimono-k.github.io/prg8-eindopdracht-heart-failure-predictor/train.html

Het scatterplot dat ik heb getekend.
![image](https://user-images.githubusercontent.com/34915099/230967159-abb5ac22-f2d2-465d-9b30-231b232fa4af.png)

## Je hebt irrelevante data of foutieve data gefilterd

Ja, dit heb ik gedaan het probleem met de train data was dat er null values in de tabel tevoorschijn kwamen deze heb ik eruit gefilterd met de filter functie. In de console kun je de gelogde array controleren op waarheid.

```js
// Slice data into test and training data
let trainData = data.slice(0, Math.floor(data.length * 0.8));
let testData = data.slice(Math.floor(data.length * 0.8) + 1);

// Filter out the unnecessary null values from test and training data
let filteredTrainData = trainData.filter((trainItem) => trainItem.age !== null);
let filteredTestData = testData.filter((testItem) => testItem.age !== null);
```

## Je hebt variatie in je training voorbeelden om te zorgen dat het model op de gewenste manier getraind wordt.

Ja, er is variatie doordat ik meerdere input velden heb gebruikt zoals, leeftijd, diabetes, geslacht, hoge bloeddruk.

![image](https://user-images.githubusercontent.com/34915099/230968060-4af45457-22c0-4d7a-963a-5277eaf906a3.png)

Variatie door meerdere inputs

```js
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
```

# Level 3

- Testen hoe vaak jouw algoritme de juiste voorspelling doet, -> dataset te splitsen in een training en een testset.
- Je kan aangeven of dit goed genoeg is voor het doel van jouw applicatie.

# Level 4

- Accuracy verbeteren door data aan te passen OF instellingen bij het trainen aan te passen (k veranderen bij het KNN algoritme).

# Prototype

- DISCLAIMER: ALLEEN TE VERKRIJGEN OP PROTOTYPE LEVEL 1

# Prototype - Level 1

## Er vindt geen training plaats in de uitwerking.

Er vindt wel training plaats.

## Je gebruikt het model dat je zelf vantevoren hebt getraind in het prototype.

Ja, dat is het opgeslagen model in json. Check de pagina https://kimono-k.github.io/prg8-eindopdracht-heart-failure-predictor/model-load.html

## De uitwerking doet een voorspelling naar aanleiding van gebruiksinput.

Dat is mogelijk door de inputvelden in te voeren.
https://kimono-k.github.io/prg8-eindopdracht-heart-failure-predictor/model-load.html

# Prototype - Level 2

## Je hebt een gebruiksvriendelijke interface gebouwd met een professionele uitstraling.

Ik heb de UI netjes gestyled met CSS en een Monserrat font gedownload om het een nettere uitstraling te geven. Ook zijn er placeholders in de gebruikersvelden die de UI intuitiever maken voor de gebruiker. Ook is de predict button niet zichtbaar als het model niet geladen is. In de model load is er client-side form validatie die netjes wordt afgehandeld als velden niet ingevuld zijn.

https://kimono-k.github.io/prg8-eindopdracht-heart-failure-predictor/model-load.html

![image](https://user-images.githubusercontent.com/34915099/230968680-a24cd33f-ebbb-43b8-9214-382f98dfb715.png)

Hieronder staat de logica voor de form validatie

```js
/**
 * Creates a prediction of the amount of deaths based on age, diabetes, high blood pressure, and sex
 */
async function makePrediction(age, diabetes, high_blood_pressure, sex) {
  if (
    (age && diabetes === 0) ||
    (diabetes === 1 && high_blood_pressure !== undefined && sex === 0) ||
    sex === 1
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
      resultDiv.innerText = `De patient krijgt een hartaanval ${deathEvent}`;
    } else {
      resultDiv.innerText = `De patient krijgt geen hartaanval`;
    }
  } else {
    resultDiv.innerText = `Please fill in all the fields correctly! The diabetes and sex field should be either 0 or 1 or you left fields empty`;
  }
}
```

# Prototype - Level 3

## Je hebt een tweede variant van je prototype

Ik ben van plan om wellicht nog een decision tree variant van dit prototype te maken.

- Uitwerking gebouwd met een ander algoritme, met als doel om inzicht te krijgen in het verschil tussen de algoritmes. --> Beschrijf je bevindingen...

# Mijn voorspelde totaalscore voor de opdracht

- Ik denk dat ik 3 punten behaald voor de eindopdracht heb met de argumentatie en bewijzen.
