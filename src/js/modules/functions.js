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
      if (item.classList.contains("mine")) {
        item.innerHTML = "&#x1F4A3";
        item.style.backgroundColor = "red";
      }
    });
  });
}

export function minesAroundCell(cell, cellArray) {
  let minesAround = 0;
  let dataColumn = +cell.getAttribute("data-column");
  let dataRow = +cell.getAttribute("data-row");
  cellArray.forEach((element) => {
    if (
      +element.getAttribute("data-row") ===
        +cell.getAttribute("data-row") - 1 &&
      +element.getAttribute("data-column") ===
        +cell.getAttribute("data-column") - 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") ===
        +cell.getAttribute("data-row") - 1 &&
      +element.getAttribute("data-column") ===
        +cell.getAttribute("data-column") &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") ===
        +cell.getAttribute("data-row") - 1 &&
      +element.getAttribute("data-column") ===
        +cell.getAttribute("data-column") + 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") === +cell.getAttribute("data-row") &&
      +element.getAttribute("data-column") ===
        +cell.getAttribute("data-column") - 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") === +cell.getAttribute("data-row") &&
      +element.getAttribute("data-column") ===
        +cell.getAttribute("data-column") + 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") ===
        +cell.getAttribute("data-row") + 1 &&
      +element.getAttribute("data-column") ===
        +cell.getAttribute("data-column") - 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") ===
        +cell.getAttribute("data-row") + 1 &&
      +element.getAttribute("data-column") ===
        +cell.getAttribute("data-column") &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    } else if (
      +element.getAttribute("data-row") ===
        +cell.getAttribute("data-row") + 1 &&
      +element.getAttribute("data-column") ===
        +cell.getAttribute("data-column") + 1 &&
      +element.getAttribute("data-mine") === 1
    ) {
      minesAround++;
    }
  });
  cell.innerHTML = minesAround;
}
