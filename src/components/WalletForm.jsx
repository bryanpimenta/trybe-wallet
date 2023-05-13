import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  addExpensesAndClearInputs = () => {
    const { dispatch } = this.props;
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
    dispatch(addExpenses(this.state));
  };

  render() {
    const { wallet: { currencies } } = this.props;
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

        <button
          type="button"
          onClick={ this.addExpensesAndClearInputs }
        >
          Adicionar despesa
        </button>
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
