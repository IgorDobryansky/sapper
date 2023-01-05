import {
  createElement,
  getRandomInt,
  showMines,
  minesAroundCell,
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

let flagsCounter = 0;
let minesCounter = 0;
const cellArray = [];

function createCellsGrid(columns, rows) {
  for (let x = 0; x < rows; x++) {
    cellArray[x] = [];
    for (let y = 0; y < columns; y++) {
      const cell = createElement("div", "cell");
      cell.setAttribute("data-mine", "0");
      cell.setAttribute("data-flag", "0");
      cell.setAttribute("data-row", `${x}`);
      cell.setAttribute("data-column", `${y}`);
      mineField.append(cell);
      cellArray[x].push(cell);
    }
  }

  for (
    let i = 0;
    i < Math.floor((rowsInput.value * columnsInput.value) / 6);
    i++
  ) {
    cellArray[getRandomInt(cellArray.length)][
      getRandomInt(cellArray[0].length)
    ].classList.add("mine");
  }

  cellArray.forEach((element) => {
    element.forEach((item) => {
      if (item.classList.contains("mine")) {
        item.setAttribute("data-mine", "1");
      }
    });
  });
}

buttonReset.addEventListener("clisk", () => {
  flagsCounter = 0;
  minesCounter = 0;
});

buttonStart.addEventListener("click", (e) => {
  e.preventDefault();

  mineField.innerHTML = "";

  if (columnsInput.value <= 7 || rowsInput.value <= 7) return;

  mineField.style.gridTemplateColumns = `repeat(${columnsInput.value}, 1fr)`;
  mineField.style.gridTemplateColumns = `repeat(${rowsInput.value}, 1fr)`;

  createCellsGrid(columnsInput.value, rowsInput.value);

  cellArray.forEach((element) => {
    element.forEach((item) => {
      if (item.getAttribute("data-mine") === "1") {
        minesCounter++;
      }
    });
  });

  const cellNodesArray = Array.from(document.querySelectorAll(".cell"));

  cellNodesArray.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (cell.classList.contains("mine")) {
        showMines(cellArray);
      }
      if (!cell.classList.contains("mine")) {
        cell.style.backgroundColor = "pink";
        minesAroundCell(cell, cellNodesArray);
      }
    });
  });

  mines.innerText = `Количество мин: ${minesCounter}`;

  for (let x = 0; x < cellArray.length; x++) {
    cellArray[x].forEach((element) => {
      element.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (
          element.style.backgroundColor === "red" ||
          element.style.backgroundColor === "pink"
        )
          return;
        if (element.dataset.flag === "0") {
          element.dataset.flag = "1";
          element.innerHTML = "";
          element.innerHTML = "&#128681";
          flagsCounter++;
          flags.innerText = `Количество установленных флагов: ${flagsCounter}`;
        } else if (element.dataset.flag === "1") {
          element.dataset.flag = "0";
          element.innerHTML = "";
          flagsCounter--;
          flags.innerText = `Количество установленных флагов: ${flagsCounter}`;
        }
      });
    });
  }
  console.log(cellNodesArray);
  console.log(cellArray);
});
