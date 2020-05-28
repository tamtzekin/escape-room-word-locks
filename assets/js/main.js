// Answer boxes
const form = document.getElementById("form");
const statusElement = document.getElementById("status");
 
const winText = document.getElementById("wintext");
 
class Door {
  inputElement;
  constructor(answer, inputElement, markerElement) {
    this.answer = answer;
    this.inputElement = inputElement;
    this.markerElement = markerElement;
    this.open = false;
  }
  getName() {
    return this.answer + " " + this.open + " ";
  }
}
 
// Build door data
const formIds = ['questionone', 'questiontwo', 'questionthree', 'questionfour'];
const correctAnswers = ["love", "bravery", "brotherhood", "truth"];
const markerIds = ['questiononemarker', 'questiontwomarker', 'questionthreemarker', 'questionfourmarker'];

if (formIds.length != correctAnswers.length) {
  throw new Error('# of answers doesnt match # of forms')
}
const doors = [];
 
for (let i = 0; i < correctAnswers.length; i++) {
  doors.push(new Door(correctAnswers[i], document.getElementById(formIds[i]), document.getElementById(markerIds[i])));
}
 
// now each door knows its answer, its form element, and its state of open/closed
 
// Handle answer input
form.addEventListener("submit", (e) => {
  // guesses changes each submit, it doesn't need to exist as a global var
  const guesses = [];
  for (const door of doors) {
    guesses.push(door.inputElement.value);
  }
  checkAnswers(doors, guesses);
  winCondition(doors);
  e.preventDefault();
});
 
// functions should have input/output and not exist inside main thread flow generally
function checkAnswers(doors, guesses) {
  const messages = [];
  let atLeastOneInWrongPosition = false;
  for (let i = 0; i < doors.length; i++) {
    const guess = guesses[i];
    const correctAnswer = doors[i].answer;
    if (guess === correctAnswer) {
      doors[i].open = true;
      doors[i].inputElement.disabled = true;
      doors[i].markerElement.classList.remove("is-paused");
      doors[i].markerElement.classList.remove("is-locked");
      doors[i].markerElement.classList.add("is-open");
      doors[i].get;
      console.log(doors[i].markerElement);

    } else if (correctAnswers.includes(guess)) {
      atLeastOneInWrongPosition = true;

    } else if (guess !== correctAnswer) {
      doors[i].markerElement.classList.remove("is-paused");
      doors[i].markerElement.classList.add("is-locked");
      console.log(doors[i].markerElement);
    }

  }
  // TODO: remove debug statement
  // console.log(JSON.stringify(doors));
  const correctCount = doors.filter(door => door.open === true).length;
  if (correctCount === 0) {
    messages.push('Try again.')
  } else if (correctCount > 0 && correctCount < 4) {
    messages.push("You're almost there!")
  }
  if (atLeastOneInWrongPosition) {
    messages.push('At least one word is correct but in the wrong position')
  }
  statusElement.innerText = messages.join("\n")
}
 
function winCondition(doors) {
  const allDoorsUnlocked = doors.filter(door => {
    return door.open === false
  }).length === 0;
  if (allDoorsUnlocked) {
    winText.classList.remove("is-paused")
  }
}