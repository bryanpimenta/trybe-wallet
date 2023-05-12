import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
/*   state = {
    expense: '',
    description: '',
    coin: 'USD',
    method: 'Dinheiro',
    category: 'Alimentação',
  }; */

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { wallet: { currencies } } = this.props;
    return (
      <form>

        <label htmlFor="expense">Despesa: </label>
        <input name="expense" data-testid="value-input" onChange={ this.onInputChange } />

        <label htmlFor="description">Descrição: </label>
        <input
          name="description"
          data-testid="description-input"
          onChange={ this.onInputChange }
        />

        <label htmlFor="coin">Moeda: </label>
        <select name="coin" data-testid="currency-input" onChange={ this.onInputChange }>
          {currencies.map((coin) => (
            <option key={ coin } value={ coin }>{ coin }</option>
          ))}
        </select>

        <label htmlFor="method">Método de pagamento: </label>
        <select name="method" data-testid="method-input" onChange={ this.onInputChange }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <label htmlFor="category">Categoria: </label>
        <select name="category" data-testid="tag-input" onChange={ this.onInputChange }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

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
