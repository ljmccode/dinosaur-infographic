//  Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
}

// Grab Dinos from JSON file
const getDinoData = async () => {
  const fetchedData = await fetch("./dino.json");
  const data = await fetchedData.json();
  return data.Dinos;
};

// Create Dino Objects

// Empty array for dino objects
const dinos = [];

window.onload = async function () {
  const dinoArr = await getDinoData();
  dinoArr.forEach((dino) => {
    dinos.push(
      new Dino(
        dino.species,
        dino.weight,
        dino.height,
        dino.diet,
        dino.where,
        dino.when,
        dino.fact
      )
    );
  });
  readDinos();
};

// Logs array of dino objects
function readDinos() {
  console.log(dinos[0].diet);
}

// Create Human Object
const HumanObj = function (person, height, weight, diet) {
  (this.person = person),
    (this.height = height),
    (this.weight = weight),
    (this.diet = diet);
};

let human = new HumanObj();

// Get human data from form
// TODO: Use IIFE?
document.getElementById("btn").addEventListener("click", function (e) {
  e.preventDefault();
  let feet = parseFloat(document.getElementById("feet").value);
  let inches = parseFloat(document.getElementById("inches").value);
  human.person = document.getElementById("name").value;
  human.height = feet * 12 + inches;
  human.weight = parseFloat(document.getElementById("weight").value);
  human.diet = document.getElementById("diet").value;
  console.log(human);
});

// Creates a object with 3 comparison methods
let dinoMethods = {
  compareWeight: function (humanWeight) {
    let weightDifference = this.weight - humanWeight;
    if (weightDifference > 0) {
      return `${this.species} weighs ${weightDifference} pounds than you!`;
    } else if (weightDifference < 0) {
      weightDifference *= -1;
      return `You weigh ${weightDifference} more pounds than a ${this.species}!`;
    } else {
      return `You weight the same as ${this.species}!`;
    }
  },
  compareHeight: function (humanHeight) {
    let heightDifference = this.height - humanHeight;
    if (heightDifference > 0) {
      return `${this.species} is ${heightDifference} inches taller than you!`;
    } else if (heightDifference < 0) {
      heightDifference *= -1;
      return `You are ${heightDifference} inches taller than a ${this.species}!`;
    } else {
      return `You are the same height as ${this.species}!`;
    }
  },
  compareDiet: function (humanDiet) {
    if (this.diet === humanDiet) {
      return `You have the same diet as a ${this.species}!`;
    } else {
      return `The ${this.species} is a ${this.diet}`;
    }
  },
};

// Adds the DinoMethod object with comparison methods as a prototype to the Dino constructor
Dino.prototype = dinoMethods;

// Generate Tiles for each Dino in Array
function generateDinoTile(dino, human, randomNumber) {
  let fact;
  //   fact displayed will always be fact for Pigeon
  if (dino.species === "Pigeon") {
    randomNumber = 3;
  }
  switch (randomNumber) {
    case 0:
      // display fact about height
      fact = dino.compareHeight(human.height);
      break
    case 1:
      // display fact about weight
      fact = dino.compareWeight(human.weight);
      break
    case 2:
      // display fact about diet
      fact = dino.compareDiet(human.diet);
      break
    case 3:
      // display fact as fact
      fact = dino.fact;
      break
    case 4:
      // display when as fact
      fact = `${dino.species} lived in ${dino.where}.`;
      break
    case 5:
      // display where as fact
      fact = `${dino.species} lived in the ${dino.where} period.`;
      break
    default:
      console.log('Dinosaurs!');
  }
    const dinoDiv = document.createElement('<div>');
    dinoDiv.className = 'grid-item';
    dinoDiv.innerHTML = `<h2>${dino.species}</h2><img src="images/${dino.species.toLowerCase()}.png" alt="${dino.species} image"><p>${fact}</p>`

    return dinoDiv;
}

// function created to generate a human div
function generateHumanTile(human) {
    const humanDiv = document.createElement('<div>');
    humanDiv.className = 'grid-item';
    humanDiv.innerHTML = `<h2>${human.person}</h2><img src="images/human.png" alt="human image">`
    
    return humanDiv;

}

function createRandomNumber() {
  return Math.floor(Math.random() * 5);
}

let randomNumber = createRandomNumber();

// Add tiles to DOM
function createInfographic (dinos, human, randomNumber) {
    let infoHTML;
    
    for (let i = 0; i < 9; i++) {
        // will always put human in the center
        let tile = i === 4 ? generateHumanTile(human) : generateDinoTile(dinos[i], human, randomNumber);
        infoHTML += tile
    }
    document.getElementById("grid").append(infoHTML);
}

// Remove form from screen

// On button click, prepare and display infographic
