export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_COINS_STARTED = 'REQUEST_COINS_STARTED';
export const RECEIVE_COINS = 'RECEIVE_COINS';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REQUEST_COINS_EXPENSES = 'REQUEST_COINS_EXPENSES';
export const RECEIVE_COINS_EXPENSES = 'RECEIVE_COINS_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDITING_EXPENSE = 'EDITING_EXPENSE';
export const FINISHED_EDIT_EXPENSE = 'FINISHED_EDIT_EXPENSE';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const requestCoinsStarted = () => ({
  type: REQUEST_COINS_STARTED,
});

export const receiveCoins = (coins) => ({
  type: RECEIVE_COINS,
  payload: Object.keys(coins).filter((coin) => coin !== 'USDT'),
});

export const requestCoinsExpenses = () => ({
  type: REQUEST_COINS_EXPENSES,
});

export function fetchCoins() {
  return (dispatch) => {
    dispatch(requestCoinsStarted());
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((res) => res.json())
      .then((coins) => dispatch(receiveCoins(coins)));
  };
}

export const receiveCoinsExpenses = (state, exchangeRates) => ({
  type: RECEIVE_COINS_EXPENSES,
  payload: { state, exchangeRates },
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editingExpense = (id) => ({
  type: EDITING_EXPENSE,
  payload: id,
  editor: true,
});

export const finishedEditExpense = (state, id) => ({
  type: FINISHED_EDIT_EXPENSE,
  payload: { state, id },
  editor: false,
});

export function addExpenses(state) {
  return (dispatch) => {
    dispatch(requestCoinsExpenses());
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((res) => res.json())
      .then((exchangeRates) => dispatch(receiveCoinsExpenses(state, exchangeRates)));
  };
}
