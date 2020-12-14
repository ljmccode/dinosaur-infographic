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
};

// Logs array of dino objects
function readDinos() {
  console.log(dinos);
}

readDinos();

// Create Human Object
const HumanObj = function (person, height, weight, diet) {
  (this.person = person),
    (this.height = height),
    (this.inches = inches),
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
  compareDiet: function(humanDiet) {
      if (this.diet === humanDiet) {
          return `You have the same diet as a ${this.species}`
      } else {
          return `The ${this.species} is a ${this.diet}`
      }
  }
};

// Adds the DinoMethod object with comparison methods as a prototype to the Dino constructor
Dino.prototype = dinoMethods;

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
