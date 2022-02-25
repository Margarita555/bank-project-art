import fetchCurrencyRates from './api-service';
import getRefs from './refs';
const { totalFundsBtn, totalFunds } = getRefs();

let bank = [];
let clients = localStorage.getItem('bank');
if (clients !== null) {
  bank = JSON.parse(clients);
}

totalFundsBtn.addEventListener('click', countBankTotalFunds);

async function exchangeCurrency(balance, currency) {
  const rate = await fetchCurrencyRates().then(rates => {
    return rates[currency];
  });
  return (balance / 100) * rate;
}

async function countBankTotalFunds() {
  let clients = localStorage.getItem('bank');
  if (clients !== null) {
    bank = JSON.parse(clients);
  }
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
    return total;
  } catch (e) {
    error({ text: 'Error.Try again leter.' });
  }
}
// countBankCashTotal();

async function countClientsDebt(status) {
  try {
    let debtTotal = 0;
    for (let i = 0; i < bank.length; i++) {
      let flag = bank[i].isActive || !bank[i].isActive;
      if (status && status === 'active') {
        flag = bank[i].isActive;
      }
      if (status && status === 'inactive') {
        flag = !bank[i].isActive;
      }
      for (let j = 0; j < bank[i].accounts.credit.length; j++) {
        let account = bank[i].accounts.credit[j];
        let debt = 0;
        if (flag && Number(account.creditLimit) > Number(account.balance)) {
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

// countClientsDebt();
// countClientsDebt('active');
// countClientsDebt('inactive');

function countDebtHolders(status) {
  let counter = 0;
  for (let i = 0; i < bank.length; i++) {
    let flag = bank[i].isActive;
    if (status && status === 'inactive') {
      flag = !bank[i].isActive;
    }
    for (let j = 0; j < bank[i].accounts.credit.length; j++) {
      let account = bank[i].accounts.credit[j];
      if (flag && Number(account.creditLimit) > Number(account.balance)) {
        counter += 1;
      }
    }
  }
  // console.log(counter);
  return counter;
}
// countDebtHolders('active');
// countDebtHolders('inactive');
