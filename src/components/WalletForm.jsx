import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, finishedEditExpense, fetchCoins } from '../redux/actions';

const DEFAULT_CURRENCY = 'USD';
const DEFAULT_METHOD = 'Dinheiro';
const DEFAULT_TAG = 'Alimentação';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: DEFAULT_CURRENCY,
    method: DEFAULT_METHOD,
    tag: DEFAULT_TAG,
    isEditing: false,
    id: 0,
    exchangeRates: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  componentDidUpdate(prevProps) {
    const { wallet: { editor, idToEdit } } = this.props;
    const { wallet: { editor: prevEditor, idToEdit: prevIdToEdit } } = prevProps;

    if (editor && (idToEdit !== prevIdToEdit || editor !== prevEditor)) {
      this.isEditor();
    }
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  addExpensesAndClearInputs = () => {
    const { dispatch } = this.props;
    this.setState({
      value: '',
      description: '',
      currency: DEFAULT_CURRENCY,
      method: DEFAULT_METHOD,
      tag: DEFAULT_TAG,
    });
    dispatch(addExpenses(this.state));
  };

  finishedEdit = ({ target: { name } }) => {
    const { dispatch } = this.props;
    this.setState({
      value: '',
      description: '',
      currency: DEFAULT_CURRENCY,
      method: DEFAULT_METHOD,
      tag: DEFAULT_TAG,
      isEditing: false,
      id: 0,
      exchangeRates: '',
    });
    dispatch(finishedEditExpense(this.state, name));
  };

  isEditor = () => {
    const { wallet: { expenses, editor, idToEdit } } = this.props;
    const { isEditing } = this.state;
    if (editor && !isEditing) {
      const editingExpense = expenses[idToEdit];
      this.setState({
        value: editingExpense.value,
        description: editingExpense.description,
        currency: editingExpense.currency,
        method: editingExpense.method,
        tag: editingExpense.tag,
        isEditing: true,
        id: editingExpense.id,
        exchangeRates: editingExpense.exchangeRates,
      });
    }
  };

  render() {
    const { wallet: { currencies, editor, idToEdit } } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>

        <label htmlFor="value">Despesa: </label>
        <input
          name="value"
          data-testid="value-input"
          onChange={ this.onInputChange }
          value={ value }
        />

        <label htmlFor="description">Descrição: </label>
        <input
          name="description"
          data-testid="description-input"
          onChange={ this.onInputChange }
          value={ description }
        />

        <label htmlFor="currency">Moeda: </label>
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ this.onInputChange }
          value={ currency }
        >
          {currencies.map((coin) => (
            <option key={ coin } value={ coin }>{ coin }</option>
          ))}
        </select>

        <label htmlFor="method">Método de pagamento: </label>
        <select
          name="method"
          data-testid="method-input"
          onChange={ this.onInputChange }
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <label htmlFor="tag">Categoria: </label>
        <select
          name="tag"
          data-testid="tag-input"
          onChange={ this.onInputChange }
          value={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        { editor ? (
          <button
            type="button"
            name={ idToEdit }
            onClick={ this.finishedEdit }
          >
            Editar despesa
          </button>
        ) : (
          <button
            type="button"
            onClick={ this.addExpensesAndClearInputs }
          >
            Adicionar despesa
          </button>
        ) }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

WalletForm.propTypes = {
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(String),
  }),
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
