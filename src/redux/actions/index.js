export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_COINS_STARTED = 'REQUEST_COINS_STARTED';
export const RECEIVE_COINS = 'RECEIVE_COINS';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REQUEST_COINS_EXPENSES = 'REQUEST_COINS_EXPENSES';
export const RECEIVE_COINS_EXPENSES = 'RECEIVE_COINS_EXPENSES';

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

export const receiveCoinsExpenses = (state, exchangeRates) => ({
  type: RECEIVE_COINS_EXPENSES,
  payload: { state, exchangeRates },
});

export function fetchCoins() {
  return (dispatch) => {
    dispatch(requestCoinsStarted());
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((res) => res.json())
      .then((coins) => dispatch(receiveCoins(coins)));
  };
}

export function addExpenses(state) {
  return (dispatch) => {
    dispatch(requestCoinsExpenses());
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((res) => res.json())
      .then((exchangeRates) => dispatch(receiveCoinsExpenses(state, exchangeRates)));
  };
}
