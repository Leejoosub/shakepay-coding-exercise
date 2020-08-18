import { BITCOIN_RATES_API, TRANSACTION_HISTORY_ENDPOINT } from "../GlobalVar";

export const fetchBitcoinRates = () => {
  return new Promise((resolve, reject) => {
    fetch(BITCOIN_RATES_API)
      .then(async (response) => {
        const resopnseJson = await response.json();
        resolve(resopnseJson);
      })
      .catch((err) => {
        reject(`ERROR FETCHING BITCOIN RATES: ${err}`);
      });
  });
};

export const fetchTransactionHistory = () => {
  return new Promise((resolve, reject) => {
    fetch(TRANSACTION_HISTORY_ENDPOINT)
      .then(async (response) => {
        const resopnseJson = await response.json();
        resolve(resopnseJson);
      })
      .catch((err) => {
        reject(`ERROR FETCHING TRANSACTION HISTORY: ${err}`);
      });
  });
};
