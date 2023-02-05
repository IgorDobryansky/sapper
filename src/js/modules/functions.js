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
