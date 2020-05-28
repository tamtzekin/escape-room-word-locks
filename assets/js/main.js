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

/*TODO:*/
// how do you want to catch incorrect answers?
// catch different cases upper/lower (convert all to lowercase first?)

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

// answers
form.addEventListener("submit", (e) => {
  let messages = [];
  const answers = ["love", "bravery", "brotherhood", "truth"];

  checkLocks();
  escapeCheck();
  checkForString();

  function displayMessage(doornumber) {
    messages.push(`${doornumber}` + "\n")
    //   messages.push("\n" + `${doornumber}` + " password: Correct")
  }

  // First thing, can we have all text appear either on the right hand side, next to the password input or immediately underneath.
  // Do you think it's possible if someone puts the right answer in the wrong field, they get this message: "Oh so close! This is the right word in the wrong spot."
  // if they answer entirely incorrectly, can we serve this message: "That’s not it. You can have one more try."
  // When you get all four correct. I like using the dialog box for effect ("True, True, True, True" -> "You hear a click, something's happened..."). After that, i'd like a whole paragraph and potentially also an image to appear underneath or alongside the password input. Is that possible?

  // 1. Check if string is in the array
  // 2. Check if array is equal to the right position
  // 3. Mark the answer

  function checkForString(guess) {
    if (answers.includes(guess)) {
      return true
    }
  }

  // function checkLocks() {
  //     const guessinput = 
  //     const answerindex = 
  //     whichDoor = true

  //     if (guessinput.value == answers(answerindex)) {
  //   doornumber =
  //     }
  // }

function checkLocks() {
  if (checkForString(questionOne.value) === true) {
    if (questionOne.value == answers[0]) {
      isDoorOneOpen = true,
      displayMessage("Correct word ✅"),
      questionone.disabled = true
    } else {
      displayMessage("Right word, wrong position\n")
    }
  } else {
    displayMessage("Incorrect word ❌ \n")
  }
  
  if (checkForString(questionTwo.value) === true) {
    if (questionTwo.value == answers[1]) {
      isDoorTwoOpen = true,
      displayMessage("Correct word ✅"),
      questiontwo.disabled = true
    } else {
      displayMessage("Right word, wrong position\n")
    }
  } else {
    displayMessage("Incorrect word ❌ \n")
  }
  
  if (checkForString(questionThree.value) === true) {
    if (questionThree.value == answers[2]) {
      isDoorThreeOpen = true,
      displayMessage("Correct word ✅"),
      questionthree.disabled = true
    } else {
      displayMessage("Right word, wrong position\n")
    }
  } else {
    displayMessage("Incorrect word ❌ \n")
  }
  
  if (checkForString(questionFour.value) === true) {
    if (questionFour.value == answers[3]) {
      isDoorFourOpen = true,
      displayMessage("Correct word ✅"),
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

  function escapeCheck() {
    if (isDoorOneOpen == true && isDoorTwoOpen == true && isDoorThreeOpen == true && isDoorFourOpen == true) {
      alert("YOU ESCAPEDYOUESCAPED"),
      displayMessage("Escape message Escape message Escape message Escape message Escape message Escape message")
    }
  }

  // function winMessage() {
  //     wintext.classList.add("js-fade fade-in")
  // }
})