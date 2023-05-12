import { RECEIVE_COINS } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_COINS:
    return { ...state, currencies: action.payload };
  default:
    return state;
  }
};

export default walletReducer;
