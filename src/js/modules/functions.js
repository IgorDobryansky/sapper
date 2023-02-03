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

function minesAroundCell(rowIndex, columnIndex, array, cellsArray) {
  let minesAround = 0;

  cellsArray.forEach((element) => {
    if (
      +element.getAttribute("data-row") === +rowIndex - 1 &&
      +element.getAttribute("data-column") === +columnIndex - 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") === +rowIndex - 1 &&
      +element.getAttribute("data-column") === +columnIndex &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") === +rowIndex - 1 &&
      +element.getAttribute("data-column") === +columnIndex + 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") === +rowIndex &&
      +element.getAttribute("data-column") === +columnIndex - 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") === +rowIndex &&
      +element.getAttribute("data-column") === +columnIndex + 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") === +rowIndex + 1 &&
      +element.getAttribute("data-column") === +columnIndex - 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") === +rowIndex + 1 &&
      +element.getAttribute("data-column") === +columnIndex &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") === +rowIndex + 1 &&
      +element.getAttribute("data-column") === +columnIndex + 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    }
  });

  array[rowIndex][columnIndex].innerHTML = "";
  if (minesAround === 0) {
    array[rowIndex][columnIndex].style.backgroundColor = "cadetblue";
  } else {
    array[rowIndex][columnIndex].style.backgroundColor = "pink";
    array[rowIndex][columnIndex].innerHTML = minesAround;
  }

  return minesAround;
}

export function openEmptyCells(rowIndex, columnIndex, array, cellsArray) {
  const isMinesAround = minesAroundCell(...arguments);
  if (isMinesAround > 0) return isMinesAround;
  openEmptyLeft(rowIndex, columnIndex - 1, array, cellsArray);
  openEmptyRight(rowIndex, columnIndex + 1, array, cellsArray);
  openEmptyTop(rowIndex - 1, columnIndex, array, cellsArray);
  openEmptyBottom(rowIndex + 1, columnIndex, array, cellsArray);
}

function openEmptyLeft(rowIndex, columnIndex, array, cellsArray) {
  if (columnIndex < 0) return;

  const isMinesAround = minesAroundCell(
    rowIndex,
    columnIndex,
    array,
    cellsArray
  );

  if (isMinesAround > 0) return;

  openEmptyLeft(rowIndex, columnIndex - 1, array, cellsArray);
  openEmptyTop(rowIndex - 1, columnIndex, array, cellsArray);
  openEmptyBottom(rowIndex + 1, columnIndex, array, cellsArray);
}

function openEmptyRight(rowIndex, columnIndex, array, cellsArray) {
  if (columnIndex === array[0].length) return;

  const isMinesAround = minesAroundCell(
    rowIndex,
    columnIndex,
    array,
    cellsArray
  );
  if (isMinesAround > 0) return;

  openEmptyRight(rowIndex, columnIndex + 1, array, cellsArray);
  openEmptyTop(rowIndex - 1, columnIndex, array, cellsArray);
  openEmptyBottom(rowIndex + 1, columnIndex, array, cellsArray);
}

function openEmptyTop(rowIndex, columnIndex, array, cellsArray) {
  if (rowIndex < 0) return;
  const isMinesAround = minesAroundCell(...arguments);
  if (isMinesAround > 0) return;

  openEmptyTop(rowIndex - 1, columnIndex, array, cellsArray);
  openEmptyLeft(rowIndex, columnIndex - 1, array, cellsArray);
  openEmptyRight(rowIndex, columnIndex + 1, array, cellsArray);
}

function openEmptyBottom(rowIndex, columnIndex, array, cellsArray) {
  if (rowIndex === array.length) return;
  const isMinesAround = minesAroundCell(...arguments);
  if (isMinesAround > 0) return;

  openEmptyBottom(rowIndex + 1, columnIndex, array, cellsArray);
  openEmptyLeft(rowIndex, columnIndex - 1, array, cellsArray);
  openEmptyRight(rowIndex, columnIndex + 1, array, cellsArray);
}
