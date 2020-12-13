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
const HumanObj = function (person, feet, inches, weight, diet) {
  (this.person = person),
    (this.feet = feet),
    (this.inches = inches),
    (this.weight = weight),
    (this.diet = diet);
};

// Get human data from form
// TODO: Use IIFE?

let human = new HumanObj();

document.getElementById("btn").addEventListener("click", function (e) {
  e.preventDefault();
  human.person = document.getElementById("name").value;
  human.feet = parseFloat(document.getElementById("feet").value);
  human.inches = parseFloat(document.getElementById("inches").value);
  human.weight = parseFloat(document.getElementById("weight").value);
  human.diet = document.getElementById("diet").value;
  console.log(human);
});

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
