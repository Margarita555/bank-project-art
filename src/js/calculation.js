// // import ApiService from './api-service';
import fetchCurrencyRates from './api-service';
// // import {createBankMarkup, createClientMarkup, createDebitMarkup} from './markup'; 
// import { nanoid } from 'nanoid';
// import bankTemplate from '../templates/bank-markup.hbs';
// // import clientTemplate from '../templates/client-markup.hbs';
// import debitTemplate from '../templates/debit-markup.hbs';
// import creditTemplate from '../templates/credit-markup.hbs';
// // import bank from './db';
// // console.log(bank);
// const form = document.querySelector('.form');
// const debitForm = document.querySelector('.debitForm');
// const creditForm = document.querySelector('.creditForm');
// const totalFundsBtn = document.querySelector('#totalFunds');
// const totalFunds = document.querySelector('.totalFunds');

// // const apiService = new ApiService();

// const bank = apiService.clients;
let bank = [];
let clients = localStorage.getItem("bank");
if(clients !== null){
  bank = JSON.parse(clients)
}
// const bankContainer = document.querySelector('.bankContainer');
// renderBank(bank);

// function renderBank(bank){
//   bankContainer.innerHTML = "";
//   const bankMarkup = bankTemplate(bank);
//   bankContainer.insertAdjacentHTML('beforeend', bankMarkup);

// }


// form.addEventListener('submit', onFormSubmit);
// debitForm.addEventListener('submit', onDebitFormSubmit);
// creditForm.addEventListener('submit', onCreditFormSubmit);
// totalFundsBtn.addEventListener('click', countBankCashTotal);
// bankContainer.addEventListener('click', onDeleteBtnClick);
// bankContainer.addEventListener('click', onDebitAccountClick);
// bankContainer.addEventListener('click', onCreditAccountClick);



// // function createCreditMarkup(debitAccount) {
// //   return creditAccount.map(({ balance, activity, currency,registrationDate,cardExpiryDate }) => {
// //     return `
// //     <li class="client">
// //     <h4>Debit account</h4>
// //     <p class="balance">Balance: ${balance}</p>
// //     <p class="activity">Activity: ${activity}</p>
// //     <p class="currency">Currency: ${currency}</p>
// //     <p class="activityDate">Activity date: ${registrationDate}</p>
// //     <p class="cardExpiryDate">Card expiry date: ${cardExpiryDate}<p>
// // </li>
// //     `}).join('');
// // }


// function onFormSubmit(event) {
//   event.preventDefault();
//   const formElements = event.currentTarget.elements;
//   const name = formElements.name.value;
//   const registrationDate = formElements.date.value;
//   const isActive = formElements.isActive.value;
//   const id = nanoid();
//   const client = {
//     id,
//     name,
//     registrationDate,
//     isActive,
//     accounts: {
//       debit: [],
//       credit: [],
//     },
//   };
//   bank.push(client);
//   localStorage.setItem("bank", JSON.stringify(bank));
//    renderBank(bank);


//   // const deleteBtn = document.getElementById(`remove${id}`);
//   // let deleteBtn = document.querySelector(`[data-remove="${id}"]`);
//   // console.log(deleteBtn);
//   // deleteBtn.addEventListener('click', onDeleteBtnClick);

//   form.reset();
//   // console.log(client);
//   // console.log(bank);
// }

// function onDebitFormSubmit(event) {
//   event.preventDefault();
//   const formElements = event.currentTarget.elements;

//   const id = formElements.id.value;
//   const balance = formElements.balance.value;
//   const activity = formElements.activity.value;
//   const activityDate = formElements.activityDate.value;
//   const cardExpiryDate = formElements.cardExpiryDate.value;
//   const currency = formElements.currency.value;

//   const debitAccount = {
//     balance,
//     activity,
//     activityDate,
//     cardExpiryDate,
//     currency,
//   };

//   const client = bank.find(client => id == client.id);
//   client.accounts.debit.push(debitAccount);
//   // const clientIndex = bank.indexOf(client);
//   // bank[clientIndex].accounts.debit.push(debitAccount);
//   localStorage.setItem("bank", JSON.stringify(bank));

//   debitForm.reset();
// }

// function onCreditFormSubmit(event) {
//   event.preventDefault();
//   const formElements = event.currentTarget.elements;

//   const id = formElements.id.value;
  
