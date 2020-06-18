/* Escape room password doors */
const form = document.getElementById('form');
const statusElement = document.getElementById('status');
const winText = document.getElementById('wintext');
 
class Door {
    constructor(answer, inputElement, markerElement) {
        this.answer = answer;
        this.inputElement = inputElement;
        this.markerElement = markerElement;
        this.open = false;
  }
  getName() {
      return this.answer + ' ' + this.open + ' ';
    }
};

// Build door data
const formIds = ['questionone', 'questiontwo', 'questionthree', 'questionfour'];
const correctAnswers = ["LOVE", "BRAVERY", "BROTHERHOOD", "TRUTH"];
const markerIds = ['questiononemarker', 'questiontwomarker', 'questionthreemarker', 'questionfourmarker'];

if (formIds.length != correctAnswers.length) {
    throw new Error('# of answers doesnt match # of forms')
};

const doors = [];
 
for (let i = 0; i < correctAnswers.length; i++) {
    doors.push(new Door(correctAnswers[i], document.getElementById(formIds[i]), document.getElementById(markerIds[i])));
};
  
// Handle answer input
form.addEventListener('submit', (e) => {
    const guesses = [];
    e.preventDefault();
    for (const door of doors) {
        guesses.push(door.inputElement.value);
    }
    checkAnswers(doors, guesses);
    winCondition(doors);
});

function checkAnswers(doors, guesses) {
    const messages = [];
    let atLeastOneInWrongPosition = false;
    for (let i = 0; i < doors.length; i++) {
        const guess = guesses[i];
        const correctAnswer = doors[i].answer;
        
        if (guess === correctAnswer) {
            doors[i].open = true;
            doors[i].inputElement.disabled = true;
            doors[i].markerElement.classList = '';
            // doors[i].markerElement.classList.remove('is-hidden');
            doors[i].markerElement.classList.add('is-visible');
            // doors[i].markerElement.classList.remove('is-locked');
            doors[i].markerElement.classList.add('is-open');
            doors[i].get;
        } else if (correctAnswers.includes(guess)) {
            atLeastOneInWrongPosition = true;
            doors[i].markerElement.classList = '';
            // doors[i].markerElement.classList.remove('is-hidden');
            doors[i].markerElement.classList.add('is-visible');
            doors[i].markerElement.classList.add('is-close');
        } else if (guess !== correctAnswer) {
            doors[i].markerElement.classList = '';
            // doors[i].markerElement.classList.remove('is-hidden');
            doors[i].markerElement.classList.add('is-visible');
            doors[i].markerElement.classList.add('is-locked');
        }
    };

    // Check answers
    const correctCount = doors.filter(door => door.open === true).length;

    if (correctCount === 0) {
        messages.push("That's not it. Try again.")
    } else if (correctCount > 0 && correctCount < 2) {
        messages.push("You're almost there.")
    } else if (correctCount > 0 && correctCount < 3) {
        messages.push("Keep going.")
    } else if (correctCount > 0 && correctCount < 4) {
        messages.push("Just one more to go.")
    }

    if (atLeastOneInWrongPosition) {
        messages.push("Are you sure you've got the right order?")
    }
    statusElement.classList.remove('is-hidden');
    statusElement.classList.add('is-visible');
    statusElement.innerText = messages.join('\n')
};

function winCondition(doors) {
    const allDoorsUnlocked = doors.filter(door => {
        return door.open === false
    }).length === 0;
    if (allDoorsUnlocked) {
        winText.classList.remove('is-hidden');
        winText.classList.add('is-visible');
        winText.innerHTML = '<p>You speak the four words into the receiver. The voice at the other end is silent, and for one dreadful moment you think you’ve gotten it wrong... then you hear a click. It comes from the glass door, the one that locked you in here at the start of all this. Is it open? Are you free? But what about the rewards the letter promised?</p>' +
        '<p>The soft voice on the phone speaks at last. </p>' +
        '<p>“Go outside and turn around.”</p>' +
        '<p>Bewildered, you do as it says. The door opens easily and you make your way back to the main foyer. It’s dark and ghostly silent – but as you reach the entrance, the warm, familiar sight of the Harbour greets you. It seems somehow brighter than usual. You head out and walk until you’re standing in front of the Monumental Steps. There are few passers-by at this hour, all of whom seem to be peering up at something behind you. You turn around.</p>' +
        '<p>Colours are swirling across the great white sails. Joyous reds, golds, aquas – all the colours of the painted animals you found – dancing over each other in a dazzling light projection. The person on the phone must be controlling it! The colours form words: those same words that made up the password. LOVE, BRAVERY, BROTHERHOOD, TRUTH. Then... one more.</p>' + 
        '<p>CLIMB.</p>' +
        '<p>You climb up the steps. Perched at the very top is a wooden box with a note attached.</p>' +
        '<p>Remember that password, for it is the key to wisdom in much more than just opera. That, and this, is your reward. Do with it what makes you happiest, but do be careful handling it – it was crafted in 1791, for a very special premiere.</p>' +
        '<p>You open the box. Inside sits an ornate carved wooden flute.</p>' +
        '<img src=\'https://www.sydneyoperahouse.com/content/dam/soh/digital/articles/escape-room/EscapeHouse-Room-Sails2-H.jpg\' alt=\'Illustration of Sydney Opera House against starry night sky with sails coloured green, red, yellow and white\' width=\'400px\'>'
    }
};