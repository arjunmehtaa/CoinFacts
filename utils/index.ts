import { Coin } from "../model";

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
