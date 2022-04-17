interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  market_cap_rank: number;
  sparkline_in_7d: any;
}

export default Coin;
