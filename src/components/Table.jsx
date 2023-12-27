import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BiEdit } from 'react-icons/bi';
import { ImBin } from 'react-icons/im';
import { deleteExpense, editingExpense } from '../redux/actions';

class Table extends Component {
  deleteAExpense = ({ currentTarget }) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(currentTarget.name));
  };

  editExpense = ({ currentTarget }) => {
    const { dispatch } = this.props;
    dispatch(editingExpense(currentTarget.name));
  };

  render() {
    const { wallet: { expenses } } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((
            {
              id,
              value,
              description,
              currency,
              method,
              tag,
              exchangeRates,
            },
          ) => (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ Number(value).toFixed(2) }</td>
              <td>{ exchangeRates[currency].name }</td>
              <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
              <td>
                { (Number(value) * Number(exchangeRates[currency].ask)).toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  name={ id }
                  onClick={ this.editExpense }
                >
                  <BiEdit />
                </button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  name={ id }
                  onClick={ this.deleteAExpense }
                >
                  <ImBin />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;
