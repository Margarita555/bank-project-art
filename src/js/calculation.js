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

async function countClientsDebt(clientStatus) {
  if (clientStatus && clientStatus !== 'active' && clientStatus !== 'inactive') {
    throw new Error('The client status is incorrect');
  }
  try {
    let bank = fetchBank();
    let debtTotal = 0;
    for (let i = 0; i < bank.length; i++) {
      let flag = bank[i].isActive || !bank[i].isActive;
      if (clientStatus && clientStatus === 'active') {
        flag = bank[i].isActive;
      }
      if (clientStatus && clientStatus === 'inactive') {
        flag = !bank[i].isActive;
      }
      for (let j = 0; j < bank[i].accounts.credit.length; j++) {
        let account = bank[i].accounts.credit[j];
        let debt = 0;
        let creditLimit = Number(account.creditLimit);
        let balance = Number(account.balance);
        if (flag && creditLimit > balance) {
          debt = creditLimit - balance;
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
  if (clientStatus !== 'active' && clientStatus !== 'inactive') {
    throw new Error('The client status is incorrect');
  }
  let bank = fetchBank();
  let counter = 0;
  for (let i = 0; i < bank.length; i++) {
    let flag = bank[i].isActive;
    if (clientStatus && clientStatus === 'inactive') {
      flag = !bank[i].isActive;
    }
    for (let j = 0; j < bank[i].accounts.credit.length; j++) {
      let account = bank[i].accounts.credit[j];
      if (flag && Number(account.creditLimit) > Number(account.balance)) {
        counter += 1;
      }
    }
  }
  return counter;
}
