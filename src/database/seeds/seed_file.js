const usersData = [
   {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "username": "johndoe",
      "password": "password123",
      "phone": "+1 123-456-7890",
      "preferences": {
         "theme": "dark",
         "language": "en"
      }
   },
   {
      "name": "Jane Smith",
      "email": "janesmith@example.com",
      "username": "janesmith",
      "password": "password456",
      "phone": "+1 987-654-3210",
      "preferences": {
         "theme": "light",
         "language": "en"
      }
   }
];

const iconsData = [
   {
      id: 1,
      name: 'dollar sign'
   },
   {
      id: 2,
      name: 'credit card'
   },
   {
      id: 3,
      name: 'cash'
   },
   {
      id: 4,
      name: 'car'
   },
   {
      id: 5,
      name: 'boat'
   },
   {
      id: 6,
      name: 'house'
   },
   {
      id: 7,
      name: 'groceries',
   },
   {
      id: 8,
      name: 'travel'
   },
   {
      id: 9,
      name: 'clothing'
   },
   {
      id: 10,
      name: 'apps'
   }
];

const accountTypeData = [{ "id": 1, "icon_id": 2, "type": "Savings" }, { "id": 2, "icon_id": 3, "type": "Checking" }, { "id": 3, "icon_id": 4, "type": "Credit Card" }, { "id": 4, "icon_id": 5, "type": "Loan" }];

const accountSubTypeData = [
   {
      "id": 1,
      "account_type_id": 1,
      "icon_id": 2,
      "subtype": "Regular Savings"
   },
   {
      "id": 2,
      "account_type_id": 1,
      "icon_id": 2,
      "subtype": "High-Yield Savings"
   },
   {
      "id": 3,
      "account_type_id": 2,
      "icon_id": 3,
      "subtype": "Personal Checking"
   },
   {
      "id": 4,
      "account_type_id": 2,
      "icon_id": 3,
      "subtype": "Business Checking"
   },
   {
      "id": 5,
      "account_type_id": 3,
      "icon_id": 4,
      "subtype": "Rewards Credit Card"
   },
   {
      "id": 6,
      "account_type_id": 3,
      "icon_id": 4,
      "subtype": "Low-Interest Credit Card"
   },
   {
      "id": 7,
      "account_type_id": 4,
      "icon_id": 5,
      "subtype": "Auto Loan"
   },
   {
      "id": 8,
      "account_type_id": 4,
      "icon_id": 5,
      "subtype": "Home Loan"
   }
];

const accountsData = [
   {
      "user_id": 1,
      "account_subtype_id": 1,
      "icon_id": 3,
      "name": "John's Savings Account",
      "starting_balance": 10000.00,
      "opened_date": "2022-01-01",
      "description": "This is John's primary savings account"
   },
   {
      "user_id": 1,
      "account_subtype_id": 2,
      "icon_id": 4,
      "name": "John's Checking Account",
      "starting_balance": 5000.00,
      "opened_date": "2022-01-01",
      "description": "This is John's primary checking account"
   },
   {
      "user_id": 2,
      "account_subtype_id": 1,
      "icon_id": 3,
      "name": "Jane's Savings Account",
      "starting_balance": 7500.00,
      "opened_date": "2021-05-15",
      "closed_date": "2022-11-30",
      "description": "This is Jane's savings account"
   },
   {
      "user_id": 2,
      "account_subtype_id": 3,
      "icon_id": 5,
      "name": "Jane's Car Loan",
      "starting_balance": 20000.00,
      "opened_date": "2022-03-01",
      "description": "This is Jane's car loan"
   }
];

const transactionTypeData = [
   {
     "icon_id": 1,
     "type": "Income"
   },
   {
     "icon_id": 7,
     "type": "Groceries"
   },
   {
     "icon_id": 8,
     "type": "Travel"
   },
   {
     "icon_id": 9,
     "type": "Clothing"
   },
   {
     "icon_id": 10,
     "type": "Apps"
   },
   {
     "icon_id": 2,
     "type": "Savings"
   },
   {
     "icon_id": 3,
     "type": "Checking"
   },
   {
     "icon_id": 4,
     "type": "Credit Card"
   },
   {
     "icon_id": 5,
     "type": "Loan"
   },
   {
     "icon_id": 6,
     "type": "Investment"
   }
 ];

 const transactionSubtypeData = [
   {
     "transaction_type_id": 1,
     "icon_id": 1,
     "subtype": "Expense"
   },
   {
     "transaction_type_id": 1,
     "icon_id": 2,
     "subtype": "Income"
   },
   {
     "transaction_type_id": 2,
     "icon_id": 3,
     "subtype": "Gas"
   },
   {
     "transaction_type_id": 2,
     "icon_id": 4,
     "subtype": "Maintenance"
   },
   {
     "transaction_type_id": 3,
     "icon_id": 5,
     "subtype": "Groceries"
   },
   {
     "transaction_type_id": 3,
     "icon_id": 7,
     "subtype": "Eating Out"
   },
   {
     "transaction_type_id": 4,
     "icon_id": 6,
     "subtype": "Electricity"
   },
   {
     "transaction_type_id": 4,
     "icon_id": 9,
     "subtype": "Water"
   },
   {
     "transaction_type_id": 5,
     "icon_id": 8,
     "subtype": "Airfare"
   },
   {
     "transaction_type_id": 5,
     "icon_id": 10,
     "subtype": "Hotel"
   }
 ];
 
 const recurrencePeriodData = [  {    "id": 1,    "recurrence_type": "daily",    "start_date": "2022-01-01",    "end_date": "2022-01-31"  },  {    "id": 2,    "recurrence_type": "weekly",    "start_date": "2022-02-01",    "end_date": "2022-02-28"  },  {    "id": 3,    "recurrence_type": "monthly",    "start_date": "2022-03-01",    "end_date": "2022-03-31"  }];

const transactionsData = [
   {
     "account_id": 1,
     "transaction_subtype_id": 1,
     "recurrence_period_id": 1,
     "amount": 50.00,
     "status": "completed",
     "description": "Transfer from Checking to Savings"
   },
   {
     "account_id": 2,
     "transaction_subtype_id": 2,
     "recurrence_period_id": 3,
     "amount": -100.00,
     "status": "pending",
     "description": "Credit Card Payment"
   },
   {
     "account_id": 3,
     "transaction_subtype_id": 5,
     "recurrence_period_id": 2,
     "amount": -200.00,
     "status": "completed",
     "description": "Car Loan Payment"
   }
 ]
  

exports.seed = async (knex) => {
   // Deletes ALL existing entries
   await knex('users').del();
   await knex('users').insert(usersData);
   await knex('icons').del();
   await knex('icons').insert(iconsData);
   await knex('account_type').del();
   await knex('account_type').insert(accountTypeData);
   await knex('account_subtype').del();
   await knex('account_subtype').insert(accountSubTypeData);
   await knex('transaction_type').del();
   await knex('transaction_type').insert(transactionTypeData);
   await knex('transaction_subtype').del();
   await knex('transaction_subtype').insert(transactionSubtypeData);
   await knex('recurrence_period').del();
   await knex('recurrence_period').insert(recurrencePeriodData);
   await knex('accounts').del();
   await knex('accounts').insert(accountsData);
   await knex('transactions').del();
   await knex('transactions').insert(transactionsData);
};