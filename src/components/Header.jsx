import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalExpenses = (expenses) => {
    let sum = 0;
    expenses.forEach(({ value, currency, exchangeRates }) => {
      sum += value * exchangeRates[currency].ask;
    });
    return sum.toFixed(2);
  };

  render() {
    const { user: { email }, wallet: { expenses } } = this.props;
    return (
      <div>
        <h2 data-testid="email-field">{ `Bem vindo, ${email}😃` }</h2>
        <span data-testid="total-field">{ this.totalExpenses(expenses) }</span>
        <span data-testid="header-currency-field"> BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
}.isRequired;
