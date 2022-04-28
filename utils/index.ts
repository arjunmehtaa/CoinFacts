import { Coin } from "../model";

require("number-to-locale-string-polyfill");

export const isValidCoin = (coin: Coin): boolean => {
  if (
    coin.id &&
    coin.name &&
    coin.market_cap_rank &&
    coin.current_price &&
    coin.price_change_percentage_24h
  )
    return true;
  return false;
};

export const sortCoinList = (coinList: Coin[]): Coin[] => {
  coinList.sort((a, b) =>
    a.market_cap_rank < b.market_cap_rank
      ? -1
      : a.market_cap_rank > b.market_cap_rank
      ? 1
      : 0
  );
  return coinList;
};

export const formatPrice = (price: number): string => {
  const priceString = price.toString();
  if (priceString.includes(".")) {
    const priceArray = priceString.split(".");
    return (
      parseInt(priceArray[0]).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }) +
      "." +
      priceArray[1]
    );
  }
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
