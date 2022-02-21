const bank = [
  {
    id: 123456789,
    name: 'Voyskaya Vlada Vladimirovna',
    isActive: true,
    registrationDate: '',
    accounts: {
      debit: [
        {
          balance: 5,
          activity: 2,
          activityDate: '',
          cardExpiryDate: '',
          currency: 'UAH',
        },
        {
          balance: 3,
          activity: 1,
          activityDate: '',
          cardExpiryDate: '',
          currency: 'UAH',
        },
      ],
      credit: [
        {
          balance: {
            personalFunds: 6,
            creditFunds: 5,
          },
          creditLimit: 10,
          activity: 3,
          activityDate: '',
          cardExpiryDate: '',
          currency: 'UAH',
        },
      ],
    },
  },
  {
    id: 123456790,
    name: 'Voyskiy Vlad Vladimirovich',
    isActive: false,
    registrationDate: '',
    accounts: {
      debit: [
        {
          balance: 7,
          activity: 3,
          activityDate: '',
          cardExpiryDate: '',
          currency: 'UAH',
        },
      ],
      credit: [
        {
          balance: {
            personalFunds: 2,
            creditFunds: 3,
          },
          creditLimit: 10,
          activity: 2,
          activityDate: '',
          cardExpiryDate: '',
          currency: 'UAH',
        },
        {
          balance: {
            personalFunds: 2,
            creditFunds: 3,
          },
          creditLimit: 10,
          activity: 2,
          activityDate: '',
          cardExpiryDate: '',
          currency: 'UAH',
        },
      ],
    },
  },
];
