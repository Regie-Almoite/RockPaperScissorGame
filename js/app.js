let playerScore = 0;
let botScore = 0;
let winText = "";
let turnText = "";
let playerPick = "";
let botPick = "";
let botChoices = ["rock", "paper", "scissor"];
let buttons = document.querySelectorAll(".pickButtons button");
let endText = document.getElementById("endGameText");
let picksDisplay = document.getElementById("picks");
let winDisplay = document.getElementById("winnerDisplay");
let pickImgLeft = document.getElementById("playerPickImage");
let pickImgRight = document.getElementById("botPickImage");
let matchHistoryDisplay = document.getElementById("history");
let playerScoreDisplay = document.getElementById("playerScore");
let botScoreDisplay = document.getElementById("botScore");
let resetBtn = document.getElementById("reset");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    buttons.forEach((button) => {
      button.setAttribute("disabled", "true");
    });

    playerPick = this.getAttribute("id");
    picksDisplay.style.display = "flex";
    setAnim();
    botTurn();
  });
});

function botTurn() {
  botPick = botChoices[Math.floor(Math.random() * 3)];
  determineRoundWinner();
}

// determine winner every round
function determineRoundWinner() {
  setTimeout(function () {
    let playerWinText = "Bot Picks " + botPick + ", Player Wins!";
    let botWinText = "Bot Picks " + botPick + ", Bot Wins!";
    let tieWin = "Bot Picks " + botPick + ", It's a Tie!";

    removeAnim();

    pickImgLeft.setAttribute("src", "./images/" + playerPick + "Left.png");
    pickImgRight.setAttribute("src", "./images/" + botPick + "Right.png");

    let list = document.createElement("li");

    if (playerPick == botPick) {
      winDisplay.innerHTML = tieWin;
      list.classList = "tie";
      list.innerHTML =
        playerPick.toUpperCase() + " vs " + botPick.toUpperCase();
    } else if (playerPick == "rock" && botPick == "scissor") {
      winDisplay.innerHTML = playerWinText;
      list.classList = "win";
      list.innerHTML =
        playerPick.toUpperCase() + " vs " + botPick.toUpperCase();
      playerScore++;
    } else if (playerPick == "paper" && botPick == "rock") {
      winDisplay.innerHTML = playerWinText;
      list.classList = "win";
      list.innerHTML =
        playerPick.toUpperCase() + " vs " + botPick.toUpperCase();
      playerScore++;
    } else if (playerPick == "scissor" && botPick == "paper") {
      winDisplay.innerHTML = playerWinText;
      list.classList = "win";
      list.innerHTML =
        playerPick.toUpperCase() + " vs " + botPick.toUpperCase();
      playerScore++;
    } else {
      winDisplay.innerHTML = botWinText;
      list.classList = "lose";
      list.innerHTML =
        playerPick.toUpperCase() + " vs " + botPick.toUpperCase();
      botScore++;
    }

    playerScoreDisplay.innerHTML = playerScore;
    botScoreDisplay.innerHTML = botScore;

    matchHistoryDisplay.appendChild(list);

    buttons.forEach((button) => {
      button.removeAttribute("disabled");
    });

    determineChampion();
  }, 1500);
}

//remove up and down animation of images
function removeAnim() {
  let imagesAnim = document.querySelectorAll("img");

  imagesAnim.forEach((img) => {
    img.style.animation = "unset";
  });
}

//set up and down animation of images
function setAnim() {
  let imagesAnim = document.querySelectorAll("img");

  pickImgLeft.setAttribute("src", "./images/rockLeft.png");
  pickImgRight.setAttribute("src", "./images/rockRight.png");

  imagesAnim.forEach((img) => {
    img.style.animation = "upDown 0.5s infinite alternate";
  });
}

function determineChampion() {
  if (playerScore == 5) {
    winDisplay.classList.add("win");
    winDisplay.innerHTML = "CHAMPION - PLAYER";
    endText.innerHTML = "To Play Again Please Press the Reset Button";
    buttons.forEach((button) => {
      button.setAttribute("disabled", "true");
    });
  } else if (botScore == 5) {
    winDisplay.classList.add("lose");
    winDisplay.innerHTML = "CHAMPION - BOT";
    endText.innerHTML = "To Play Again Please Press the Reset Button";
    buttons.forEach((button) => {
      button.setAttribute("disabled", "true");
    });
  }
}

resetBtn.addEventListener("click", function () {
  playerScore = 0;
  botScore = 0;
  winDisplay.classList.remove("lose", "win");
  winDisplay.innerHTML = "";
  matchHistoryDisplay.innerHTML = "";
  playerScoreDisplay.innerHTML = playerScore;
  botScoreDisplay.innerHTML = botScore;
  picksDisplay.style.display = "none";
  endText.innerHTML = "Choose hand shape";
  buttons.forEach((button) => {
    button.removeAttribute("disabled");
  });
});
