// // import ApiService from './api-service';
import fetchCurrencyRates from './api-service';
// const form = document.querySelector('.form');
// const debitForm = document.querySelector('.debitForm');
// const creditForm = document.querySelector('.creditForm');
// const totalFundsBtn = document.querySelector('#totalFunds');
// const totalFunds = document.querySelector('.totalFunds');

// // const apiService = new ApiService();

// const bank = apiService.clients;
let bank = [];
let clients = localStorage.getItem('bank');
if (clients !== null) {
  bank = JSON.parse(clients);
}
// const bankContainer = document.querySelector('.bankContainer');
// renderBank(bank);

// totalFundsBtn.addEventListener('click', countBankCashTotal);

async function exchangeCurrency(balance, currency) {
  const rate = await fetchCurrencyRates().then(rates => {
    return rates[currency];
  });
  return (balance / 100) * rate;
}

async function countBankCashTotal() {
  try {
    let debitTotal = 0;
    for (let i = 0; i < bank.length; i++) {
      for (let j = 0; j < bank[i].accounts.debit.length; j++) {
        let account = bank[i].accounts.debit[j];

        const funds = Number(account.balance) + Number(account.activity);
        let currency = account.currency;
        if (currency === 'USD') {
          debitTotal += funds;
        } else {
          const exchangedFunds = await exchangeCurrency(funds, currency);
          debitTotal += exchangedFunds;
        }
      }
    }
    let creditTotal = 0;
    for (let i = 0; i < bank.length; i++) {
      for (let j = 0; j < bank[i].accounts.credit.length; j++) {
        let account = bank[i].accounts.credit[j];
        const funds =
          Number(account.balance) + Number(account.creditLimit) + Number(account.activity);
        let currency = account.currency;
        if (currency === 'USD') {
          creditTotal += funds;
        } else {
          const exchangedFunds = await exchangeCurrency(funds, currency);
          creditTotal += exchangedFunds;
        }
      }
    }
    const total = debitTotal + creditTotal;
    totalFunds.innerText = total.toFixed(2);
    console.log(total);
    return total;
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
        let debt = 0;
        if (Number(account.creditLimit) > Number(account.balance)) {
          debt = Number(account.creditLimit) - Number(account.balance);
        }
        let currency = account.currency;

        if (currency === 'USD') {
          debtTotal += debt;
        } else {
          const exchangedDebt = await exchangeCurrency(debt, currency);
          debtTotal += exchangedDebt;
        }
      }
    }
    return debtTotal;
  } catch (e) {
    error({ text: 'Error.Try again leter.' });
  }
}
countClientsDebt();

async function countInactiveActiveClientsDebtFunds() {
  try {
    const total = 0;
    for (let i = 0; i < bank.length; i++) {
      for (let j = 0; j < bank[i].accounts.credit.length; j++) {
        let account = bank[i].accounts.credit[j];
        let debt = 0;
        // let flag =
        //  console.log(account.balance)
        if (!bank[i].isActive && Number(account.creditLimit) > Number(account.balance)) {
          debt += Number(account.creditLimit) - Number(account.balance);
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

    //     if(bank[i].isActive){
    //       console.log('active')
    //     //  break;
    //     }

    console.log(total);

    return total;
  } catch (e) {
    error({ text: 'Error.Try again leter.' });
  }
}
countInactiveActiveClientsDebtFunds();

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
