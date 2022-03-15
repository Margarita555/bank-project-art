import fetchCurrencyRates from './api-service';
import getRefs from './refs';
const { totalFundsBtn, totalFunds } = getRefs();

totalFundsBtn.addEventListener('click', countBankTotalFunds);

export function fetchBank() {
  let bank = [];
  let clients = localStorage.getItem('bank');
  if (clients !== null) {
    bank = JSON.parse(clients);
  }
  return bank;
}

async function exchangeCurrency(balance, currency) {
  const rate = await fetchCurrencyRates(currency).then(rates => {
    return rates[`USD_${currency}`];
  });
  return (balance / 100) * rate;
}

async function countBankTotalFunds() {
  let bank = fetchBank();
  try {
    let debitTotal = 0;
    for (let i = 0; i < bank.length; i++) {
      for (let j = 0; j < bank[i].accounts.debit.length; j++) {
        let account = bank[i].accounts.debit[j];
        const funds = account.balance + account.activity;
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
        const funds = account.balance + account.creditLimit + account.activity;
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

async function countClientsDebt(clientStatus) {
  try {
    let bank = fetchBank();
    let debtTotal = 0;
    for (let i = 0; i < bank.length; i++) {
      let flag = bank[i].isActive === clientStatus || !arguments.length;

      for (let j = 0; j < bank[i].accounts.credit.length; j++) {
        let account = bank[i].accounts.credit[j];
        let debt = 0;
        if (flag && account.creditLimit > account.balance) {
          debt = account.creditLimit - account.balance;
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

function countDebtHolders(clientStatus) {
  let bank = fetchBank();
  let counter = 0;
  for (let i = 0; i < bank.length; i++) {
    for (let j = 0; j < bank[i].accounts.credit.length; j++) {
      let account = bank[i].accounts.credit[j];
      if (bank[i].isActive === clientStatus && account.creditLimit > account.balance) {
        counter += 1;
      }
    }
  }
  return counter;
}
