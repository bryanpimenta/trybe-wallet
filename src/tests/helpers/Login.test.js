import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testando o componente `Login`', () => {
  test('Verificando os elementos da interface', () => {
    renderWithRouterAndRedux(<App />);
    const email = 'bryan@test.com';
    const pass = '12345678';

    const inputEmail = screen.getByRole('textbox', { Name: /email/i });
    const inputPass = screen.getByTestId('password-input');
    const btnNext = screen.getByText(/entrar/i);

    expect(btnNext.disabled).toBe(true);
    expect(btnNext).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPass).toBeInTheDocument();

    userEvent.type(inputEmail, email);
    expect(inputEmail.value).toBe(email);

    userEvent.type(inputPass, pass);
    expect(inputPass.value).toBe(pass);
    expect(btnNext.disabled).toBe(false);

    userEvent.click(btnNext);

    const expense = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const header = screen.getByText(`Bem vindo, ${email}😃`);
    const expenseValueCurrency = screen.getByTestId('header-currency-field');
    const expenseValueTotal = screen.getByTestId('total-field');
    const btnAddExpense = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(expense).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(expenseValueTotal.innerHTML).toBe('0.00');
    expect(expenseValueCurrency.innerHTML).toBe(' BRL');
    expect(btnAddExpense).toBeInTheDocument();

    const tableDescription = screen.getByRole('columnheader', { name: /descrição/i });
    const tableTag = screen.getByRole('columnheader', { name: /tag/i });
    const tableMethod = screen.getByRole('columnheader', { name: /método de pagamento/i });

    expect(tableDescription).toBeInTheDocument();
    expect(tableTag).toBeInTheDocument();
    expect(tableMethod).toBeInTheDocument();
  });
});
