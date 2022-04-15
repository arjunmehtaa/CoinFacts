import axios from "axios";
import moment from "moment";
import { Coin } from "../model";

const formatSparkline = (numbers: any[]) => {
  const sevenDaysAgo = moment().subtract(7, "days").unix();
  let formattedSparkLine = numbers.map((item, index) => {
    return {
      x: sevenDaysAgo + (index + 1) * 3600,
      y: item,
    };
  });
  return formattedSparkLine;
};

const formatMarketData = (data: Coin[]) => {
  let formattedData: Coin[] = [];
  data.forEach((item) => {
    const formattedSparkLine = formatSparkline(item.sparkline_in_7d.price);
    const formattedItem = {
      ...item,
      sparkline_in_7d: {
        price: formattedSparkLine,
      },
    };
    formattedData.push(formattedItem);
  });
  return formattedData;
};

const getMarketData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d"
    );
    const data = response.data;
    const formattedResponse = formatMarketData(data);
    return formattedResponse;
  } catch (error) {
    console.log(error.message);
  }
};

export default getMarketData;
