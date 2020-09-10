import {
  debounce,
  separateFunctionString,
  prepareCoinData,
  findNameWithSymbol,
  createErrorList
} from "./js/utils.js";

window.addEventListener("DOMContentLoaded", async (event) => {
  const coinData = await prepareCoinData();
  const textInput = document.querySelector("textarea.text-input");
  const textOutput = document.querySelector(".text-output");
  const errorOutput = document.querySelector(".error-output");

  const debouncedTextTransform = debounce((event) => {
    const errorData = [];

    const result = event.target.value.replaceAll(
      /\{\{(.*?)\}\}/g,
      (match, inBrackets) => {
        const toExecute = separateFunctionString(inBrackets);
        switch (toExecute[0]) {
          case "Name":
            const newString = findNameWithSymbol(coinData, toExecute[1]);
            if (!newString) {
              errorData.push(`Symbol ${toExecute[1]} Not Found`);
              return match;
            }
            return newString;
          default:
            errorData.push(`Wrong function ${toExecute[0]}`);
            return match;
        }
      }
    );
    
    createErrorList(errorData, errorOutput)

    textOutput.innerHTML = result;
  }, 1500);

  textInput.addEventListener("input", debouncedTextTransform);
});
