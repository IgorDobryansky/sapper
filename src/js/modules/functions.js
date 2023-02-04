export const BOMB = "&#x1F4A3";
export const FLAG = "&#128681";

export function createElement(tagName, className) {
  const element = document.createElement(tagName);
  element.className = className;
  return element;
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function showMines(array) {
  array.forEach((element) => {
    element.forEach((item) => {
      if (item.getAttribute("data-mine") === "1") {
        item.innerHTML = BOMB;
        item.style.backgroundColor = "red";
      }
    });
  });
}

function minesAroundCell(rowIndex, columnIndex, array) {
  let minesAround = 0;

  if (
    array.includes(array[rowIndex]) &&
    array[rowIndex].includes(array[rowIndex][columnIndex - 1]) &&
    +array[rowIndex][columnIndex - 1].getAttribute("data-mine") === 1
  ) {
    minesAround++;
  }
  if (
    array.includes(array[rowIndex - 1]) &&
    array[rowIndex - 1].includes(array[rowIndex - 1][columnIndex - 1]) &&
    +array[rowIndex - 1][columnIndex - 1].getAttribute("data-mine") === 1
  ) {
    minesAround++;
  }
  if (
    array.includes(array[rowIndex - 1]) &&
    array[rowIndex - 1].includes(array[rowIndex - 1][columnIndex]) &&
    +array[rowIndex - 1][columnIndex].getAttribute("data-mine") === 1
  ) {
    minesAround++;
  }
  if (
    array.includes(array[rowIndex - 1]) &&
    array[rowIndex - 1].includes(array[rowIndex - 1][columnIndex + 1]) &&
    +array[rowIndex - 1][columnIndex + 1].getAttribute("data-mine") === 1
  ) {
    minesAround++;
  }
  if (
    array.includes(array[rowIndex]) &&
    array[rowIndex].includes(array[rowIndex][columnIndex + 1]) &&
    +array[rowIndex][columnIndex + 1].getAttribute("data-mine") === 1
  ) {
    minesAround++;
  }
  if (
    array.includes(array[rowIndex + 1]) &&
    array[rowIndex + 1].includes(array[rowIndex + 1][columnIndex - 1]) &&
    +array[rowIndex + 1][columnIndex - 1].getAttribute("data-mine") === 1
  ) {
    minesAround++;
  }
  if (
    array.includes(array[rowIndex + 1]) &&
    array[rowIndex + 1].includes(array[rowIndex + 1][columnIndex]) &&
    +array[rowIndex + 1][columnIndex].getAttribute("data-mine") === 1
  ) {
    minesAround++;
  }
  if (
    array.includes(array[rowIndex + 1]) &&
    array[rowIndex + 1].includes(array[rowIndex + 1][columnIndex + 1]) &&
    +array[rowIndex + 1][columnIndex + 1].getAttribute("data-mine") === 1
  ) {
    minesAround++;
  }

  array[rowIndex][columnIndex].innerHTML = "";
  if (minesAround === 0) {
    array[rowIndex][columnIndex].style.opacity = 0;
  } else {
    array[rowIndex][columnIndex].style.backgroundColor = "pink";
    array[rowIndex][columnIndex].innerHTML = minesAround;
  }

  return minesAround;
}

export function openEmptyCells(rowIndex, columnIndex, array) {
  const isMinesAround = minesAroundCell(rowIndex, columnIndex, array);
  if (isMinesAround > 0) return;
  openEmptyLeft(rowIndex, columnIndex - 1, array);
  openEmptyRight(rowIndex, columnIndex + 1, array);
  openEmptyTop(rowIndex - 1, columnIndex, array);
  openEmptyBottom(rowIndex + 1, columnIndex, array);
}

function openEmptyLeft(rowIndex, columnIndex, array) {
  if (columnIndex < 0) return;

  if (+array[rowIndex][columnIndex].getAttribute("data-mine") === 1) return;

  const isMinesAround = minesAroundCell(rowIndex, columnIndex, array);

  if (isMinesAround > 0) return;

  openEmptyLeft(rowIndex, columnIndex - 1, array);
  // openEmptyTop(rowIndex - 1, columnIndex, array);
  // openEmptyBottom(rowIndex + 1, columnIndex, array);
}

function openEmptyRight(rowIndex, columnIndex, array) {
  if (columnIndex === array[0].length) return;
  if (+array[rowIndex][columnIndex].getAttribute("data-mine") === 1) return;

  const isMinesAround = minesAroundCell(rowIndex, columnIndex, array);
  if (isMinesAround > 0) return;

  openEmptyRight(rowIndex, columnIndex + 1, array);
  // openEmptyTop(rowIndex - 1, columnIndex, array);
  // openEmptyBottom(rowIndex + 1, columnIndex, array);
}

function openEmptyTop(rowIndex, columnIndex, array) {
  if (rowIndex < 0) return;
  if (+array[rowIndex][columnIndex].getAttribute("data-mine") === 1) return;
  const isMinesAround = minesAroundCell(rowIndex, columnIndex, array);
  if (isMinesAround > 0) return;

  openEmptyTop(rowIndex - 1, columnIndex, array);
  // openEmptyLeft(rowIndex, columnIndex - 1, array);
  // openEmptyRight(rowIndex, columnIndex + 1, array);
}

function openEmptyBottom(rowIndex, columnIndex, array) {
  if (rowIndex === array.length) return;
  if (+array[rowIndex][columnIndex].getAttribute("data-mine") === 1) return;
  const isMinesAround = minesAroundCell(rowIndex, columnIndex, array);
  if (isMinesAround > 0) return;

  openEmptyBottom(rowIndex + 1, columnIndex, array);
  // openEmptyLeft(rowIndex, columnIndex - 1, array);
  // openEmptyRight(rowIndex, columnIndex + 1, array);
}
