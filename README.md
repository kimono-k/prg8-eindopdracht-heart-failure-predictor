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
<b>Je prototype is in staat een model te trainen met data van Kaggle</b>
<br />
Het model is trainbaar als je het model probeert te trainen via deze link:
https://kimono-k.github.io/prg8-eindopdracht-heart-failure-predictor/train.html

Training van het model:
// Op deze tegel wordt het Neural Network getraind
function startTraining(trainData, testData) {
  nn.train({ epochs: 10 }, () => finishedTraining(trainData, testData));
}

Data van Kaggle:
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

Console berichten:
![image](https://user-images.githubusercontent.com/34915099/230963879-894b8ef0-b30d-4ee7-9cfb-c26fd90c0b4c.png)

<b>Je dient het model op te kunnen slaan</b>
<br />
De afbeelding hieronder is bewijsmateriaal dat het model opgeslagen kan worden
![image](https://user-images.githubusercontent.com/34915099/230964537-f1dc4c8d-f340-4220-8339-7ad74ed1dd7e.png)

<bMet de opgeslagen data moet je een voorspelling kunnen doen</b>
<br />
Om dit te kunnen zien check de link: https://kimono-k.github.io/prg8-eindopdracht-heart-failure-predictor/model-load.html

![image](https://user-images.githubusercontent.com/34915099/230965576-c38aad8d-e2f2-49d5-b79d-42c20da8951b.png)


Via nn.load heb ik het model ingeladen zonder papa.parse te gebruiken.

/**
 * Loading the heartfailure.csv file
 */
function loadData() {
  // Create an ML5 Neural Network
  nn = ml5.neuralNetwork(options);

  /**
   * Loads in the model
   */
  const modelInfo = {
    model: "./model/model.json",
    metadata: "./model/model_meta.json",
    weights: "./model/model.weights.bin",
  };

  nn.load(modelInfo, () => {
    console.log("Model loaded!");
  });

  // Show elements after loading
  predictButton.style.display = "inline-block";
}


# Level 2

- Je hebt een scatterplot getekend om inzicht je data te krigen (alleen bij regression)
- Je hebt irrelevante data of foutieve data gefilterd --> YEP!
- Je hebt variatie in je training voorbeelden om te zorgen dat het model op de gewenste manier getraind wordt. --> input velden trainen

# Level 3

- Testen hoe vaak jouw algoritme de juiste voorspelling doet, -> dataset te splitsen in een training en een testset.
- Je kan aangeven of dit goed genoeg is voor het doel van jouw applicatie.

# Level 4

- Accuracy verbeteren door data aan te passen OF instellingen bij het trainen aan te passen (k veranderen bij het KNN algoritme).

# Prototype

- DISCLAIMER: ALLEEN TE VERKRIJGEN OP PROTOTYPE LEVEL 1

# Prototype - Level 1

- Er vindt geen training plaats in de uitwerking.
- Je gebruikt het model dat je zelf vantevoren hebt getraind in heb prototype.
- De uitwerking doet een voorspelling naar aanleiding van gebruiksinput.

# Prototype - Level 2

- Je hebt een gebruiksvriendelijke interface gebouwd met een professionele uitstraling.

# Prototype - Level 3

- Je hebt een tweede variant van je prototype
- Uitwerking gebouwd met een ander algoritme, met als doel om inzicht te krijgen in het verschil tussen de algoritmes. --> Beschrijf je bevindingen...
