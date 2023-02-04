import {
  createElement,
  getRandomInt,
  showMines,
  BOMB,
  FLAG,
  openEmptyCells,
} from "./modules/functions.js";

const app = document.getElementById("app");
const columnsInput = document.querySelector(".columns");
const rowsInput = document.querySelector(".rows");
const buttonStart = document.querySelector(".start");
const buttonReset = document.querySelector(".reset");
const flags = document.querySelector(".flags");
const mines = document.querySelector(".mines");

const mineField = createElement("div", "mine-field");

app.append(mineField);

let flagsCounter;
let minesCounter;
let cellArray;

function createCellsGrid(columns, rows) {
  cellArray = [];
  flagsCounter = 0;

  minesCounter = 0;

  let cellCount = 0;

  let isFirstClick = true;

  let openCellCount = 0;

  mineField.innerHTML = "";

  if (columnsInput.value <= 7 || rowsInput.value <= 7) {
    alert("Размеры поля слишком маленькие.");
    return;
  } else if (columnsInput.value > 16 || rowsInput.value > 16) {
    alert("Размеры поля слишком большие.");
    return;
  }

  mineField.style.gridTemplateColumns = `repeat(${columnsInput.value}, 1fr)`;

  for (let x = 0; x < rows; x++) {
    cellArray[x] = [];
    for (let y = 0; y < columns; y++) {
      const cell = createElement("div", "cell");
      cell.setAttribute("data-mine", "0");
      cell.setAttribute("data-flag", "0");
      cell.setAttribute("data-row", `${x}`);
      cell.setAttribute("data-column", `${y}`);
      mineField.append(cell);
      cellCount++;
      cellArray[x].push(cell);
    }
  }

  for (
    let i = 0;
    i < Math.round((rowsInput.value * columnsInput.value) / 6);
    i++
  ) {
    cellArray[getRandomInt(cellArray.length)][
      getRandomInt(cellArray[0].length)
    ].dataset.mine = "1";
  }

  cellArray.forEach((element) => {
    element.forEach((item) => {
      if (item.getAttribute("data-mine") === "1") {
        minesCounter++;
      }
    });
  });
  const cellsArray = document.querySelectorAll(".cell");
  cellArray.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      cell.addEventListener("click", () => {
        if (cell.getAttribute("data-mine") === "1" && isFirstClick) {
          createCellsGrid(columnsInput.value, rowsInput.value);
        } else if (cell.getAttribute("data-mine") === "1" && !isFirstClick) {
          showMines(cellArray);
        } else if (cell.getAttribute("data-mine") === "0") {
          isFirstClick = false;
          openCellCount++;
          openEmptyCells(rowIndex, columnIndex, cellArray, openCellCount);
        } else if (openCellCount === cellCount - minesCounter) {
          const winModalWindow = createElement("div", "win");
          const winVideo = createElement("video", "win-video");
          const startAgain = createElement("button", "again-button");
          winVideo.src = "@files/videoplayback.mp4";
          winVideo.setAttribute("autoplay", "true");
          winVideo.setAttribute("loop", "true");
          startAgain.innerText = "Закрыть и начать заного";
          winModalWindow.append(winVideo, startAgain);
          startAgain.addEventListener("click", () => {
            document.location.reload();
          });
          app.append(winModalWindow);
        }
      });

      cell.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (
          cell.style.backgroundColor === "red" ||
          cell.style.backgroundColor === "pink"
        )
          return;
        if (cell.dataset.flag === "0") {
          cell.dataset.flag = "1";
          cell.innerHTML = "";
          cell.innerHTML = FLAG;
          flagsCounter++;
          flags.innerText = `Количество установленных флагов: ${flagsCounter}`;
        } else if (cell.dataset.flag === "1") {
          cell.dataset.flag = "0";
          cell.innerHTML = "";
          flagsCounter--;
          flags.innerText = `Количество установленных флагов: ${flagsCounter}`;
        }
      });
    });
  });

  mines.innerText = `Количество мин: ${minesCounter}`;
}

buttonReset.addEventListener("click", () => {
  flagsCounter = 0;
  minesCounter = 0;
});

buttonStart.addEventListener("click", (e) => {
  e.preventDefault();
  flagsCounter = 0;
  minesCounter = 0;
  createCellsGrid(columnsInput.value, rowsInput.value);
});
