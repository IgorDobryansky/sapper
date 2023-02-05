import { createElement, BOMB, FLAG } from "./modules/functions.js";

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

function createCellsGrid(width, height) {
  flagsCounter = 0;

  flags.innerText = `Количество установленных флагов: ${flagsCounter}`;

  const minesCount = Math.round((height * width) / 6);

  mineField.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

  const emptyCellsCount = height * width;

  mineField.innerHTML = `
  <div class="cell" data-flag="0" data-open="0">
  </div>
  `.repeat(emptyCellsCount);

  const cells = [...mineField.children];

  const minesIndex = [...Array(emptyCellsCount).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, minesCount);

  mines.innerHTML = `Количество мин: ${minesIndex.length}`;

  mineField.addEventListener("click", (event) => {
    if (event.target.className !== "cell") return;
    const index = cells.indexOf(event.target);
    const col = index % width;
    const row = Math.floor(index / width);
    openCell(col, row);
  });

  mineField.addEventListener("contextmenu", (event) => {
    event.preventDefault();

    const cell = event.target;

    if (
      cell.className !== "cell" ||
      +cell.getAttribute("data-open") === 1 ||
      +cell.innerHTML > 0
    )
      return;

    cell.innerHTML = FLAG;

    if (+cell.getAttribute("data-flag") === 0) {
      cell.setAttribute("data-flag", "1");
      cell.innerHTML = "";
      cell.innerHTML = FLAG;
      flagsCounter++;
      flags.innerText = `Количество установленных флагов: ${flagsCounter}`;
    } else if (+cell.getAttribute("data-flag") === 1) {
      cell.setAttribute("data-flag", "0");
      cell.innerHTML = "";
      flagsCounter--;
      flags.innerText = `Количество установленных флагов: ${flagsCounter}`;
    }
  });

  function isValid(col, row) {
    return row >= 0 && row < height && col >= 0 && col < width;
  }

  function getMinesCount(col, row) {
    let minesCount = 0;
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        if (isMine(col + x, row + y)) {
          minesCount++;
        }
      }
    }
    return minesCount;
  }

  function loseGame() {
    cells.forEach((element, index) => {
      if (minesIndex.includes(index)) {
        element.innerHTML = BOMB;
        element.setAttribute("data-open", "1");
        element.style.backgroundColor = "red";
      }
    });
  }

  function openCell(col, row) {
    if (!isValid(col, row)) return;
    const index = row * width + col;
    const cell = cells[index];

    if (isMine(col, row)) {
      loseGame();
      return;
    }

    const count = getMinesCount(col, row);
    if (count !== 0) {
      cell.innerHTML = count;
      cell.setAttribute("data-open", "1");
      return;
    }

    if (+cell.getAttribute("data-open") === 1) return;

    cell.setAttribute("data-open", "1");

    cell.style.opacity = 0;

    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        openCell(col + x, row + y);
      }
    }
  }

  function isMine(col, row) {
    if (!isValid(col, row)) return false;
    const index = row * width + col;
    return minesIndex.includes(index);
  }
  // cellArray = [];
  // flagsCounter = 0;

  // minesCounter = 0;

  // let cellCount = 0;

  // let isFirstClick = true;

  // let openCellCount = 0;

  // mineField.innerHTML = "";

  // if (columnsInput.value <= 7 || rowsInput.value <= 7) {
  //   alert("Размеры поля слишком маленькие.");
  //   return;
  // } else if (columnsInput.value > 16 || rowsInput.value > 16) {
  //   alert("Размеры поля слишком большие.");
  //   return;
  // }

  // for (let x = 0; x < rows; x++) {
  //   cellArray[x] = [];
  //   for (let y = 0; y < columns; y++) {
  //     const cell = createElement("div", "cell");
  //     cell.setAttribute("data-mine", "0");
  //     cell.setAttribute("data-flag", "0");
  //     mineField.append(cell);
  //     cellCount++;
  //     cellArray[x].push(cell);
  //   }
  // }

  // for (
  //   let i = 0;
  //   i < ;
  //   i++
  // ) {
  //   cellArray[getRandomInt(cellArray.length)][
  //     getRandomInt(cellArray[0].length)
  //   ].dataset.mine = "1";
  // }

  // cellArray.forEach((element) => {
  //   element.forEach((cell) => {
  //     if (+cell.getAttribute("data-mine") === 1) {
  //       minesCounter++;
  //     }
  //   });
  // });

  // function openCell(row, column) {
  //   if (!isValidPosition(...arguments)) {
  //     return;
  //   }

  //   if (isBomb(...arguments)) {
  //     return;
  //   }

  //   const minesCount = bombsAroundCell(...arguments);

  //   if (minesCount === 0) {
  //     cellArray[row][column].style.opacity = 0;
  //     openCell(row, column - 1);
  //     openCell(row - 1, column - 1);
  //     openCell(row - 1, column);
  //     openCell(row - 1, column + 1);
  //     openCell(row, column + 1);
  //     // openCell(row + 1, column - 1);
  //     // openCell(row + 1, column);
  //     // openCell(row + 1, column + 1);
  //     return;
  //   }

  //   cellArray[row][column].innerHTML = minesCount;
  // }

  // function bombsAroundCell(row, column) {
  //   let bombsCount = 0;
  //   for (let x = -1; x <= 1; x++) {
  //     for (let y = -1; y <= 1; y++) {
  //       isValidPosition(row + y, column + x) &&
  //         isBomb(row + y, column + x) &&
  //         bombsCount++;
  //     }
  //   }
  //   return bombsCount;
  // }

  // function isBomb(row, column) {
  //   return (
  //     (+cellArray[row][column].getAttribute("data-mine") === 1 && true) || false
  //   );
  // }

  // function isValidPosition(row, column) {
  //   return (
  //     (cellArray.includes(cellArray[row]) &&
  //       cellArray[row].includes(cellArray[row][column]) &&
  //       true) ||
  //     false
  //   );
  // }

  // showMines(cellArray);

  // cellArray.forEach((row, rowIndex) => {
  //   row.forEach((cell, columnIndex) => {
  //     cell.addEventListener("click", () => {
  //       openCell(rowIndex, columnIndex);
  //       // } else if (openCellCount === cellCount - minesCounter) {
  //       //   const winModalWindow = createElement("div", "win");
  //       //   const winVideo = createElement("video", "win-video");
  //       //   const startAgain = createElement("button", "again-button");
  //       //   winVideo.src = "@files/videoplayback.mp4";
  //       //   winVideo.setAttribute("autoplay", "true");
  //       //   winVideo.setAttribute("loop", "true");
  //       //   startAgain.innerText = "Закрыть и начать заного";
  //       //   winModalWindow.append(winVideo, startAgain);
  //       //   startAgain.addEventListener("click", () => {
  //       //     document.location.reload();
  //       //   });
  //       //   app.append(winModalWindow);
  //       // }
  //     });

  //     cell.addEventListener("contextmenu", (e) => {
  //       e.preventDefault();
  //       if (
  //         cell.style.backgroundColor === "red" ||
  //         cell.style.backgroundColor === "pink"
  //       )
  //         return;
  //       if (cell.dataset.flag === "0") {
  //         cell.dataset.flag = "1";
  //         cell.innerHTML = "";
  //         cell.innerHTML = FLAG;
  //         flagsCounter++;
  //         flags.innerText = `Количество установленных флагов: ${flagsCounter}`;
  //       } else if (cell.dataset.flag === "1") {
  //         cell.dataset.flag = "0";
  //         cell.innerHTML = "";
  //         flagsCounter--;
  //         flags.innerText = `Количество установленных флагов: ${flagsCounter}`;
  //       }
  //     });
  //   });
  // });

  // mines.innerText = `Количество мин: ${minesCounter}`;
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
