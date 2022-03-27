// Variables
const words = ["excited", "beautiful", "thanks", "donya", "honey", "break", "understand", "kill"];
let picture = document.getElementById("image").querySelector("img");
let randomWord;
let letters;
let wrong = 0;
let result = "";
userSelected = []

// create a random word
function startHangman() {
    randomWord = words[Math.floor(Math.random() * words.length)]
    letters = randomWord.split("")
    letters = letters.join("")
    const letterSection = document.getElementById("letters");
    letterSection.addEventListener("click", buttonHandler);
    window.addEventListener("keydown", keyHandler);
}

// Put underscore for each letter
function setUnderScores() {
    let splitedWord = randomWord.split("");
    let mappedWord = splitedWord.map(letter => (userSelected.indexOf(letter) >= 0 ? letter : "_"))
    result = mappedWord.join("")
    const clue = document.getElementById("clue").querySelector("p");
    clue.innerText = `${result}`;
}

// Handle buttons' events
function buttonHandler(event) {
    letterHandler(event.target.id)
}

// Handle keys' events
function keyHandler(event) {
    letterHandler(event.key);
}

// Check for new letters
function letterHandler(letter) {
    letter = letter.toLowerCase()
    const usedLetter = document.getElementById(`${letter.toUpperCase()}`);
    usedLetter.className = "used";
    userSelected.push(letter);
    if (letters.indexOf(letter) === -1) {
        ifFalse();
        checkIfLost();
    } else if (letters.indexOf(letter) >= 0) {
        ifTrue();
        checkIfWon();
    }
}

// Check if letter is true
function ifTrue() {
    setUnderScores();   
}

// Check if letter is false
function ifFalse() {
    wrong++;
    picture.src = `assets/hangman${wrong}.png`
}

// Check that the word matches the random word
function checkIfWon() {
    if (result === randomWord) {
        picture.src = "assets/winner.png";
        document.getElementById("gameover").querySelector("p").style.display = "block";
    }
}

// Check that the word doesn't match the random word
function checkIfLost() {
    if (wrong === 6) {
        document.getElementById("clue").querySelector("p").innerText = `Game Over. The word was: ${randomWord}.`
    }
}

// Start the game
startHangman();
setUnderScores();