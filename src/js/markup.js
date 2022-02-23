
// export function createClientMarkup(bank) {
//     const { id, name, isActive, registrationDate } = bank;
  
//     return `
//     <li class="client">
//       <form class="clientForm">
//           <label class="label">
//             Id
//             <input class="input input--bank" type="text" name="id" value=" ${id}" />
//           </label>
//           <label class="label">
//             Name
//             <input class="input input--bank" type="text" name="name" value=" ${name}" />
//           </label>
  
//           <label class="label">
//             Registration date
//             <input class="input input--bank" type="text" name="date" value="${registrationDate}" />
//           </label>
//           <label class="label">
//             Is active
//             <input class="input input--bank" type="text" name="isActive" value="${isActive}" />
//           </label>
//           <button class="btn" id="edit${id}" type="submit">Save</button>
//           <button class=" btn" id="remove${id}" type="button">Delete</button>
//         </form>
      
    
//       <h3 class="accounts">Accounts</h3>
//       <ul class="accountsContainer" id="${id}"></ul>
//   </li>
//       `;
//   }

// export function createDebitMarkup(debitAccount) {
//     return debitAccount
//       .map(({ balance, activity, currency, registrationDate, cardExpiryDate }) => {
//         return `
//       <li class="client">
//       <h4>Debit account</h4>
//       <p class="balance">Balance: ${balance}</p>
//       <p class="activity">Activity: ${activity}</p>
//       <p class="currency">Currency: ${currency}</p>
//       <p class="activityDate">Activity date: ${registrationDate}</p>
//       <p class="cardExpiryDate">Card expiry date: ${cardExpiryDate}<p>
//   </li>
//       `;
//       })
//       .join('');
//   }

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