//   const balance = formElements.balance.value;
//   const activity = formElements.activity.value;
//   const activityDate = formElements.activityDate.value;
//   const cardExpiryDate = formElements.cardExpiryDate.value;
//   const currency = formElements.currency.value;
//   const creditLimit = formElements.creditLimit.value;

//   const creditAccount = {
//     balance,
//     creditLimit,
//     activity,
//     activityDate,
//     cardExpiryDate,
//     currency,
//   };

//   const client = bank.find(client => id == client.id);
//   client.accounts.credit.push(creditAccount);
//   console.log(bank)
//   localStorage.setItem("bank", JSON.stringify(bank));
//   creditForm.reset();
//   // const clientIndex = bank.indexOf(client);

//   // bank[clientIndex].accounts.credit.push(creditAccount);


//   // const accountsContainer = document.getElementById(`${id}`);
//   // console.log(accountsContainer);
//   // const creditMarkup = createDebitMarkup(bank[clientIndex].accounts.credit);
//   // accountsContainer.insertAdjacentHTML('beforeend', debitMarkup);
  
// }

// function onDebitAccountClick(event){
//   if(!event.target.hasAttribute('data-debit')){
//     return;
//   }
//   const id = event.target.getAttribute('data-debit');

//   const accountsContainer = document.getElementById(`${id}`);
//   const client = bank.find(client => client.id === id);
 
//   const debitMarkup = debitTemplate(client.accounts.debit);
//   accountsContainer.insertAdjacentHTML('beforeend', debitMarkup);

// }

// function onCreditAccountClick(event){
//   if(!event.target.hasAttribute('data-credit')){
//     return;
//   }
//   const id = event.target.getAttribute('data-credit');

//   const accountsContainer = document.getElementById(`${id}`);
//   const client = bank.find(client => client.id === id);
 
//   const creditMarkup = creditTemplate(client.accounts.credit);
//   accountsContainer.insertAdjacentHTML('beforeend', creditMarkup);
// }

// function onDeleteBtnClick(event) {
//   if(!event.target.hasAttribute('data-remove')){
//     return;
//   }
//   const id = event.target.getAttribute('data-remove');
//   // console.log(id)
//   // const id = e.target.getAttribute('id').slice(6);
//   const updatedBank = bank.filter(client => client.id !== id);
//     //  let index = 0;
//     //  bank.forEach((client, i) =>{
//     //    if (client.id === id){
//     //      index = i;
//     //    }
//     //  }
//     //  );
//     //  bank.splice(index,1);
//     //  console.log(bank)
//      bank = updatedBank;
//      localStorage.setItem("bank", JSON.stringify(updatedBank));
//      renderBank(updatedBank);

// }

async function exchangeCurrency(balance, currency) {
  //   console.log(currency, balance);
  const rate = await fetchCurrencyRates().then(rates => {
    // console.log(rates.UAH);
    return rates[currency];
  });

  return (balance / 100) * rate;
  //    console.log(rate)
}
// exchangeCurrency(50, 'UAH')

async function countBankCashTotal() {
  try {
    let debitTotal = 0;
    for (let i = 0; i < bank.length; i++) {
      for (let j = 0; j < bank[i].accounts.debit.length; j++) {
        let account = bank[i].accounts.debit[j];

        const funds = account.balance + account.activity;
        let currency = account.currency;
        //  console.log(currency)
        if (currency === 'USD') {
          debitTotal += funds;
        } else {
          const exchangedFunds = await exchangeCurrency(funds, currency);
          //  console.log(exchangedFunds)
          debitTotal += exchangedFunds;
        }
        // console.log(currency, balance)
      }
    }
    // console.log(debitTotal);
    let creditTotal = 0;
    for (let i = 0; i < bank.length; i++) {
      for (let j = 0; j < bank[i].accounts.credit.length; j++) {
        let account = bank[i].accounts.credit[j];
        //  console.log(account.balance)
        const funds =
          account.balance.personalFunds +
          account.balance.creditFunds +
          account.creditLimit +
          account.activity;
        let currency = account.currency;
        // console.log(funds)
        if (currency === 'USD') {
          creditTotal += funds;
        } else {
          const exchangedFunds = await exchangeCurrency(funds, currency);
          // console.log(exchangedFunds)
          creditTotal += exchangedFunds;
        }
        // console.log(currency, balance)
      }
    }
    // console.log(creditTotal);
    console.log(debitTotal + creditTotal);
    const total = debitTotal + creditTotal;
    totalFunds.innerText = total.toFixed(2);

    return debitTotal + creditTotal;
  } catch (e) {
    error({ text: 'Error.Try again leter.' });
  }
}
countBankCashTotal();

