const words = ["excited", "beautiful", "thanks", "donya", "honey", "break", "understand", "kill"];
let picture = document.getElementById("image").querySelector("img");
let randomWord;
let letters;
let wrong = 0;
let result = "";
userSelected = []

function startHangman() {
    randomWord = words[Math.floor(Math.random() * words.length)]
    // console.log(randomWord)
    letters = randomWord.split("")
    letters = letters.join("")
    // console.log(letters)
    const letterSection = document.getElementById("letters");
    letterSection.addEventListener("click", buttonHandler);
    window.addEventListener("keydown", keyHandler);
}

function setUnderScores() {
    let splitedWord = randomWord.split("");
    let mappedWord = splitedWord.map(letter => (userSelected.indexOf(letter) >= 0 ? letter : "_"))
    result = mappedWord.join("")
    const clue = document.getElementById("clue").querySelector("p");
    clue.innerText = `${result}`;
}

function buttonHandler(event) {
    letterHandler(event.target.id)
}

function keyHandler(event) {
    letterHandler(event.key);
}

function letterHandler(letter) {
    letter = letter.toLowerCase()
    const usedLetter = document.getElementById(`${letter.toUpperCase()}`);
    usedLetter.className = "used";
    // console.log(usedLetter)
    userSelected.push(letter);
    if (letters.indexOf(letter) === -1) {
        ifFalse();
        checkIfLost();
    } else if (letters.indexOf(letter) >= 0) {
        ifTrue();
        checkIfWon();
    }
}

function ifTrue() {
    setUnderScores();   
}

function checkIfWon() {
    if (result === randomWord) {
        picture.src = "assets/winner.png";
        document.getElementById("gameover").querySelector("p").style.display = "block";
    }
}

function ifFalse() {
    wrong++;
    picture.src = `assets/hangman${wrong}.png`
}

function checkIfLost() {
    if (wrong === 6) {
        document.getElementById("clue").querySelector("p").innerText = `Game Over. The word was: ${randomWord}.`
    }
}

startHangman();
setUnderScores();