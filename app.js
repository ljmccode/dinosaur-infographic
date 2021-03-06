//  Dino Constructor function
function Dino(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
}

// Grabs Dinos from JSON file
const getDinoData = async () => {
  const fetchedData = await fetch("./dino.json");
  const data = await fetchedData.json();
  return data.Dinos;
};

// Empty array for dino objects
const dinos = [];

// Empty array for random numbers
// Ensure fact generated for one user isn't the same
let randomNumbers = [];

// Creates random number between 0 and 5
function createRandomNumber() {
    if (randomNumbers.length === 5) {
        outOfFacts();
    }
    if (randomNumbers.length === 6) {
        randomNumbers = [];
    }
    let randomNumber;
    // makes sure number generated isn't in the randomNumber array already
    while (randomNumber === undefined || randomNumbers.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * 6);
    }
    randomNumbers.push(randomNumber);
    return randomNumber;
}

// Once user has seen all facts, 
// user is informed and new fact button disappears  
function outOfFacts() {
    document.querySelector(".new-fact").style.display = "none";
    document.querySelector(".no-facts").classList.remove("hide");
}


// Inserts Human placeholder in dino array so all tiles appear on DOM
function addHuman() {
    dinos.splice(4, 0, ["Human placeholder"]);
  }

// Create Dino Objects and push into dinos array
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
  addHuman();
};

// Creates Human Object
const HumanObj = function (person, height, weight, diet) {
  this.person = person,
  this.height = height,
  this.weight = weight,
  this.diet = diet;
};

// Function that creates new human object from form data
function getHumanData() {
  const human = new HumanObj();

  const feet = parseFloat(document.getElementById("feet").value);
  const inches = parseFloat(document.getElementById("inches").value);
  human.person = document.getElementById("name").value;
  human.height = feet * 12 + inches;
  human.weight = parseFloat(document.getElementById("weight").value);
  human.diet = document.getElementById("diet").value;
  return human;
}

// Displays form errors for each input if not filled out
function formValidation(human) {
    let isValid = true;
    if (human.person === '') {
        document.getElementById("no-name").style.display = "block";
        isValid = false;
    }
    if (isNaN(human.height)) {
        document.getElementById("no-height").style.display = "block";
        isValid = false;
    } 
    if (isNaN(human.weight)) {
        document.getElementById("no-weight").style.display = "block";
        isValid = false;  
    }
    return isValid;
}

// Creates a object with 3 comparison methods
const dinoMethods = {
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
    if (this.diet === humanDiet.toLowerCase()) {
      return `You have the same diet as a ${this.species}!`;
    } else {
      return `The ${this.species} is a ${this.diet} and you are a ${humanDiet}`;
    }
  },
};

// Adds the dinoMethods object with comparison methods as prototype to the Dino class
Dino.prototype = dinoMethods;

// Generate Tiles for each Dino in Array
function generateDinoTile(dino, human, randomNumber) {
  let fact;
  //   fact displayed will always be fact for Pigeon
  if (dino.species === "Pigeon") {
    randomNumber = 3;
  }
  //  Determines fact to display 
  switch (randomNumber) {
    case 0:
      // display fact about height
      fact = dino.compareHeight(human.height);
      break;
    case 1:
      // display fact about weight
      fact = dino.compareWeight(human.weight);
      break;
    case 2:
      // display fact about diet
      fact = dino.compareDiet(human.diet);
      break;
    case 3:
      // display fact as fact
      fact = dino.fact;
      break;
    case 4:
      // display when as fact
      fact = `${dino.species} lived in ${dino.where}.`;
      break;
    case 5:
      // display when as fact
      fact = `${dino.species} lived in the ${dino.when} period.`;
      break;
  }
  
  // Creates new div element with dino name, image, and fact
  const dinoDiv = document.createElement("div");
  dinoDiv.className = "grid-item";
  dinoDiv.innerHTML = `<h3>${
    dino.species
  }</h3><img src="images/${dino.species.toLowerCase()}.png" alt="${
    dino.species
  } image"><p>${fact}</p>`;

  return dinoDiv;
}

// Creates new div element with human name and image
function generateHumanTile(human) {
  const humanDiv = document.createElement("div");
  humanDiv.className = "grid-item";
  humanDiv.innerHTML = `<h3>${human.person}</h3><img src="images/human.png" alt="human image">`;

  return humanDiv;
}

// Add tiles to DOM
function createInfographic(dinos, human, randomNumber, isValid) {
  const fragment = new DocumentFragment();

  // creates a tile for dinos and human and appends to document fragment
  for (let i = 0; i < 9; i++) {
    const tile =
    // makes sure the 4th tile is human so it's in the center
      i === 4
        ? generateHumanTile(human)
        : generateDinoTile(dinos[i], human, randomNumber);
    fragment.appendChild(tile);
  }
  // appends all tiles to grid
  document.getElementById("grid").appendChild(fragment);

  // if form passes validation, remove form from view and display infographic
  // otherwise grid is cleared
  if (isValid) {
    document.querySelector("form").style.display = "none";
    document.querySelector(".retry").classList.remove("hide");
    document.querySelector(".new-fact").classList.remove("hide");
    document.querySelector(".new-fact").style.display = "inline block";
    document.getElementById("grid").style.display = "flex";
  } else {
    document.getElementById("grid").innerHTML = "";
  }
}

// Hides infographic, displays form, and clears previous form inputs
function reset() {
  document.getElementById("name").value = "";
  document.getElementById("feet").value = "";
  document.getElementById("inches").value = "";
  document.getElementById("weight").value = "";
  document.querySelector(".retry").classList.add("hide");
  document.querySelector(".new-fact").classList.add("hide");
  document.querySelector(".no-facts").classList.add("hide");
  document.querySelector("form").style.display = "block";
  document.getElementById("grid").style.display = "none";
  document.getElementById("grid").innerHTML = "";
}

// Removes any form errors
function hideValidation() {
  document.getElementById("no-name").style.display = "none";
  document.getElementById("no-weight").style.display = "none";
  document.getElementById("no-height").style.display = "none";
  document.querySelector(".new-fact").style.display = "inline-block";
}

let currentUser;

// On button click, prepare and display infographic
document.getElementById("btn").addEventListener("click", (e) => {
  e.preventDefault();
  hideValidation();
  const humanInfo = getHumanData();
  currentUser = humanInfo;
  const randomNumber = createRandomNumber();
  const isValid = formValidation(humanInfo);

  createInfographic(dinos, humanInfo, randomNumber, isValid);
});

// Allows new user to fill out form
document.querySelector(".retry").addEventListener("click", () => {
  reset();
  randomNumbers = [];
});

// display new fact 
document.querySelector(".new-fact").addEventListener("click", () => {
    const randomNumber = createRandomNumber();
    const isValid = true;
    document.getElementById("grid").innerHTML = "";
    createInfographic(dinos, currentUser, randomNumber, isValid);
});
