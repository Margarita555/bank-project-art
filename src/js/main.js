import bankTemplate from '../templates/bank-markup.hbs';
import debitTemplate from '../templates/debit-markup.hbs';
import creditTemplate from '../templates/credit-markup.hbs';
import { nanoid } from 'nanoid';

const form = document.querySelector('.form');
const debitForm = document.querySelector('.debitForm');
const creditForm = document.querySelector('.creditForm');
const totalFundsBtn = document.querySelector('#totalFunds');
const totalFunds = document.querySelector('.totalFunds');
const bankContainer = document.querySelector('.bankContainer');

let bank = [];
let clients = localStorage.getItem("bank");
if(clients !== null){
  bank = JSON.parse(clients)
}

renderBank(bank);

function renderBank(bank){
  bankContainer.innerHTML = "";
  const bankMarkup = bankTemplate(bank);
  bankContainer.insertAdjacentHTML('beforeend', bankMarkup);

}

form.addEventListener('submit', onFormSubmit);
debitForm.addEventListener('submit', onDebitFormSubmit);
creditForm.addEventListener('submit', onCreditFormSubmit);
// totalFundsBtn.addEventListener('click', countBankCashTotal);
bankContainer.addEventListener('click', onDeleteBtnClick);
bankContainer.addEventListener('click', onDebitAccountClick);
bankContainer.addEventListener('click', onCreditAccountClick);


function onFormSubmit(event) {
  event.preventDefault();
  const formElements = event.currentTarget.elements;
  const name = formElements.name.value;
  const registrationDate = formElements.date.value;
  const isActive = formElements.isActive.value;
  const id = nanoid();
  const client = {
    id,
    name,
    registrationDate,
    isActive,
    accounts: {
      debit: [],
      credit: [],
    },
  };
  bank.push(client);
  localStorage.setItem("bank", JSON.stringify(bank));
   renderBank(bank);

  form.reset();
}

function onDebitFormSubmit(event) {
  event.preventDefault();
  const formElements = event.currentTarget.elements;

  const id = formElements.id.value;
  const balance = formElements.balance.value;
  const activity = formElements.activity.value;
  const activityDate = formElements.activityDate.value;
  const cardExpiryDate = formElements.cardExpiryDate.value;
  const currency = formElements.currency.value;

  const debitAccount = {
    balance,
    activity,
    activityDate,
    cardExpiryDate,
    currency,
  };
  const client = bank.find(client => id == client.id);
  client.accounts.debit.push(debitAccount);

  localStorage.setItem("bank", JSON.stringify(bank));
  debitForm.reset();
}

function onCreditFormSubmit(event) {
  event.preventDefault();
  const formElements = event.currentTarget.elements;

  const id = formElements.id.value;
  const balance = formElements.balance.value;
  const activity = formElements.activity.value;
  const activityDate = formElements.activityDate.value;
  const cardExpiryDate = formElements.cardExpiryDate.value;
  const currency = formElements.currency.value;
  const creditLimit = formElements.creditLimit.value;

  const creditAccount = {
    balance,
    creditLimit,
    activity,
    activityDate,
    cardExpiryDate,
    currency,
  };

  const client = bank.find(client => id == client.id);
  client.accounts.credit.push(creditAccount);
  console.log(bank)
  localStorage.setItem("bank", JSON.stringify(bank));
  creditForm.reset();
}

function onDebitAccountClick(event){
  if(!event.target.hasAttribute('data-debit')){
    return;
  }
  const id = event.target.getAttribute('data-debit');

  const accountsContainer = document.getElementById(`${id}`);
  const client = bank.find(client => client.id === id);
 
  const debitMarkup = debitTemplate(client.accounts.debit);
  accountsContainer.insertAdjacentHTML('beforeend', debitMarkup);
}

function onCreditAccountClick(event){
  if(!event.target.hasAttribute('data-credit')){
    return;
  }
  const id = event.target.getAttribute('data-credit');

  const accountsContainer = document.getElementById(`${id}`);
  const client = bank.find(client => client.id === id);
 
  const creditMarkup = creditTemplate(client.accounts.credit);
  accountsContainer.insertAdjacentHTML('beforeend', creditMarkup);
}

function onDeleteBtnClick(event) {
  if(!event.target.hasAttribute('data-remove')){
    return;
  }
  const id = event.target.getAttribute('data-remove');
 
  const updatedBank = bank.filter(client => client.id !== id);
  bank = updatedBank;
  localStorage.setItem("bank", JSON.stringify(updatedBank));
  renderBank(updatedBank);
}