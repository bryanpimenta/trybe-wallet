import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CgProfile } from 'react-icons/cg';
import { FaCoins } from 'react-icons/fa';
import logo from '../imagens/TrybeWalletLogo.png';

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
      <header>
        <img src={ logo } alt="" />
        <p className="total__field">
          <FaCoins />
          Despesa Total:
          {' '}
          {' '}
          <span data-testid="total__field">{ this.totalExpenses(expenses) }</span>
          {' '}
          <span data-testid="header-currency-field"> BRL</span>
        </p>
        <p className="email__field">
          <CgProfile />
          {' '}
          <spam data-testid="email__field">{ `${email}` }</spam>
        </p>
      </header>
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
