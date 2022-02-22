import ApiService from './api-service';
const apiService = new ApiService();
// console.log(apiService.fetchCurrencyRates());
// console.log(apiService.clients);
const bank = apiService.clients;

const bankContainer = document.querySelector('.bankContainer');

// function createClientMarkup(bank) {
//     return bank.map(({ id, name,isActive,registrationDate }) => {
//       return `
//       <li class="client">
//       <p class="id">${id}</p>
//       <p class="name">${name}</p>
//       <p class="isActive">${isActive}</p>
//       <p class="registrationDate">${registrationDate}</p>
//       <h2 class="accounts">Accounts</h2>
//   </li>
//       `}).join(''); 
//   }
//   const clientMarkup = createClientMarkup(bank);
// bankContainer.insertAdjacentHTML('beforeend', clientMarkup);