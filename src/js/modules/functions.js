export const BOMB = "&#x1F4A3";
export const FLAG = "&#128681";

export function createElement(tagName, className) {
  const element = document.createElement(tagName);
  element.className = className;
  return element;
}
