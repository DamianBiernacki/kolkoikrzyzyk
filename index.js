const areas = document.querySelectorAll(".boardItem");
const information = document.querySelector(".information");
const buttonRestart = document.querySelector(".restart");

let fields;
let activePlayer;
let activeGame;

const resetGame = () => {
  fields = ["", "", "", "", "", "", "", "", ""];
  activePlayer = "X";
  activeGame = true;
};

resetGame();

const winWhen = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]
];

const whoIsWinner = () => {
  information.innerText = `Wygrał ${activePlayer}!`;
};

const resetInformation = () => {
  information.innerText = "";
};

const stopGame = () => {
  for (let i = 0; i <= 7; i++) {
    const [pA, pB, pC] = winWhen[i];
    const valueA = fields[pA];
    const valueB = fields[pB];
    const valueC = fields[pC];

    if (valueA !== "" && valueA === valueB && valueA === valueC) {
      activeGame = false;
      whoIsWinner();
    }
  }
};

areas.forEach((area) => {
  area.addEventListener("click", (e) => {
    const { p } = e.target.dataset;

    if (activeGame && fields[p] === "") {
      fields[p] = activePlayer;
      e.target.classList.add(`boardItem--full-${activePlayer}`);
      stopGame();
      activePlayer = activePlayer === "X" ? "O" : "X";
    }
  });
});

const buttonClick = () => {
  resetGame();
  areas.forEach((area) => {
    area.classList.remove("boardItem--full-X", "boardItem--full-O");
  });
  resetInformation();
};

buttonRestart.addEventListener("click", buttonClick);
