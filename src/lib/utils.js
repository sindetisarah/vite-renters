import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export const setStorageData = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getStorageData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// Comma Separating function
export const comma = (num) => {
  let number = Number(num).toLocaleString().split(".");
  number[0] = number[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return number.join(".");
};

export const maskPhoneNumber = (str) => {
  let phone = str?.startsWith(0) ? "254" + str.slice(1, str.length) : str;
  const regex = /^(\d{4})\d{5}(\d{3})$/;
  const match = phone.match(regex);
  if (match) {
    return match[1] + "*****" + match[2];
  }
  return null;
};

// Ability to hide ID Number info
export const maskIdNumber = (number) => {
  var numberString = number.toString();
  var hiddenNumberString =
    "*".repeat(numberString.length - 3) + numberString.slice(-3);
  return hiddenNumberString;
};

// Ability to hide email info
export const maskEmail = (email) => {
  let parts = email.split("@");
  let firstPart = parts[0];
  let lastPart = parts[1];

  let hiddenFirstPart =
    firstPart[0] +
    "*".repeat(firstPart.length - 2) +
    firstPart[firstPart.length - 1];

  let hiddenEmail = hiddenFirstPart + "@" + lastPart;
  return hiddenEmail;
};

// Function to disable any accidental use of console logs
export const GlobalDebug = (function () {
  var savedConsole = console;
  /**
   * @param {boolean} debugOn
   * @param {boolean} suppressAll
   */
  return function (debugOn, suppressAll) {
    var suppress = suppressAll || false;
    if (debugOn === false) {
      // supress the default console functionality
      console = {};
      console.log = function () {};
      // supress all type of consoles
      if (suppress) {
        console.info = function () {};
        console.warn = function () {};
        console.error = function () {};
      } else {
        console.info = savedConsole.info;
        console.warn = savedConsole.warn;
        console.error = savedConsole.error;
      }
    } else {
      console = savedConsole;
    }
  };
})();
