const API_KEY = '0893e1cc2d0c91636005';

export default async function fetchCurrencyRates(currency) {
  return await fetch(
    `https://free.currconv.com/api/v7/convert?q=USD_${currency}&compact=ultra&apiKey=${API_KEY}`,
  )
    .then(response => {
      return response.json();
    })
    .then(rate => {
      if (rate.length === 0) {
        return error;
      } else {
        return rate;
      }
    });
}
