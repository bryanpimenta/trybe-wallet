import { RECEIVE_COINS, RECEIVE_COINS_EXPENSES } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function addIdInExpenses(state, action) {
  const { expenses } = state;
  const { payload } = action;

  delete payload.exchangeRates.USDT;
  const newExpense = payload.state;

  newExpense.exchangeRates = payload.exchangeRates;
  newExpense.id = expenses.length;

  return [...expenses, newExpense];
}

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_COINS:
    return { ...state, currencies: action.payload };
  case RECEIVE_COINS_EXPENSES:
    return { ...state, expenses: addIdInExpenses(state, action) };
  default:
    return state;
  }
};

export default walletReducer;
