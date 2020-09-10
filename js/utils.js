export function debounce(func, wait, immediate) {
  /**
   * Function returns a function which will be triggered after it stops being invoked
   * for a chosen amount of time in order to minimize memory use and the number of API requests
   *
   * @function debounce
   * @param {function} func - Function to be debounced
   * @param {number} wait - Time to wait for debounce in ms.
   * @param {boolean} immediate - If true function will be fired on the leading edge
   * instead of the falling.
   * @return {function} - original function debounced by N ms.
   */
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
export function separateFunctionString(funcString) {
  /**
   * Function separates function strings into an array
   * First one represents function name and the next one represents the argument.
   * Function and argument should to be separated by a '/' if there is no '/' in
   * provided string, the function will return false
   *
   * @function separateFunctionString
   * @param {string} funcString - String to be separated. Has to be in the format of:
   *    "FunctionName/Argument" otherwise the function returns false
   * @return {Array} - An array holding the function Name and arguments. Function name
   * is always under index - 0
   */
  const result = funcString.split("/").map((el) => el.replace(/ /g, ""));

  if (result.length === 0) {
    return false;
  }
  return result;
}
export async function prepareCoinData() {
  /**
   * Function sends a get request to https://api.coinpaprika.com/v1/coins and
   * returns the result - and Array of data about crypto-currencies
   * @function prepareCoinData
   * @return {Promise<Array>} - An array of crypto-currencies data. Each element
   * in the array is an object example: {
        id: "btc-bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        rank: 1,
        is_new: false,
        is_active: true,
        type: "coin",
      };
  */

  const coins = await (
    await fetch("https://api.coinpaprika.com/v1/coins")
  ).json();
  return coins;
}

export function findNameWithSymbol(coinArray, symbol) {
  /**Function used to find the name of a crypto-currency by providing it's symbol
   * and an array of crypto-currencies
   * @function findNameWithSymbol
   *
   * @param {Array} - Array of objects with at least 2 properties - 'name' and 'symbol'
   * @param {string} - String used to search for an element in the array.
   */
  for (const coin of coinArray) {
    if (coin.symbol === symbol) {
      return coin.name;
    }
  }
  return false;
}

export function createErrorList(errorArray, errorOutput) {
  /** Function used to create and replace error messages in a provided list element
   * with messages provided
   * @function createErrorList
   * @param {Array} - List of error messages
   * @param {Element<ul>} - HTML list element used to display error messages
   */
  errorOutput.innerHTML = null;
  errorArray.forEach((errorMessage) => {
    const tmpListElement = document.createElement("li");
    tmpListElement.textContent = errorMessage;
    errorOutput.appendChild(tmpListElement);
  });
}
