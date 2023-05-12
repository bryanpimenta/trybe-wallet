export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_COINS_STARTED = 'REQUEST_COINS_STARTED';
export const RECEIVE_COINS = 'RECEIVE_COINS';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const requestCoinsStarted = () => ({
  type: 'REQUEST_COINS_STARTED',
});

export const receiveCoins = (coins) => ({
  type: 'RECEIVE_COINS',
  payload: Object.keys(coins).filter((coin) => coin !== 'USDT'),
});

export function fetchCoins() {
  return (dispatch) => {
    dispatch(requestCoinsStarted());
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((res) => res.json())
      .then((coins) => dispatch(receiveCoins(coins)));
  };
}
