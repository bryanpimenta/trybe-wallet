import {
  DELETE_EXPENSE,
  RECEIVE_COINS,
  RECEIVE_COINS_EXPENSES,
  EDITING_EXPENSE,
  FINISHED_EDIT_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function removeIdExpense(state, action) {
  const { expenses } = state;
  const id = action.payload;
  return expenses.filter((itens) => itens.id !== Number(id));
}

function addIdInExpenses(state, action) {
  const { expenses } = state;
  const { payload } = action;

  delete payload.exchangeRates.USDT;
  const newExpense = payload.state;
  delete newExpense.isEditing;

  newExpense.exchangeRates = payload.exchangeRates;
  newExpense.id = expenses.length;

  return [...expenses, newExpense];
}

function edit(state, action) {
  const { expenses } = state;
  const { payload } = action;
  delete payload.state.isEditing;
  expenses[Number(payload.id)] = payload.state;
  state.editor = false;
  return { ...state };
}

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_COINS:
    return { ...state, currencies: action.payload };
  case RECEIVE_COINS_EXPENSES:
    return { ...state, expenses: addIdInExpenses(state, action) };
  case DELETE_EXPENSE:
    return { ...state, expenses: removeIdExpense(state, action) };
  case EDITING_EXPENSE:
    return { ...state, idToEdit: action.payload, editor: action.editor };
  case FINISHED_EDIT_EXPENSE:
    return { ...state, ...edit(state, action), idToEdit: 0 };
  default:
    return state;
  }
};

export default walletReducer;
