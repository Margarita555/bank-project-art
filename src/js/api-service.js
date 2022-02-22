const API_KEY = '7c8bbc90-8fcc-11ec-afa3-bfe597d9e008';

export default class Client {
  constructor() {
    this.clients = [];
  }
  fetchCurrencyRates() {
    return fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=${API_KEY}`)
      .then(response => {
        return response.json();
      })
      .then(rate => {
        if (rate.data.length === 0) {
          return error;
        } else {
          //   console.log(rate.data);
          return rate.data;
        }
      });
  }

  //   get query() {
  //     return this.searchQuery;
  //   }

  //   set query(newQuery) {
  //     this.searchQuery = newQuery;
  //   }

  //   in() {
  //     this.page += 1;
  //   }
}

// async function fetchCurrencyRates() {
//   return await fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=${API_KEY}`)
//     .then(response => {
//       return response.json();
//     })
//     .then(rate => {
//       if (rate.data.length === 0) {
//         return error;
//       } else {
//         //   console.log(rate.data);
//         return rate.data;
//       }
//     });
// }
// console.log(fetchCurrencyRates());
