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
function createCellsGrid(width, height) {
  flagsCounter = 0;

  flags.innerText = `Количество установленных флагов: ${flagsCounter}`;

  const minesCount = Math.floor((height * width) / 6);

  mineField.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

  const emptyCellsCount = height * width;

  mineField.innerHTML = `
  <div class="cell" data-flag="0" data-open="0">
  </div>
  `.repeat(emptyCellsCount);

  // Массив с ячейками
  const cells = [...mineField.children];

  // массив индексов ячеек с минами
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
    openCellsCount();

    // console.log(openCellsCount, cells.length - minesIndex.length);
    // if (openCellsCount === cells.length - minesIndex.length) {
    //   alert("ololo");
    // }
  });

  mineField.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    openCellsCount();
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
      flagsCount();
    } else if (+cell.getAttribute("data-flag") === 1) {
      cell.setAttribute("data-flag", "0");
      cell.innerHTML = "";
      flagsCounter--;
      flagsCount();
    }
  });

  // Подсчет открытых ячеек
  function openCellsCount() {
    const openCellsCount = [];
    cells.forEach((cell) => {
      if (+cell.getAttribute("data-open") === 1) {
        openCellsCount.push(cell);
      }
    });
    console.log(openCellsCount.length, cells.length - minesIndex.length);
    if (
      openCellsCount.length === cells.length - minesIndex.length &&
      flagsCounter === minesIndex.length
    ) {
      alert("ololo");
      location.reload();
    }
  }

  // вывод количества установленых флагов
  function flagsCount() {
    flags.innerText = `Количество установленных флагов: ${flagsCounter}`;
  }

  // действительно ли ячейка существует
  function isValid(col, row) {
    return row >= 0 && row < height && col >= 0 && col < width;
  }

  // Количество мин вокруг одной ячейки
  function getMinesCount(col, row) {
    let minesCount = 0;
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        isMine(col + x, row + y) && minesCount++;
      }
    }
    return minesCount;
  }

  // Проигрыш
  function loseGame() {
    cells.forEach((element, index) => {
      if (minesIndex.includes(index)) {
        element.innerHTML = BOMB;
        element.setAttribute("data-open", "1");
        element.style.backgroundColor = "red";
      }
    });
  }

  // Основная функция открытия чейки
  function openCell(col, row) {
    if (!isValid(col, row)) return;
    const index = row * width + col;
    const cell = cells[index];

    if (+cell.getAttribute("data-flag") === 1) {
      flagsCounter--;
      flagsCount();
    }

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
    cell.style.backgroundColor = "rgba(0,0,0,0)";
    cell.style.border = "1px solid black";

    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        openCell(col + x, row + y);
      }
    }
  }

  // Есть ли в ячейке мина
  function isMine(col, row) {
    if (!isValid(col, row)) return false;
    const index = row * width + col;
    return minesIndex.includes(index);
  }
}

buttonReset.addEventListener("click", () => {
  buttonStart.style.display = "block";
  buttonReset.style.display = "none";
});

buttonStart.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    rowsInput.value >= 8 &&
    rowsInput.value <= 16 &&
    columnsInput.value >= 8 &&
    columnsInput.value <= 16
  ) {
    createCellsGrid(columnsInput.value, rowsInput.value);
    buttonStart.style.display = "none";
    buttonReset.style.display = "block";
  } else alert("Введите правильное число строк и столбцов");
});
