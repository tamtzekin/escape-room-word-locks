// Answer boxes
const form = document.getElementById("form");
const errorElement = document.getElementById("error");

const questionOne = document.getElementById("questionone");
const questionTwo = document.getElementById("questiontwo");
const questionThree = document.getElementById("questionthree");
const questionFour = document.getElementById("questionfour");

const winText = document.getElementById("wintext");

let isDoorOneOpen = false;
let isDoorTwoOpen = false;
let isDoorThreeOpen = false;
let isDoorFourOpen = false;

class Door {
  constructor(answer, open, errorMessage) {
    this.answer = answer;
    this.open = false;
    this.errorMessage = ""
  }

  getName() {
    return this.answer + " " + this.open + " " + this.errorMessage;
  }
}

// create an array of new instances of the class Door 
// let doors = [
//   new Door("love", false, "Error message"),
//   new Door("bravery", false, "Error message"),
//   new Door("brotherhood", false, "Error message"),
//   new Door("truth")
// ];

let doorOne = new Door("love", false, "Error message");
let doorTwo = new Door("bravery", false, "Error message");
let doorThree = new Door("brotherhood", false, "Error message");
let doorFour = new Door("truth", false, "Error message");

// Handle answer input
form.addEventListener("submit", (e) => {
  let messages = [];
  const answers = ["love", "bravery", "brotherhood", "truth"];

  checkAnswers();
  winCondition();

// Display error message
  function displayMessage(messagetext) {
    messages.push("\n" + `${messagetext}` + "\n")
  }

  function answerExists(answer) {
    if (answers.includes(answer)) {
      return true
    }
  }

function checkAnswers() {
  if (answerExists(questionOne.value)) {
    if (questionOne.value == answers[0]) {
      isDoorOneOpen = true,
      displayMessage("Correct word ✔️"),
      questionone.disabled = true
    } else {
      displayMessage("Right word, wrong position\n")
    }
  } else {
    displayMessage("Incorrect word ❌ \n")
  }
  
  if (answerExists(questionTwo.value)) {
    if (questionTwo.value == answers[1]) {
      isDoorTwoOpen = true,
      displayMessage("Correct word ✔️"),
      questiontwo.disabled = true
    } else {
      displayMessage("Right word, wrong position\n")
    }
  } else {
    displayMessage("Incorrect word ❌ \n")
  }
  
  if (answerExists(questionThree.value)) {
    if (questionThree.value == answers[2]) {
      isDoorThreeOpen = true,
      displayMessage("Correct word ✔️"),
      questionthree.disabled = true
    } else {
      displayMessage("Right word, wrong position\n")
    }
  } else {
    displayMessage("Incorrect word ❌ \n")
  }
  
  if (answerExists(questionFour.value)) {
    if (questionFour.value == answers[3]) {
      isDoorFourOpen = true,
      displayMessage("Correct word ✔️"),
      questionfour.disabled = true
    } else {
      displayMessage("Right word, wrong position\n")
    }
  } else {
    displayMessage("Incorrect word ❌ \n")
  }

// Message handling
  if (messages.length > 0) {
    e.preventDefault(),
    errorElement.innerText = messages.join("")
  } else {
    displayMessage("That's not it. \n Did you remember to put them in order? \n Try again.")
  }
}

  function winCondition() {
    if (isDoorOneOpen == true && isDoorTwoOpen == true && isDoorThreeOpen == true && isDoorFourOpen == true) {
      winText.classList.remove("is-paused")
    }
  }
})