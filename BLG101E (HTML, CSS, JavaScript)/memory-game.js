const nameSeq = "FATIH";
const shuffledSequence = ["F", "A", "T", "I", "H"]
let cards = [];
let flippedCards = [];
let score = 0;
let seq = 0;

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

function mainBody(){
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = "";

    for (let i = 0; i < nameSeq.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = nameSeq[i];
        card.innerHTML = `<img src="${nameSeq[i]}.svg" alt="${nameSeq[i]}">`;
        gameContainer.appendChild(card);
    }
}

function shuffle(array) {
    array.sort(function(a, b) {
        return Math.random() - 0.5;
    });
}

function createCards() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = "";

    shuffle(shuffledSequence);

    for (let i = 0; i < 5; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = shuffledSequence[i];
        card.innerHTML = `<img src="${shuffledSequence[i]}.svg" alt="${shuffledSequence[i]}">`;
        card.addEventListener("click", flipCard);
        gameContainer.appendChild(card);
        cards.push(card);
    }
}

function startGame() {
    startButton.style.display = "none";
    restartButton.style.display = "inline-block";
    seq = 0;
    createCards();

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    setTimeout(() => {
        cards.forEach(card => {
            card.innerHTML = "";
            card.style.backgroundColor = "#71797E";
        });
        document.body.removeChild(overlay);
    }, 2000);
}

function flipCard() {
    const clickedCard = this;
    flippedCards.push(clickedCard);
    clickedCard.innerHTML = `<img src="${clickedCard.dataset.value}.svg" alt="${clickedCard.dataset.value}">`;
    clickedCard.style.backgroundColor = "#fff";

    if(clickedCard.dataset.value !== nameSeq[seq]){
        endGame(clickedCard);
        return;
    }else{
        score += 20;
        document.getElementById("score-value").innerText = score;
    }
    seq++;

    if (score === 100) {
        gameWin();
    }
}

function endGame(clickedCard) {
    alert("Wrong sequence! You clicked on the wrong letter: " + clickedCard.dataset.value + ". Your score is: " + score);
    resetGame();
}

function resetGame() {
    startButton.style.display = "inline-block";
    restartButton.style.display = "none";
    cards = [];
    flippedCards = [];
    seq = 0;
    score = 0;
    document.getElementById("score-value").innerText = score;
    mainBody();
}

function gameWin(){
    alert("CONGRATULATIONS!!!!");
    resetGame();
}

mainBody();