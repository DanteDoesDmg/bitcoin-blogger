import {
  debounce,
  separateFunctionString,
  findNameWithSymbol,
} from "./utils.js";

jest.useFakeTimers();
describe("debounce", () => {
  test("Function debounces properly", () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 200);

    for (let i = 0; i < 100; i++) {
      debouncedFunc();
    }

    // fast-forward time
    jest.runAllTimers();

    expect(func).toBeCalledTimes(1);
  });
});

describe("separateFunctionString", () => {
  test("Returns false on improper parameter", () => {
    expect(separateFunctionString("ImproperString")).toBe(false);
    expect(separateFunctionString()).toBe(false);
  });
  test("Separates function string properly", () => {
    expect(separateFunctionString("Name/BTC")).toEqual(["Name", "BTC"]);
    expect(separateFunctionString("Function/arg1/arg2")).toEqual([
      "Function",
      "arg1",
      "arg2",
    ]);
  });
});

describe("findNameWithSymbol", () => {
  const exampleCoins = [
    {
      id: "btc-bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      rank: 1,
      is_new: false,
      is_active: true,
      type: "coin",
    },
    {
      id: "eth-ethereum",
      name: "Ethereum",
      symbol: "ETH",
      rank: 2,
      is_new: false,
      is_active: true,
      type: "coin",
    },
  ];
  test("Finds correct object in array", () => {
    expect(findNameWithSymbol(exampleCoins, "BTC")).toBe("Bitcoin");
    expect(findNameWithSymbol(exampleCoins, "ETH")).toBe("Ethereum");
  });
  test("Returns false when symbol not found", () => {
    expect(findNameWithSymbol(exampleCoins, "USDC")).toBe(false);
  });
});
