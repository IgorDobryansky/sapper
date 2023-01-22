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

export function minesAroundCell(cellRow, cellColumn, cell, cellArray) {
  let minesAround = 0;

  cellArray.forEach((element) => {
    if (
      +element.getAttribute("data-row") === +cellRow - 1 &&
      +element.getAttribute("data-column") === +cellColumn - 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") === +cellRow - 1 &&
      +element.getAttribute("data-column") === +cellColumn &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") === +cellRow - 1 &&
      +element.getAttribute("data-column") === +cellColumn + 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") === +cellRow &&
      +element.getAttribute("data-column") === +cellColumn - 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") === +cellRow &&
      +element.getAttribute("data-column") === +cellColumn + 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") === +cellRow + 1 &&
      +element.getAttribute("data-column") === +cellColumn - 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") === +cellRow + 1 &&
      +element.getAttribute("data-column") === +cellColumn &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") === +cellRow + 1 &&
      +element.getAttribute("data-column") === +cellColumn + 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    }
  });
  cell.innerHTML = "";
  cell.innerHTML = minesAround;
}