async function countClientsDebt() {
  try {
    let debtTotal = 0;
    for (let i = 0; i < bank.length; i++) {
      for (let j = 0; j < bank[i].accounts.credit.length; j++) {
        let account = bank[i].accounts.credit[j];
        //  console.log(account.balance)
        let debt = 0;
        // console.log(account)
        if (account.balance.creditFunds > account.balance.personalFunds) {
          debt = account.balance.creditFunds - account.balance.personalFunds;
        }
        // const funds = account.balance.personalFunds + account.balance.creditFunds + account.creditLimit + account.activity;
        let currency = account.currency;
        console.log(debt);
        if (currency === 'USD') {
          debtTotal += debt;
        } else {
          const exchangedDebt = await exchangeCurrency(debt, currency);
          console.log(exchangedDebt);
          debtTotal += exchangedDebt;
        }
        // console.log(currency, balance)
      }
    }
    console.log(debtTotal);
    return debtTotal;
  } catch (e) {
    error({ text: 'Error.Try again leter.' });
  }
}
countClientsDebt();

async function countInactiveClientsDebtFunds() {
  try {
    const total = 0;
    for (let i = 0; i < bank.length; i++) {
      for (let j = 0; j < bank[i].accounts.credit.length; j++) {
        let account = bank[i].accounts.credit[j];
        let debt = 0;
        //  console.log(account.balance)
        if (account.balance.creditFunds > account.balance.personalFunds) {
          debt += account.balance.creditFunds - account.balance.personalFunds;
          let currency = account.currency;
          console.log(debt);
          if (currency === 'USD') {
            total += debt;
          } else {
            const exchangedDebt = await exchangeCurrency(debt, currency);
            console.log(exchangedDebt);
            // total += exchangedDebt
          }
        }
      }
    }
    //   for (let i = 0; i < bank.length; i++) {
    //     if(bank[i].isActive){
    //       console.log('active')
    //     //  break;
    //     }
    //     for(let j = 0; j < bank[i].accounts.credit.length; j++){
    //      let account = bank[i].accounts.credit[j];
    //       let debt = 0;
    //       if(account.balance.creditFunds > account.balance.personalFunds){
    //           debt += account.balance.creditFunds - account.balance.personalFunds;
    //           let currency = account.currency;
    //       console.log(debt)
    //       if(currency === "USD"){
    //         total += debt;
    //       } else {
    //       const exchangedDebt = await exchangeCurrency(debt, currency);
    //       console.log(exchangedDebt)
    //       total += exchangedDebt;

    //       }
    //     }
    //  }
    // }
    // const creditFundsTotal = bank
    //   .reduce(async (total, client) => {
    //     let creditFunds = client.accounts.credit.balance.creditFunds;
    //     const currency = client.accounts.credit.currency;
    //     const exchangedCreditFunds = await exchangeCurrency(
    //       creditFunds,
    //       currency
    //     );
    //     total += exchangedCreditFunds;
    //     return total;
    //   }, 0)
    //   .then((total) => console.log(total));

    console.log(total);
    return total;
  } catch (e) {
    error({ text: 'Error.Try again leter.' });
  }
}
countInactiveClientsDebtFunds();

function countInactiveDebtHolders() {
  // const inactiveClients = bank.filter((client) => {
  //   return client.isActive && client.accounts.credit.balance.creditFunds !== 0;
  // }).length;
  let counter = 0;
  for (let i = 0; i < bank.length; i++) {
    let debt = false;
    for (let j = 0; j < bank[i].accounts.credit.length; j++) {
      let account = bank[i].accounts.credit[j];
      if (account.balance.creditFunds > account.balance.personalFunds) {
        debt = true;
        break;
      }
    }
    if (debt && !bank[i].isActive) {
      counter += 1;
      debt = false;
    }
  }
  console.log(counter);
  return counter;
}
// countInactiveDebtHolders();

function countActiveDebtHolders() {
  let counter = 0;
  for (let i = 0; i < bank.length; i++) {
    let debt = false;
    for (let j = 0; j < bank[i].accounts.credit.length; j++) {
      let account = bank[i].accounts.credit[j];
      if (account.balance.creditFunds > account.balance.personalFunds) {
        debt = true;
        break;
      }
    }
    if (debt && bank[i].isActive) {
      counter += 1;
      debt = false;
    }
  }
  console.log(counter);
  return counter;
}
// countActiveDebtHolders()
